@echo off
:: ── publish.bat ───────────────────────────────────────────────────────────────
:: Pushes all changes to GitHub. GitHub Actions builds and deploys automatically.
:: Run this from the root of your site folder after writing a new post.
:: ─────────────────────────────────────────────────────────────────────────────

echo Publishing to GitHub...

git add .

set /p MSG="Commit message (or press Enter for 'new post'): "
if "%MSG%"=="" set MSG=new post

git commit -m "%MSG%"
git push origin main

echo.
echo Done! Your site will update in about 60 seconds.
echo Visit: https://alecohanesian.com
pause
