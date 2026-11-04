@echo off
cd /d "%~dp0"
echo Avvio del server Tombola in corso...
echo Non chiudere questa finestra finche' stai giocando.
echo.
"%~dp0python-portable\python.exe" "%~dp0app\server.py"
pause
