@echo off
echo Publishing to GitHub...
git add .
set /p MSG="Commit message (or press Enter for 'update'): "
if "%MSG%"=="" set MSG=update
git commit -m "%MSG%"
git push origin main
echo.
echo Done! Your site will update in about 60 seconds.
echo Visit: https://alecohanesian.com
pause
