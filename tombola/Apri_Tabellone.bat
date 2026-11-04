@echo off
set /p IP="Inserisci l'indirizzo IP del PC di Regia (es. 192.168.1.23): "
start "" "http://%IP%:8000/board.html"
