# Quick Start Guide

## PowerShell Execution Policy Issue

If you're getting PowerShell execution policy errors, use one of these solutions:

### Solution 1: Use Command Prompt (Easiest)
1. Open **Command Prompt** (cmd.exe) - not PowerShell
2. Navigate to the project:
   ```
   cd C:\Users\r2dev\OneDrive\Desktop\kevin_profile
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the dev server:
   ```
   npm run dev
   ```

### Solution 2: Bypass PowerShell Policy (One-time)
Run this in PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then run:
```powershell
npm install
npm run dev
```

### Solution 3: Use the provided script
Run this command in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File install-and-run.ps1
```

## After Installation

Once dependencies are installed, you can run:
```bash
npm run dev
```

The site will be available at: http://localhost:3000

