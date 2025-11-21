# PowerShell script to remove dark mode classes from all TSX/TS files
$files = Get-ChildItem -Path "app" -Recurse -Include *.tsx,*.ts -File
$pattern = '\s+dark:[^\s"]+'
$replace = ''

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace $pattern, $replace
    
    # Also remove standalone dark: classes
    $newContent = $newContent -replace 'dark:bg-gray-900', 'bg-white'
    $newContent = $newContent -replace 'dark:bg-gray-800', 'bg-white'
    $newContent = $newContent -replace 'dark:text-white', 'text-gray-900'
    $newContent = $newContent -replace 'dark:text-gray-300', 'text-gray-600'
    $newContent = $newContent -replace 'dark:text-gray-400', 'text-gray-500'
    $newContent = $newContent -replace 'dark:border-gray-800', 'border-gray-200'
    $newContent = $newContent -replace 'dark:border-gray-700', 'border-gray-200'
    $newContent = $newContent -replace 'dark:hover:bg-gray-800', 'hover:bg-gray-100'
    $newContent = $newContent -replace 'dark:hover:bg-blue-800', 'hover:bg-blue-100'
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "Dark mode removal complete!"




