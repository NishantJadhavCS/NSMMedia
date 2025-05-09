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

        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }, { passive: false });

    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
    });

    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 10;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) return;

        if (scrollTop > lastScrollTop) {
            navbar.style.top = "-80px";
        } else {
            navbar.style.top = "0";
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    const words = ['restaurants', 'salons', 'auto brands', 'influencers'];
    const target = document.querySelector('.typewriter-text');

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        const displayed = currentWord.substring(0, charIndex);
        target.textContent = displayed;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typingSpeed = 50;
        } else {
            if (!isDeleting) {
                isDeleting = true;
                typingSpeed = 1200; // pause before deleting
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    
});