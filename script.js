/**
 * Coach César - Premium Web Interaction
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 2. Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Initial check and event listener
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 4. Form Submission Mock
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Enviando...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                btn.textContent = 'Solicitud Enviada ✓';
                btn.style.backgroundColor = '#10b981'; // Green success
                btn.style.borderColor = '#10b981';
                btn.style.color = '#fff';

                contactForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // 5. Calendar Modal Logic
    const calendarModal = document.getElementById('calendar-modal');
    const openCalendarBtns = document.querySelectorAll('.open-calendar-btn');
    const closeCalendarBtn = document.getElementById('close-modal');

    if (calendarModal && closeCalendarBtn) {
        openCalendarBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                calendarModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevenir scroll del body mientras el modal está abierto
            });
        });

        const closeModal = () => {
            calendarModal.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        };

        closeCalendarBtn.addEventListener('click', closeModal);

        // Cerrar al hacer click fuera del contenido del modal
        calendarModal.addEventListener('click', (e) => {
            if (e.target === calendarModal) {
                closeModal();
            }
        });

        // Cerrar con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && calendarModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
