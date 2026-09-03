# VMH Corporate Website

天機控股有限公司（VM Holding Company Limited）中英文企業官網。網站使用 Next.js、TypeScript 和靜態內容檔案，不需要資料庫或應用伺服器；`pnpm build` 會把可直接託管的成品輸出到 `out/`。

正式站點：<https://vmh.com.hk/>

## 技術與發布方式

- Next.js App Router 靜態匯出（`output: "export"`）
- Node.js 22、pnpm 10
- GitHub Actions 自動檢查及建置
- GitHub Pages 託管
- `main` 分支每次有新提交時自動發布
- 不需要 GitHub Secret、資料庫或後端服務

`out/`、`.next/` 和 `node_modules/` 都是產生物，不要手動修改或提交。網站的文字、JSON、圖片和公告文件才是需要保存到 Git 的來源檔案。

## 本機安裝與驗證

先安裝 [Git](https://git-scm.com/downloads) 和 [Node.js 22 LTS](https://nodejs.org/)，然後在專案目錄執行：

```powershell
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

瀏覽器開啟 <http://localhost:3000/> 檢查網站；完成後在終端按 `Ctrl+C` 停止預覽。只有上述檢查全部成功，才應發布或更改 DNS。

## 從空 GitHub 倉庫首次發布

### 1. 建立倉庫

在持有 `vmh.com.hk` 網站的 GitHub 使用者或組織下建立空倉庫：

- GitHub Free 建議使用公開倉庫；私有倉庫使用 Pages 需要相應的付費方案。
- 不要勾選自動建立 README、`.gitignore` 或 License，避免首次推送衝突。
- 推薦把倉庫命名為 `GITHUB帳戶名.github.io`。其他名稱也能配合自訂域名使用，但未接上 `vmh.com.hk` 前，GitHub 的專案子路徑預覽可能無法正確載入根路徑資源。

### 2. 推送現有原始碼

把下面的 `YOUR-ACCOUNT` 和 `YOUR-REPOSITORY` 換成實際 GitHub 帳戶及倉庫名稱：

```powershell
git init
git add .
git status --short
git commit -m "Initial VMH corporate website"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

若 Git 提示沒有姓名或電郵，先按公司 GitHub 帳戶資料設定，再重新提交：

```powershell
git config user.name "YOUR NAME"
git config user.email "YOUR-EMAIL@example.com"
```

GitHub 已不接受帳戶密碼作 Git 推送驗證；HTTPS 推送時使用瀏覽器登入、Git Credential Manager 或個人存取權杖。不要把權杖、密碼、私鑰或任何公司機密提交到倉庫。

### 3. 啟用 GitHub Pages Actions

在倉庫中開啟 **Settings → Pages**，於 **Build and deployment** 把 **Source** 設為 **GitHub Actions**。

現有 `.github/workflows/deploy.yml` 會依次執行 lint、型別檢查、內容校驗和正式建置，再把 `out/` 發布到 Pages。第一次推送若早於 Pages 啟用，工作流程可能先失敗；啟用後到 **Actions → Deploy VMH website** 選擇 **Re-run all jobs**，或用 **Run workflow** 重新執行即可。

等待 `build` 和 `deploy` 兩個工作都顯示綠色勾號。若任何一步失敗，先修正錯誤並重新推送，不要開始 DNS 切換。

## 把 vmh.com.hk 指向 GitHub Pages

`.com.hk` 域名使用標準 DNS 設定。應在目前實際託管 DNS 的服務商中修改記錄；它不一定是購買域名的公司。可先查看域名的 nameserver 確認管理位置，不要為此次切換隨意更換 nameserver。

### 切換前的安全準備

1. 匯出或截圖保存目前全部 DNS 記錄。若舊站仍在運作，最好提前 24–48 小時把相關網頁記錄的 TTL 降至 300 秒。
2. **保留所有電郵記錄**，包括 MX、SPF、DKIM、DMARC 及其他 TXT 記錄。只替換與舊網站衝突的 `@` A/AAAA/ALIAS/ANAME 和 `www` 記錄，否則公司郵件可能中斷。
3. 建議先驗證域名所有權：在擁有倉庫的 GitHub 使用者或組織 **Settings → Pages** 選擇 **Add a domain**，輸入 `vmh.com.hk`，按 GitHub 顯示的名稱和值新增 TXT 記錄，再按 **Verify**。TXT 名稱通常以 `_github-pages-challenge-` 開頭；值必須以 GitHub 當時顯示的為準，驗證後也要長期保留。
4. 在倉庫 **Settings → Pages → Custom domain** 先填入 `vmh.com.hk` 並儲存，然後才改 DNS。`public/CNAME` 已固定為同一域名，請勿刪除或加入 `https://`。

先在 GitHub 設定自訂域名、後設定 DNS，可降低域名被其他 Pages 倉庫搶佔的風險。不要建立指向 GitHub Pages 的萬用字元記錄（例如 `*.vmh.com.hk`）。

### DNS 記錄

在 DNS 管理介面建立下列記錄。`@` 代表根域名（apex）`vmh.com.hk`；部分服務商會要求留空或直接填入 `vmh.com.hk`。每個 IP 是一筆獨立記錄。

| 類型 | 主機/名稱 | 值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `YOUR-ACCOUNT.github.io` |

把 `YOUR-ACCOUNT` 換成擁有倉庫的 GitHub 使用者或組織名稱；CNAME 值不要包含 `https://`、倉庫名稱或路徑。根域名不要使用 CNAME。若 DNS 服務商不支援 AAAA，可只使用四筆 A 記錄，但必須刪除指向舊主機的 AAAA 記錄，否則部分 IPv6 訪客仍會到舊站。

若使用 Cloudflare，初次簽發憑證期間建議先把上述記錄設為 **DNS only**（灰雲）。DNS 穩定、GitHub HTTPS 正常後才評估是否需要代理功能。

以上是 GitHub 目前公布的 Pages 位址；正式切換前可再核對 [GitHub 自訂域名文件](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)。若官方文件的位址日後有變，以官方最新資料為準。

### 啟用 HTTPS

DNS 更新可能立即生效，也可能需要最多 24 小時。GitHub 的 **Settings → Pages** 顯示 DNS check successful 並完成 TLS 憑證後，勾選 **Enforce HTTPS**。此選項最多可能 24 小時後才可用；憑證由 GitHub 自動簽發和續期，不要自行上傳憑證。

若憑證長時間無法建立：

- 確認 `@` 沒有遺留其他 A、AAAA、ALIAS 或 ANAME，且 `www` 沒有其他衝突記錄。
- 若域名已有 CAA 限制，須允許 Let's Encrypt（`letsencrypt.org`）簽發，同時保留公司其他必要的 CAA 設定。
- 暫時停用 DNS 代理後重新執行 GitHub 的 DNS check。

## 發布後驗證

可在 Windows PowerShell 檢查公開 DNS：

```powershell
Resolve-DnsName vmh.com.hk -Type A
Resolve-DnsName vmh.com.hk -Type AAAA
Resolve-DnsName www.vmh.com.hk -Type CNAME
```

AAAA 未設定時，第二條沒有結果是正常的。還應使用無痕瀏覽器及手機網絡完成以下檢查，避免只看到公司網絡或本機的舊 DNS 快取：

- **Actions → Deploy VMH website** 的最新執行全部成功。
- <https://vmh.com.hk/> 可開啟且瀏覽器沒有憑證警告。
- <https://www.vmh.com.hk/> 能安全轉到正式站點。
- <https://vmh.com.hk/en/> 顯示英文版，中文及英文切換正常。
- 新聞、投資者關係、私隱政策和使用條款頁面正常。
- 至少各開啟一份中文及英文公告 PDF，確認不是 404 或損壞檔案。
- 手機與桌面版沒有破版，圖片載入正常，頁面內沒有 HTTP 混合內容警告。

DNS 切換異常時，可把網頁相關記錄恢復為事前保存的舊值；不要動 MX/TXT 郵件記錄。DNS 回復同樣需要傳播時間。

## 更新網站內容

網站沒有資料庫，內容直接保存在下列來源檔案：

| 內容 | 檔案或目錄 |
| --- | --- |
| 公司資料及中英文頁面文字 | `src/content/site.ts` |
| SEO、標題及分享資料 | `src/content/metadata.ts` |
| 中文新聞 | `src/data/news.zh.json` |
| 英文新聞 | `src/data/news.en.json` |
| 中文公告索引 | `src/data/announcements.zh.json` |
| 英文公告索引 | `src/data/announcements.en.json` |
| 中文公告文件 | `public/form/` |
| 英文公告文件 | `public/form-en/` |
| 新聞及品牌圖片 | `public/picture/` |

### 新增公告

1. 只使用公司批准、已正式發布的文件；PDF 內容不要重新編輯。
2. 把中文和英文 PDF 分別放到 `public/form/` 與 `public/form-en/`，使用唯一且不含空格的檔名。
3. 在兩個公告 JSON 的最上方加入對應資料，保持最新日期在前。`fileUrl` 使用既有格式，例如 `form/文件名.pdf` 或 `form-en/文件名.pdf`，不要加開頭 `/`。
4. 確認日期、標題、檔案大小及中英文文件全部正確，再執行完整驗證。

`pnpm sync:filings` 只會嘗試補下載「已存在於 JSON、但本機缺少」且來源仍可取得的 PDF；它不會發現新公告，也不會更新 JSON。域名切到 GitHub Pages 後，不應把它當成新公告發布工具。

### 新增新聞

1. 在 `src/data/news.zh.json` 和 `src/data/news.en.json` 同時加入稿件，兩邊使用完全相同的 `slug` 和排列順序。
2. `slug` 只用小寫英文字母、數字及連字號，例如 `annual-results-2026`。
3. 圖片放在 `public/picture/news/`，並在 JSON 填寫正確路徑、替代文字及尺寸。
4. 英文稿件目前由中文公開稿翻譯而來，上線前必須由公司審核語意、公司名稱、數字和監管用語。

### 檢查、提交及自動發布

每次更新都先執行：

```powershell
pnpm validate:content
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

本機預覽確認後提交：

```powershell
git status --short
git add src public
git status --short
git commit -m "Update website content"
git push
```

提交前逐項查看 `git status --short`，確認沒有 `.env`、憑證、匯出報表、個人資料或其他非公開檔案。若本次也修改了 README 或程式設定，再明確加入相應檔案，不要為省事提交整個工作目錄。

公司流程建議使用分支及 Pull Request 讓另一位同事核對內容，再合併到 `main`。推送或合併後，無需手動上傳 `out/`；GitHub Actions 會重新建置並發布。必須等工作流程成功，再按「發布後驗證」抽查正式網站。

若新版本有問題，使用 `git revert` 建立反向提交並推送，讓 Actions 發布上一個正常狀態；不要用 force push 改寫上市公司網站的更新紀錄。

## 官方參考

- [GitHub Pages：管理自訂域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages：驗證自訂域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub Pages：HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Next.js：Static Exports](https://nextjs.org/docs/app/guides/static-exports)
