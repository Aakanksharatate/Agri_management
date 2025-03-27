// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const slideMenu = document.querySelector(".slide");

    menuToggle.addEventListener("change", function () {
        slideMenu.style.transform = this.checked ? "translateX(0)" : "translateX(-100%)";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!slideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.checked = false;
            slideMenu.style.transform = "translateX(-100%)";
        }
    });
});

// Scrolling News Effect
function startScrolling() {
    const scrollText = document.querySelector(".scroll-text");
    let position = 100;
    function scroll() {
        position -= 1;
        if (position < -scrollText.offsetWidth) {
            position = window.innerWidth;
        }
        scrollText.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(scroll);
    }
    scroll();
}
startScrolling();

// Review Submission Functionality
document.getElementById("reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("reviewer-name").value.trim();
    const reviewText = document.getElementById("review-text").value.trim();

    if (name === "" || reviewText === "") {
        alert("Please fill in both name and review fields.");
        return;
    }

    const reviewList = document.getElementById("reviews-list");
    const newReview = document.createElement("div");
    newReview.classList.add("review");

    newReview.innerHTML = `
        <i class="fas fa-user-circle profile-icon"></i>
        <div class="review-text">
            <p>"${reviewText}"</p>
            <h4>- ${name}</h4>
        </div>
    `;

    reviewList.appendChild(newReview);

    // Clear form fields
    document.getElementById("reviewForm").reset();
});
