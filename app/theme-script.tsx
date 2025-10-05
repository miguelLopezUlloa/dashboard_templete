export function ThemeScript() {
  // Este script se ejecuta ANTES de que React se monte
  const themeScript = `
    (function() {
      try {
        // Leer tema guardado
        const colorTheme = localStorage.getItem('color-theme') || 'matsu';
        
        // Aplicar inmediatamente
        const root = document.documentElement;
        const themes = ['matsu', 'theme-modern', 'theme-ocean', 'theme-ghibli'];
        
        // Remover todas las clases de tema
        themes.forEach(t => root.classList.remove(t));
        
        // Aplicar el tema guardado
        root.classList.add(colorTheme);
        
        console.log('✓ Tema aplicado:', colorTheme);
      } catch (e) {
        console.error('Error aplicando tema:', e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
