// Descriptions for carousel images
const imageDescriptions = [
    "Pasta from Mysk - arguably the best pasta on campus",
    "Mongolian Grill bowl from D1",
    "Paneer and rice from Indian by Nature in Marketplace",
    "Pizza from EFNY in Marketplace",
    "Cookie pie with ice cream from EFNY in Marketplace - our favorite dessert",
    "Pasta and salad from D2",
    "Hummus, salad, and bread from D2",
    "Salad bowl from D1"
];

// Initialize when document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    updateDescription(0); // Set initial description for the first image

    // Manage active state for navigation based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar a");

    function changeLinkState() {
        let navIndex = sections.length;
        while(--navIndex && window.scrollY + 50 < sections[navIndex].offsetTop) {}
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[navIndex].classList.add('active');
    }

    changeLinkState();
    window.addEventListener('scroll', changeLinkState);

    // Setup carousel functionality
    const carouselImages = document.querySelector('.carousel-images');
    let carouselIndex = 0;
    const numberOfImages = document.querySelectorAll('.carousel-images img').length;

    document.querySelector('.next-btn').addEventListener('click', function() {
        nextImage();
    });

    document.querySelector('.prev-btn').addEventListener('click', function() {
        previousImage();
    });

    // Update the description based on the current image index
    function updateDescription(index) {
        const descriptionElement = document.getElementById('imageDescription');
        descriptionElement.textContent = imageDescriptions[index];
    }
    
    // Show next image in the carousel
    function nextImage() {
        carouselIndex = (carouselIndex + 1) % numberOfImages;
        carouselImages.style.transform = `translateX(-${carouselIndex * 100}%)`;
        updateDescription(carouselIndex);
    }

    // Show previous image in the carousel
    function previousImage() {
        carouselIndex = carouselIndex - 1 < 0 ? numberOfImages - 1 : carouselIndex - 1;
        carouselImages.style.transform = `translateX(-${carouselIndex * 100}%)`;
        updateDescription(carouselIndex);
    }

    // Handle form submission for uploading photos
    const form = document.getElementById('photoForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        console.log('Form submitted'); // Debug output
        fetch('your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => alert('Email sent successfully!'))
        .catch(error => console.error('Error:', error));
    });
});
