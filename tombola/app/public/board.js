document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const currentEl = document.getElementById('current');

  TombolaShared.buildGrid(grid);

  async function refresh() {
    try {
      const res = await fetch('/api/state', { cache: 'no-store' });
      const state = await res.json();
      TombolaShared.renderState(state, { current: currentEl });
    } catch (e) {
      // la regia potrebbe essere temporaneamente irraggiungibile, si riprova al prossimo giro
    }
  }

  refresh();
  setInterval(refresh, 1000);
});
