// Accordion Item Functional Handlers
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');

    trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        if (isOpen) {
            closeAccordion(item, content, icon);
        } else {
            accordionItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('is-open')) {
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherIcon = otherItem.querySelector('.accordion-icon');
                    closeAccordion(otherItem, otherContent, otherIcon);
                }
            });
            openAccordion(item, content, icon);
        }
    });
});

function openAccordion(item, content, icon) {
    content.style.maxHeight = content.scrollHeight + 'px';
    content.classList.remove('opacity-0', '-translate-y-4');
    content.classList.add('opacity-100', 'translate-y-0');
    icon.classList.add('-rotate-180', 'bg-sand');
    item.classList.add('is-open');
}

function closeAccordion(item, content, icon) {
    content.style.maxHeight = '0px';
    content.classList.add('opacity-0', '-translate-y-4');
    content.classList.remove('opacity-100', 'translate-y-0');
    icon.classList.remove('-rotate-180', 'bg-sand');
    item.classList.remove('is-open');
}






// Bi-directional Uneven Scroll Reveal Controller
const cardContainerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Target all immediate card wrappers inside the main container row
        const cards = entry.target.children;

        // Explicit, asymmetric layout settings for each card (Duration, Delay)
        const timings = [
            { duration: "600ms", delay: "0ms" },
            { duration: "1000ms", delay: "150ms" },
            { duration: "400ms", delay: "400ms" }
        ];

        Array.from(cards).forEach((card, index) => {
            const config = timings[index] || { duration: "600ms", delay: "0ms" };

            if (entry.isIntersecting) {
                // SCROLLING IN VIEW: Fade in and slide up unevenly
                card.style.transition = `opacity ${config.duration} ease-out ${config.delay}, transform ${config.duration} cubic-bezier(0.16, 1, 0.3, 1) ${config.delay}`;
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            } else {
                // SCROLLING OFF VIEW (Reverse Scroll): Fade out and slide down
                card.style.transition = `opacity 500ms ease-in, transform 500ms ease-in`;
                card.style.opacity = "0";
                card.style.transform = "translateY(40px)";
            }
        });
    });
}, {
    root: null,
    threshold: 0.10, // Triggers as soon as 10% of the row block enters or exits the viewport
    rootMargin: "-20px 0px -150px 0px"
});

// Run setup initialization safely after DOM elements render
document.addEventListener("DOMContentLoaded", () => {
    // Find your cards container element
    const container = document.querySelector(".lg\\:items-stretch");

    if (container) {
        // Set initial hidden fallback styles on all children inside the container
        Array.from(container.children).forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(40px)";
            card.style.willChange = "opacity, transform";
        });

        // Start watching the row container
        cardContainerObserver.observe(container);
    }
});
