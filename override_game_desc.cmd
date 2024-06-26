@echo off
setlocal enabledelayedexpansion

set "RELEASE_VERSION=%~1"
if "%RELEASE_VERSION%"=="" set "RELEASE_VERSION=beta"

set "SOURCE[0]=.\game-desc-backup\%RELEASE_VERSION%\dv-game.desc"
set "DESTINATION[0]=.\dragon-verse\game.desc"
set "SOURCE[1]=.\game-desc-backup\%RELEASE_VERSION%\ps-game.desc"
set "DESTINATION[1]=.\pet-simulator\game.desc"
set "SOURCE[2]=.\game-desc-backup\%RELEASE_VERSION%\bw-game.desc"
set "DESTINATION[2]=.\battleworld\game.desc"

:: Count of source-destination pairs
set /a "COUNT=3"

:: Perform the copy operations
for /L %%i in (0, 1, !COUNT! - 1) do (
    set "SRC=!SOURCE[%%i]!"
    set "DST=!DESTINATION[%%i]!"

    echo Copying from !SRC! to !DST!...
    xcopy "!SRC!" "!DST!" /I /E /Y

    if !ERRORLEVEL! EQU 0 (
        echo Successfully copied from !SRC! to !DST!.
    ) else (
        echo Failed to copy from !SRC! to !DST!.
    )
)

echo.
echo All operations completed.
pause
endlocal