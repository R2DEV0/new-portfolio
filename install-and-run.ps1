# PowerShell script to install dependencies and run dev server
# Run this with: powershell -ExecutionPolicy Bypass -File install-and-run.ps1

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run dev
} else {
    Write-Host "Installation failed. Please check the errors above." -ForegroundColor Red
}

