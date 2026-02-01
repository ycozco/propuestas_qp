async function loadPartials() {
    try {
        // Find placeholders
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        // Fetch Header
        if (headerPlaceholder) {
            const resp = await fetch('../../partials/header.html');
            if (resp.ok) {
                headerPlaceholder.innerHTML = await resp.text();
            } else {
                console.error('Failed to load header');
            }
        }

        // Fetch Footer
        if (footerPlaceholder) {
            const resp = await fetch('../../partials/footer.html');
            if (resp.ok) {
                footerPlaceholder.innerHTML = await resp.text();
            } else {
                console.error('Failed to load footer');
            }
        }

        // Emit event so Router knows DOM is ready
        window.dispatchEvent(new Event('componentsLoaded'));

    } catch (error) {
        console.error('Error loading partials:', error);
    }
}

// Run loader
document.addEventListener('DOMContentLoaded', loadPartials);
