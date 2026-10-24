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

    // The observer batches every section whose visibility changed, so handle all of them.
    // A low threshold lets tall sections reveal as soon as any part of them is visible.
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -10% 0px',
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // --- Interactive Numbers Grid ---
    // UPDATE THIS ARRAY WITH THE NUMBERS THAT ARE CURRENTLY AVAILABLE!
    const availableNumbers = [15, 39, 43, 44, 45, 49, 51, 52, 55, 59, 61, 63, 68, 70, 74, 79, 80, 81, 83, 85, 86, 92, 93, 94];
    const gridContainer = document.getElementById('numbers-grid');

    // --- Crisp Chat Button Logic ---
    const crispButton = document.getElementById('crisp-chat-button');
    if (typeof $crisp !== 'undefined') {
        // Hide the chat bubble again whenever the visitor closes the chat
        $crisp.push(["on", "chat:closed", () => $crisp.push(["do", "chat:hide"])]);
    }
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
    const WHATSAPP_NUMBER = '447929059974';
    let selectedNumber = null;

    const closeModal = () => modal.classList.remove('active');

    // Open WhatsApp with the chosen number pre-filled, then close the modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            const text = selectedNumber
                ? `Hi, I'd like to secure number ${selectedNumber} in the 100 Club.`
                : 'Hi, I would like to join the 100 Club.';
            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
            closeModal();
        });
    }

    // Just close the modal
    if (modalDismiss) {
        modalDismiss.addEventListener('click', closeModal);
    }

    // Close with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Close when clicking the dark background (not the card itself)
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });
    }

    if (gridContainer) {
        for (let i = 1; i <= 100; i++) {
            // Real buttons so keyboard and screen-reader users can use the grid
            const numBox = document.createElement('button');
            numBox.type = 'button';
            numBox.classList.add('num-box');
            numBox.textContent = i;

            if (!availableNumbers.includes(i)) {
                numBox.classList.add('num-taken');
                numBox.disabled = true;
                numBox.title = "This number is already taken";
                numBox.setAttribute('aria-label', `Number ${i}, already taken`);
            } else {
                numBox.classList.add('num-available');
                numBox.title = "Number " + i + " is available! Click to learn more.";
                numBox.setAttribute('aria-label', `Number ${i}, available`);
                numBox.addEventListener('click', () => {
                    selectedNumber = i;
                    modalTitle.textContent = 'Number ' + i + ' Selected!';
                    modalMessage.textContent = 'Please message us on WhatsApp to secure it.';
                    modal.classList.add('active');
                });
            }

            gridContainer.appendChild(numBox);
        }
    }
});
