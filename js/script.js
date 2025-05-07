function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.services-carousel');

    if (!carousel) return; // Safeguard in case it's not found

    carousel.addEventListener('wheel', (e) => {
        e.preventDefault();
        carousel.scrollBy({
            left: e.deltaY < 0 ? -40 : 40,
            behavior: 'smooth'
        });
    }, { passive: false });
});
