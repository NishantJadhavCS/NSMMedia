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

    AOS.init({
        duration: 600, // Animation duration
        easing: 'ease-in-out', // Easing function for smoother transitions
        once: true // Animation occurs once when scrolling into view
    });
});
