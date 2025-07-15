document.querySelectorAll('.materia').forEach(btn => {
  btn.addEventListener('click', () => {
    // Mostrar correlativas
    const correlativas = btn.dataset.correlativas;
    const nombre = btn.textContent;

    if (!btn.classList.contains('tachada')) {
      if (!correlativas) {
        alert(`${nombre} no tiene correlativas.`);
      } else {
        const ids = correlativas.split(',');
        const materias = Array.from(document.querySelectorAll('.materia'));
        const nombresCorrelativas = ids.map(id => {
          const m = materias.find(m => m.dataset.id === id);
          return m ? m.textContent : `(id: ${id})`;
        });
        alert(`${nombre} requiere:\n\n- ${nombresCorrelativas.join('\n- ')}`);
      }
    }

    // Tachar y bloquear
    btn.classList.toggle('tachada');
    btn.disabled = true;

    // Verificar desbloqueo de materias
    document.querySelectorAll('.materia').forEach(m => {
      const corr = m.dataset.correlativas?.split(',') || [];
      if (corr.length > 0) {
        const todasTachadas = corr.every(id =>
          document.querySelector(`.materia[data-id="${id}"]`)?.classList.contains('tachada')
        );
        if (todasTachadas && m.disabled) {
          m.disabled = false;
        }
      }
    });
  });
});
