@echo off
setlocal

:: ── new-post.bat ─────────────────────────────────────────────────────────────
:: Run this from the root of your site folder to create a new markdown post.
:: Usage:  new-post.bat
:: ─────────────────────────────────────────────────────────────────────────────

set /p POST_TYPE="Post type (essay / book-review): "
set /p TITLE="Title: "

:: Slugify title: lowercase, spaces to hyphens
set SLUG=%TITLE: =-%
call :lowercase SLUG

:: Date stamp
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do (
    set MM=%%a
    set DD=%%b
    set YYYY=%%c
)
set TODAY=%YYYY%-%MM%-%DD%

set FILENAME=content\posts\%SLUG%.md
set FULLPATH=%~dp0%FILENAME%

if "%POST_TYPE%"=="book-review" (
    set /p BOOK_AUTHOR="Book author: "
    set /p GENRE="Genre: "
    set /p RATING="Rating (e.g. 7.5): "
    (
        echo ---
        echo title: "%TITLE%"
        echo type: "book-review"
        echo book_author: "%BOOK_AUTHOR%"
        echo genre: "%GENRE%"
        echo rating: %RATING%
        echo date: %TODAY%
        echo summary: ""
        echo ---
        echo.
        echo Write your review here.
    ) > "%FULLPATH%"
) else (
    (
        echo ---
        echo title: "%TITLE%"
        echo type: "essay"
        echo date: %TODAY%
        echo summary: ""
        echo ---
        echo.
        echo Write your essay here.
    ) > "%FULLPATH%"
)

echo.
echo Created: %FILENAME%
echo Opening in Notepad...
start notepad "%FULLPATH%"

echo.
echo When you're done writing, run publish.bat to push to GitHub.
pause
exit /b

:lowercase
for %%i in (a b c d e f g h i j k l m n o p q r s t u v w x y z) do (
    call set %1=%%%1:%%i=%%i%%%
)
exit /b
