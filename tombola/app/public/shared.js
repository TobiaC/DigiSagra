// Logica di rendering condivisa tra pagina di regia e pagina tabellone
(function () {
  const TOTAL = 90;

  function buildGrid(container) {
    container.innerHTML = '';
    for (let n = 1; n <= TOTAL; n++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = 'cell-' + n;
      cell.textContent = n;
      container.appendChild(cell);
    }
  }

  function renderState(state, els) {
    const drawnSet = new Set(state.drawn);
    for (let n = 1; n <= TOTAL; n++) {
      const cell = document.getElementById('cell-' + n);
      if (!cell) continue;
      cell.classList.toggle('drawn', drawnSet.has(n));
      cell.classList.toggle('current', n === state.current);
    }
    if (els.current) {
      els.current.textContent = state.current !== null ? state.current : '-';
    }
    if (els.remainingCount) {
      els.remainingCount.textContent = state.remaining.length;
    }
  }

  window.TombolaShared = { TOTAL, buildGrid, renderState };
})();
