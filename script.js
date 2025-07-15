document.querySelectorAll('.materia').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('tachada');
    btn.disabled = true;

    // Verificar qué materias pueden activarse
    document.querySelectorAll('.materia').forEach(m => {
      const correlativas = m.dataset.correlativas?.split(',') || [];
      if (correlativas.length > 0) {
        const todasTachadas = correlativas.every(id => 
          document.querySelector(`.materia[data-id="${id}"]`)?.classList.contains('tachada')
        );
        if (todasTachadas && m.disabled) {
          m.disabled = false;
        }
      }
    });
  });
});
