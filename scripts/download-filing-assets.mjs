import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { basename, dirname, relative, resolve, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = resolve(projectRoot, "public");
const sources = [
  ["Chinese", "src/data/announcements.zh.json", "https://vmh.com.hk/"],
  ["English", "src/data/announcements.en.json", "https://vmh.com.hk/"],
];
const concurrency = 8;

function assertPublicTarget(fileUrl) {
  const filename = basename(fileUrl);
  if (!/^[A-Za-z0-9._-]+\.(?:pdf|html)$/i.test(filename)) {
    throw new Error(`Unsafe filing filename: ${filename}`);
  }

  const target = resolve(publicRoot, fileUrl.replaceAll("/", sep));
  if (!target.startsWith(`${publicRoot}${sep}`)) {
    throw new Error(`Filing path escapes public/: ${fileUrl}`);
  }
  return target;
}

async function loadQueue() {
  const queue = [];

  for (const [language, dataFile, origin] of sources) {
    const records = JSON.parse(await readFile(resolve(projectRoot, dataFile), "utf8"));
    for (const record of records) {
      const target = assertPublicTarget(record.fileUrl);
      if (!existsSync(target)) {
        if (record.fileUrl.toLowerCase().endsWith(".html")) {
          throw new Error(`Managed filing page is missing from the repository: ${record.fileUrl}`);
        }
        queue.push({ language, fileUrl: record.fileUrl, origin, target });
      }
    }
  }

  return queue;
}

async function download(item) {
  const url = new URL(item.fileUrl, item.origin);
  const temporary = `${item.target}.download`;
  await mkdir(dirname(item.target), { recursive: true });

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "VMH static archive builder/1.0" },
      signal: AbortSignal.timeout(60_000),
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length === 0) throw new Error("empty response");
    if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
      throw new Error("response is not a valid PDF");
    }
    await writeFile(temporary, bytes);
    await rename(temporary, item.target);

    return {
      bytes: bytes.length,
      file: relative(projectRoot, item.target),
      sha256: createHash("sha256").update(bytes).digest("hex"),
    };
  } catch (error) {
    await rm(temporary, { force: true });
    throw new Error(`${item.fileUrl}: ${error.message}`, { cause: error });
  }
}

async function main() {
  const queue = await loadQueue();
  if (queue.length === 0) {
    console.log("All referenced filing assets are already present.");
    return;
  }

  console.log(`Downloading ${queue.length} missing filing asset(s)...`);
  let cursor = 0;
  const results = [];

  async function worker() {
    while (cursor < queue.length) {
      const item = queue[cursor++];
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
          const result = await download(item);
          results.push(result);
          process.stdout.write(".");
          lastError = undefined;
          break;
        } catch (error) {
          lastError = error;
        }
      }
      if (lastError) throw lastError;
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, worker));
  process.stdout.write("\n");

  const totalBytes = results.reduce((sum, item) => sum + item.bytes, 0);
  const missingAfterDownload = [];
  for (const item of queue) {
    if (!existsSync(item.target) || (await stat(item.target)).size === 0) {
      missingAfterDownload.push(item.fileUrl);
    }
  }
  if (missingAfterDownload.length > 0) {
    throw new Error(`Still missing ${missingAfterDownload.length} filing asset(s).`);
  }

  console.log(`Downloaded ${results.length} file(s), ${totalBytes.toLocaleString("en-US")} bytes total.`);
}

await main();
