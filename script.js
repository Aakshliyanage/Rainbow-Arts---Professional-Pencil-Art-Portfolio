
       // Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('#nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Auto-advance slides
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Preview Functionality
const galleryPreviewModal = document.getElementById('galleryPreviewModal');
const galleryPreviewImg = document.getElementById('galleryPreviewImg');
const galleryPreviewTitle = document.getElementById('galleryPreviewTitle');
const galleryPreviewDesc = document.getElementById('galleryPreviewDesc');
const closeGalleryPreview = document.getElementById('closeGalleryPreview');
const galleryPrevBtn = document.getElementById('galleryPrevBtn');
const galleryNextBtn = document.getElementById('galleryNextBtn');

let currentGalleryIndex = 0;
let galleryImages = [];
let filteredGalleryImages = [];

// Initialize gallery images array
function initGalleryImages() {
    galleryImages = Array.from(galleryItems);
    updateFilteredGalleryImages();
}

// Update filtered images based on active filter
function updateFilteredGalleryImages() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    
    filteredGalleryImages = galleryImages.filter(item => {
        if (item.style.display === 'none') return false;
        
        const category = item.getAttribute('data-category');
        return activeFilter === 'all' || category === activeFilter;
    });
}

// Open gallery preview
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateFilteredGalleryImages();
        const clickedIndex = filteredGalleryImages.indexOf(item);
        
        if (clickedIndex !== -1) {
            currentGalleryIndex = clickedIndex;
            openGalleryPreview(currentGalleryIndex);
        }
    });
});

function openGalleryPreview(index) {
    const item = filteredGalleryImages[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-item-overlay h3');
    const desc = item.querySelector('.gallery-item-overlay p');
    
    galleryPreviewImg.src = img.src;
    galleryPreviewImg.alt = img.alt;
    galleryPreviewTitle.textContent = title ? title.textContent : 'Untitled';
    galleryPreviewDesc.textContent = desc ? desc.textContent : '';
    
    galleryPreviewModal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Close gallery preview
closeGalleryPreview.addEventListener('click', closeGalleryPreviewModal);

galleryPreviewModal.addEventListener('click', (e) => {
    if (e.target === galleryPreviewModal) {
        closeGalleryPreviewModal();
    }
});

function closeGalleryPreviewModal() {
    galleryPreviewModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Navigation functions
function showPrevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + filteredGalleryImages.length) % filteredGalleryImages.length;
    openGalleryPreview(currentGalleryIndex);
}

function showNextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % filteredGalleryImages.length;
    openGalleryPreview(currentGalleryIndex);
}

galleryPrevBtn.addEventListener('click', showPrevGalleryImage);
galleryNextBtn.addEventListener('click', showNextGalleryImage);

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    if (!galleryPreviewModal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeGalleryPreviewModal();
            break;
        case 'ArrowLeft':
            showPrevGalleryImage();
            break;
        case 'ArrowRight':
            showNextGalleryImage();
            break;
    }
});

// Update filtered images when filter changes
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
            updateFilteredGalleryImages();
            // Reset to first image if current index is out of bounds
            if (currentGalleryIndex >= filteredGalleryImages.length) {
                currentGalleryIndex = 0;
            }
        }, 50);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initGalleryImages();
});