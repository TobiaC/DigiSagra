document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const currentEl = document.getElementById('current');
  const remainingEl = document.getElementById('remaining');
  const drawForm = document.getElementById('drawForm');
  const numberInput = document.getElementById('numberInput');
  const resetBtn = document.getElementById('resetBtn');

  TombolaShared.buildGrid(grid);

  async function refresh() {
    const res = await fetch('/api/state', { cache: 'no-store' });
    const state = await res.json();
    TombolaShared.renderState(state, {
      current: currentEl,
      remainingCount: remainingEl,
    });
  }

  drawForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const number = parseInt(numberInput.value, 10);
    const res = await fetch('/api/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Numero non valido');
    } else {
      numberInput.value = '';
    }
    numberInput.focus();
    refresh();
  });

  resetBtn.addEventListener('click', async () => {
    if (confirm('Vuoi davvero iniziare una nuova partita? Tutti i numeri estratti verranno azzerati.')) {
      await fetch('/api/reset', { method: 'POST' });
      numberInput.value = '';
      refresh();
    }
  });

  refresh();
  setInterval(refresh, 1500); // riallinea lo stato anche se altri client hanno agito
});
