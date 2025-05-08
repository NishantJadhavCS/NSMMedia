function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}



document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.services-carousel');
    if (!carousel) return;

    let isScrolling = false;

    carousel.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isScrolling) return;

        const scrollAmount = e.deltaY < 0 ? -20 : 20; // Smaller step for smoother feel
        isScrolling = true;

        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });

        // Add a slight delay to avoid stacking too many scrolls
        setTimeout(() => {
            isScrolling = false;
        }, 100); // Tune this delay for responsiveness vs. smoothness
    }, { passive: false });

    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true
    });
});
