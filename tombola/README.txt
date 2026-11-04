====================================================
 TOMBOLA IN RETE LOCALE - ISTRUZIONI
====================================================

CONTENUTO
---------
tombola-usb\
  python-portable\   
  app\                <-- il programma (non modificare)
  Avvia_Regia.bat     <-- da avviare SOLO sul PC che estrae i numeri
  Apri_Tabellone.bat  <-- da avviare sull'ALTRO PC
  README.txt         <-- questo file


PASSO 1 - Avviare la Regia (sul PC che comanda l'estrazione dei numeri)
-------------------------------------------------------------------------
1. Copia (o esegui direttamente dalla chiavetta) la cartella "tombola-usb"
2. Fai doppio click su "Avvia_Regia.bat"
3. Si aprirà una finestra nera (il server) e poi il browser con la pagina di Regia
4. Nella finestra nera è scritto l'indirizzo da usare sull'altro PC, tipo:
   http://192.168.1.23:8000/board.html
   ANNOTA QUESTO INDIRIZZO (o l'IP che appare)
5. NON chiudere la finestra nera finché state giocando: è il server.

Se Windows chiede il permesso al firewall, scegli "Consenti l'accesso"
per la rete PRIVATA (necessario perché l'altro PC possa collegarsi).


PASSO 2 - Aprire il Tabellone (su un altro PC)
---------------------------------------------------------------------
Su quel PC NON serve Python, basta un browser (Chrome, Edge, Firefox...).
Due modi, a scelta:

  A) Apri manualmente il browser e scrivi nella barra degli indirizzi:
     http://<IP-DEL-PC-DI-REGIA>:8000/board.html
     (sostituisci con l'indirizzo annotato al Passo 1)

  B) Oppure copia anche la cartella "tombola-usb" su quel PC/chiavetta
     e fai doppio click su "Apri_Tabellone.bat": ti chiederà l'IP e
     aprirà da solo il browser sulla pagina giusta.
  
  C) Se si vuole aprire il tabellone sullo stesso PC, avviare "Apri_Tabellone.bat"
     ed inserire l'indirizzo 127.0.0.1

NOTE
----
- Entrambi i PC devono essere sulla STESSA rete Wi-Fi/LAN.
- Il tabellone si aggiorna da solo ogni secondo: non serve premere nulla.
- Puoi aprire il tabellone su più PC/monitor contemporaneamente.
- Se l'IP del PC di Regia cambia (es. dopo un riavvio del router),
  ricontrolla l'indirizzo stampato nella finestra nera all'avvio.
- "Nuova partita" nella pagina di Regia azzera tutti i numeri estratti.
