/**
 * Simple client-side router for GitHub Pages
 * Handles navigation without full page reloads to maintain Navbar state
 */

console.log('Router Router Initialized');

// Listen for partials loading
window.addEventListener('componentsLoaded', () => {
    // Determine current filename
    let path = window.location.pathname.split('/').pop();
    if (!path) path = 'index.html'; // Root is index
    updateActiveLink(path);
});

document.addEventListener('DOMContentLoaded', () => {
    // Intercept all clicks on .nav-link
    document.body.addEventListener('click', async (e) => {
        const link = e.target.closest('.nav-link');
        if (!link) return;

        const href = link.getAttribute('href');

        // Ignore hash links, external links, or parent directory links (../) that go outside the SPA context if desired.
        // For this task, we want to capture sibling links (negocio.html, cotizacion.html) and self (index.html).
        // We will allow ../index.html to trigger a full reload to "exit" the SPA context, or handle it if we want to be fancy.
        // Allowing ../index.html to reload is safer to reset state.

        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
            return;
        }

        // If it goes back to root (../), let it reload usually, unless we want to SPA that too.
        // Let's reload for root to be safe.
        if (href.includes('../')) {
            return;
        }

        e.preventDefault();

        // Update URL
        // Simple heuristic: if we are at /propuestas/sistema-educativo/index.html and go to negocio.html
        // target is /propuestas/sistema-educativo/negocio.html

        try {
            await loadRoute(href);

            // Update History
            window.history.pushState({ path: href }, '', href);
        } catch (error) {
            console.error('Navigation failed:', error);
            window.location.href = href; // Fallback to normal navigation
        }
    });

    // Handle Back/Forward
    window.addEventListener('popstate', (e) => {
        // We can just reload on popstate to be safe, or try to re-render.
        // Reloading is safest for a simple implementation.
        window.location.reload();
    });
});

async function loadRoute(url) {
    const mainContainer = document.getElementById('app-content');
    if (!mainContainer) {
        console.error('No #app-content found, reloading...');
        window.location.href = url;
        return;
    }

    // Add loading opacity
    mainContainer.style.opacity = '0.5';
    mainContainer.style.transition = 'opacity 0.2s';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const html = await response.text();

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract new content
        const newContent = doc.getElementById('app-content');
        if (!newContent) {
            throw new Error('Target page has no #app-content');
        }

        // Check for specific styles (Cotizacion)
        handleSpecificStyles(url);

        // Swap Content
        mainContainer.innerHTML = newContent.innerHTML;

        // Update document title
        document.title = doc.title;

        // Update Active Nav Link
        updateActiveLink(url);

        // Re-initialize scripts
        if (window.initApp) {
            window.initApp();
        }

        // Scroll to top
        window.scrollTo(0, 0);

    } catch (err) {
        console.error(err);
        window.location.href = url; // Fallback
    } finally {
        mainContainer.style.opacity = '1';
    }
}

function updateActiveLink(url) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        // Simple match
        if (href === url || (url === 'index.html' && href.endsWith('index.html'))) {
            link.classList.add('active');
        }
    });
}

function handleSpecificStyles(url) {
    // If navigating to cotizacion.html, ensure cotizacion.css is loaded
    // If navigating away, maybe disable it? 
    // Actually, cotizacion.css uses specific classes (.quotation-body, .quotation-container), 
    // so it shouldn't conflict with main.css if named correctly.
    // However, cotizacion.html might need the link tag injected if it wasn't there.

    // We will ensure all pages have the link, or dynamically inject it.
    // Let's dynamically inject to be safe.
    if (url.includes('cotizacion.html')) {
        if (!document.querySelector('link[href*="cotizacion.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '../../styles/cotizacion.css';
            document.head.appendChild(link);
        }
    }
}
