@echo off
setlocal

set "ROOT_DIR=%~dp0"
set "DIRECTORIES=battleworld dragon-verse pet-simulator"

for %%D in (%DIRECTORIES%) do (
    echo.
    echo Running npm run update gsc depend in %%D...
    cd /D "%ROOT_DIR%%%D"
    if exist package.json (
        npm run "update gsc depend"
    ) else (
        echo package.json not found in %%D.
    )
    cd /D "%ROOT_DIR%"
)

echo.
echo All done.
endlocal
