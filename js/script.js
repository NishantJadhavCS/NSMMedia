function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function redirectToWhatsApp() {
    const phoneNumber = "918356993699";
    const message = "Hi I want to know more about NSM Media";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.services-carousel');
    if (!carousel) return;

    let isScrolling = false;

    carousel.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (isScrolling) return;

        const scrollAmount = e.deltaY < 0 ? -20 : 20;
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
    const navbar = document.querySelector('.navbar-container');
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

    const words = ['restaurants', 'salons', 'auto brands', 'influencers.'];
    const target = document.querySelector('.typewriter-text');

    let wordIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let sentence = '';

    function typeNextWord() {
        const currentWord = words[wordIndex];

        if (charIndex < currentWord.length) {
            sentence += currentWord.charAt(charIndex);
            target.textContent = sentence;
            charIndex++;
            setTimeout(typeNextWord, 100);
        } else {
            if (wordIndex < words.length - 2) {
                sentence += ', ';
            } else if (wordIndex === words.length - 2) {
                sentence += ' and ';
            }

            wordIndex++;
            charIndex = 0;

            if (wordIndex < words.length) {
                setTimeout(typeNextWord, 400);
            }
        }
    }

    // Start the typing effect
    typeNextWord();
    const testimonialTrack = document.getElementById('testimonialCarousel');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');

    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let autoScrollInterval;

    const slideWidth = () => testimonialSlides[0].offsetWidth + 32; // Assuming 2rem = 32px gap
    const maxIndex = testimonialSlides.length - 2; // allow final pair to show

    function updateTransform() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * slideWidth()}px)`;
    }

    function autoScrollStart() {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
            updateTransform();
        }, 5000);
    }

    function autoScrollStop() {
        clearInterval(autoScrollInterval);
    }

    autoScrollStart();

    // --- Drag functionality ---
    testimonialTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        testimonialTrack.style.transition = 'none';
        autoScrollStop();
        
    });

    testimonialTrack.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const delta = e.pageX - startX;

        if (delta < -50 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (delta > 50 && currentIndex > 0) {
            currentIndex--;
        }

        testimonialTrack.style.transition = 'transform 0.5s ease';
        updateTransform();
        autoScrollStart();
    });
    

    testimonialTrack.addEventListener('mouseleave', () => {
        if (isDragging) {
            testimonialTrack.dispatchEvent(new MouseEvent('mouseup'));
        }
    });

    testimonialTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.pageX - startX;
        const offset = -currentIndex * slideWidth() + dx;
        testimonialTrack.style.transform = `translateX(${offset}px)`;
    });


    testimonialTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        testimonialTrack.style.transition = 'none';
        autoScrollStop();
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].pageX;
        const delta = endX - startX;

        if (delta < -50 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (delta > 50 && currentIndex > 0) {
            currentIndex--;
        }

        testimonialTrack.style.transition = 'transform 0.5s ease';
        updateTransform();
        autoScrollStart();
    });

    testimonialTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const dx = e.touches[0].pageX - startX;
        const offset = -currentIndex * slideWidth() + dx;
        testimonialTrack.style.transform = `translateX(${offset}px)`;
    }, { passive: true });

    window.addEventListener('load', () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
});