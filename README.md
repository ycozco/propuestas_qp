# QP Secure Solutions - Propuestas

Sitio web estático para presentar las propuestas tecnológicas de QP Secure Solutions, optimizado para GitHub Pages.

## 🚀 Estructura del Proyecto

```
propuestas_qp/
├── index.html              # Página principal con listado de propuestas
├── propuestas/
│   └── sistema-educativo.html  # Detalle de la propuesta educativa
├── styles/
│   ├── main.css           # Estilos globales y tema
│   └── propuesta.css      # Estilos específicos para páginas de detalle
└── scripts/
    └── main.js            # JavaScript para animaciones e interactividad
```

## 🎨 Características

- **Diseño Premium**: Dark theme con gradientes vibrantes y animaciones suaves
- **Totalmente Responsive**: Optimizado para desktop, tablet y móvil
- **Animaciones Modernas**: Efectos de scroll, hover y transiciones fluidas
- **SEO Optimizado**: Meta tags, estructura semántica y performance
- **GitHub Pages Ready**: Estructura lista para deployment inmediato

## 📦 Deployment en GitHub Pages

### Opción 1: Desde la raíz del repositorio

1. Asegúrate de que `index.html` esté en la raíz
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Guarda y espera el deployment

### Opción 2: Desde carpeta docs

1. Renombra la carpeta a `docs/`
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/docs`
4. Guarda y espera el deployment

### Opción 3: Rama gh-pages

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Luego en Settings → Pages selecciona la rama `gh-pages`.

## 🌐 URL del Sitio

Una vez deployado, tu sitio estará disponible en:
```
https://[tu-usuario].github.io/propuestas_qp/
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript Vanilla**: Sin dependencias externas
- **Google Fonts**: Inter & Outfit

## 📝 Agregar Nuevas Propuestas

1. **Crear nueva página HTML** en `propuestas/`:
   ```html
   propuestas/nombre-propuesta.html
   ```

2. **Agregar card en index.html**:
   ```html
   <article class="propuesta-card" data-aos="fade-up">
       <!-- Contenido de la card -->
   </article>
   ```

3. **Usar los estilos existentes** de `propuesta.css`

## 🎯 Propuestas Actuales

### 1. Plataforma Educativa Multi-Sede
Sistema integral para instituciones educativas con:
- Gestión de Olimpiadas
- Inscripciones y pagos digitales (Yape + WhatsApp)
- Registro académico y notas bimestrales
- Arquitectura multi-sede
- Stack: CakePHP, MySQL, WhatsApp API

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎨 Paleta de Colores

```css
--color-primary: #8b5cf6 (Púrpura)
--color-secondary: #ec4899 (Rosa)
--color-accent: #06b6d4 (Cyan)
--color-bg: #0a0a0f (Fondo oscuro)
```

## 📄 Licencia

© 2026 QP Secure Solutions. Todos los derechos reservados.

## 📧 Contacto

Para más información: contacto@qpsecure.com