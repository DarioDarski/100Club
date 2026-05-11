document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple reveal animation on scroll
    const sections = document.querySelectorAll('.section');
    
    const revealSection = (entries, observer) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // --- Interactive Numbers Grid ---
    // UPDATE THIS ARRAY WITH THE NUMBERS THAT ARE CURRENTLY AVAILABLE!
    const availableNumbers = [2, 13, 23, 33, 38, 39, 42, 43, 44, 48, 49, 50, 51, 55, 57, 59, 61, 63, 64, 66, 67, 68, 70, 78, 79, 80, 81, 82, 83, 86, 92, 93, 94, 96]; 
    const gridContainer = document.getElementById('numbers-grid');

    // --- Crisp Chat Button Logic ---
    const crispButton = document.getElementById('crisp-chat-button');
    if (crispButton) {
        crispButton.addEventListener('click', () => {
            if (typeof $crisp !== 'undefined') {
                $crisp.push(["do", "chat:show"]);
                $crisp.push(["do", "chat:open"]);
            }
        });
    }

    // --- Custom Modal Logic ---
    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');
    const modalDismiss = document.getElementById('modal-dismiss');

    // Open WhatsApp and close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            window.open('https://wa.me/447929059974', '_blank');
            modal.classList.remove('active');
        });
    }

    // Just close the modal
    if (modalDismiss) {
        modalDismiss.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (gridContainer) {
        for (let i = 1; i <= 100; i++) {
            const numBox = document.createElement('div');
            numBox.classList.add('num-box');
            numBox.textContent = i;
            
            if (!availableNumbers.includes(i)) {
                numBox.classList.add('num-taken');
                numBox.title = "This number is already taken";
            } else {
                numBox.classList.add('num-available');
                numBox.title = "Number " + i + " is available! Click to learn more.";
                numBox.addEventListener('click', () => {
                    modalTitle.textContent = 'Number ' + i + ' Selected!';
                    modalMessage.textContent = 'Please message us on WhatsApp to secure it.';
                    modal.classList.add('active');
                });
            }
            
            gridContainer.appendChild(numBox);
        }
    }
});
