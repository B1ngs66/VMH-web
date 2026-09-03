param(
    [string]$StartUrl = 'https://vmh.com.hk/',
    [string]$OutputDirectory = 'reference-site'
)

$ErrorActionPreference = 'Stop'
$rootUri = [Uri]$StartUrl
$outputRoot = [IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputDirectory))
$allowedHosts = @($rootUri.Host, "www.$($rootUri.Host)")
$queue = [Collections.Generic.Queue[Uri]]::new()
$visited = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$downloaded = [Collections.Generic.List[object]]::new()

New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null
$queue.Enqueue($rootUri)

function Get-LocalPath([Uri]$uri, [string]$contentType) {
    $relative = [Uri]::UnescapeDataString($uri.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrWhiteSpace($relative)) {
        $relative = 'index.html'
    } elseif ($relative.EndsWith('/')) {
        $relative = Join-Path $relative 'index.html'
    } elseif ($contentType -match 'text/html' -and -not [IO.Path]::HasExtension($relative)) {
        $relative = Join-Path $relative 'index.html'
    }

    if ($uri.Query) {
        $queryHash = [Convert]::ToHexString(
            [Security.Cryptography.SHA256]::HashData(
                [Text.Encoding]::UTF8.GetBytes($uri.Query)
            )
        ).Substring(0, 10).ToLowerInvariant()
        $directory = [IO.Path]::GetDirectoryName($relative)
        $name = [IO.Path]::GetFileNameWithoutExtension($relative)
        $extension = [IO.Path]::GetExtension($relative)
        $queryName = "$name.query-$queryHash$extension"
        $relative = if ([string]::IsNullOrWhiteSpace($directory)) {
            $queryName
        } else {
            Join-Path $directory $queryName
        }
    }

    return Join-Path $outputRoot $relative
}

function Add-DiscoveredUrl([string]$candidate, [Uri]$baseUri) {
    if ([string]::IsNullOrWhiteSpace($candidate)) { return }
    $value = [Net.WebUtility]::HtmlDecode($candidate.Trim())
    if ($value -match '^(?:data:|mailto:|tel:|javascript:|#|\$\{)') { return }

    try { $uri = [Uri]::new($baseUri, $value) } catch { return }
    if ($uri.Scheme -notin @('http', 'https')) { return }
    if ($allowedHosts -notcontains $uri.Host) { return }

    $builder = [UriBuilder]$uri
    $builder.Fragment = ''
    $normalized = $builder.Uri
    if (-not $visited.Contains($normalized.AbsoluteUri)) {
        $queue.Enqueue($normalized)
    }
}

while ($queue.Count -gt 0 -and $visited.Count -lt 500) {
    $uri = $queue.Dequeue()
    if (-not $visited.Add($uri.AbsoluteUri)) { continue }

    try {
        $response = Invoke-WebRequest -Uri $uri -UseBasicParsing -MaximumRedirection 8 -TimeoutSec 45
    } catch {
        $downloaded.Add([pscustomobject]@{
            url = $uri.AbsoluteUri
            status = 'error'
            localPath = $null
            message = $_.Exception.Message
        })
        continue
    }

    $contentType = [string]$response.Headers['Content-Type']
    $localPath = Get-LocalPath $uri $contentType
    $localDirectory = Split-Path -Parent $localPath
    New-Item -ItemType Directory -Path $localDirectory -Force | Out-Null

    if ($response.RawContentStream) {
        $memory = [IO.MemoryStream]::new()
        $response.RawContentStream.CopyTo($memory)
        [IO.File]::WriteAllBytes($localPath, $memory.ToArray())
        $memory.Dispose()
    } else {
        [IO.File]::WriteAllText($localPath, [string]$response.Content, [Text.UTF8Encoding]::new($false))
    }

    $downloaded.Add([pscustomobject]@{
        url = $uri.AbsoluteUri
        status = [int]$response.StatusCode
        localPath = [IO.Path]::GetRelativePath($outputRoot, $localPath)
        message = $null
    })

    $isText = $contentType -match '(?:text/|javascript|json|xml|svg)' -or $localPath -match '\.(?:html?|css|js|json|xml|svg)$'
    if (-not $isText) { continue }
    $text = [string]$response.Content

    $patterns = @(
        '(?is)(?:href|src|poster|action)\s*=\s*["'']([^"'']+)',
        '(?is)url\(\s*["'']?([^\)"'']+)',
        '(?is)["'']((?:\.?\.?/)?[A-Za-z0-9_./%+~-]+\.(?:html?|css|js|json|svg|png|jpe?g|gif|webp|avif|ico|pdf|woff2?|ttf|otf)(?:\?[^"'']*)?)["'']'
    )
    foreach ($pattern in $patterns) {
        foreach ($match in [regex]::Matches($text, $pattern)) {
            Add-DiscoveredUrl $match.Groups[1].Value $uri
        }
    }
}

$manifestPath = Join-Path $outputRoot 'snapshot-manifest.json'
$downloaded | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding utf8

$successCount = @($downloaded | Where-Object { $_.status -ne 'error' }).Count
$errorCount = @($downloaded | Where-Object { $_.status -eq 'error' }).Count
Write-Output "Saved $successCount public resources to $outputRoot"
Write-Output "Errors: $errorCount"
Write-Output "Manifest: $manifestPath"
