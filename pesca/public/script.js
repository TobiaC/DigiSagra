let articoli = {};

// 1. Caricamento dei dati (rimane lo stesso)
fetch('articoli.json')
  .then(res => res.json())
  .then(data => { articoli = data; })
  .catch(err => console.error('Errore nel caricamento articoli.json:', err));

const form = document.getElementById('form-numero');
const input = document.getElementById('input-numero');
const risultato = document.getElementById('risultato');

// Funzione di supporto per determinare se un numero è compreso in un intervallo (es. "10-13")
function isInRange(numero, rangeStr) {
    if (!rangeStr || !rangeStr.includes('-')) return false; // Non è un intervallo valido

    const [startStr, endStr] = rangeStr.split('-');
    const start = parseInt(startStr);
    const end = parseInt(endStr);
    const num = parseInt(numero);

    // Controlla se il numero inserito è tra l'inizio e la fine dell'intervallo (inclusi)
    return num >= start && num <= end;
}


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const numero = input.value.trim();
  if (!numero) return;

  let trovatoArticolo = null;

  // Itera su tutte le chiavi dell'oggetto articoli per trovare la corrispondenza
  for (const key in articoli) {
    // Verifichiamo se il numero inserito corrisponde esattamente alla chiave (es. "1")
    if (key === numero) {
      trovatoArticolo = articoli[key];
      break;
    }

    // Verifichiamo se il numero inserito rientra nell'intervallo definito dalla chiave (es. "10-13")
    if (isInRange(numero, key)) {
      trovatoArticolo = articoli[key];
      break;
    }
  }

  // Aggiornamento dell'output
  risultato.classList.remove('nascosto', 'trovato', 'non-trovato');

  if (trovatoArticolo) {
    // Se abbiamo trovato un articolo tramite intervallo
    risultato.textContent = `Intervallo ${numero} → ${trovatoArticolo}`;
    risultato.classList.add('trovato');
  } else {
    // Nessun risultato trovato
    risultato.textContent = `Nessun articolo trovato per il numero ${numero} o l'intervallo specificato`;
    risultato.classList.add('non-trovato');
  }

  input.select();
});

// Codice Service Worker (rimane invariato)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.error('Registrazione service worker fallita:', err);
    });
  });
}
