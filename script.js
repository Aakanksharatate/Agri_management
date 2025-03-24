document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".menu-toggle").addEventListener("click", function () {
        alert("Menu button clicked!");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("viewDetailsBtn").addEventListener("click", function() {
        var detailsSection = document.getElementById("detailsSection");
        
        // Toggle visibility of details section
        if (detailsSection.style.display === "none" || detailsSection.style.display === "") {
            detailsSection.style.display = "block";
        } else {
            detailsSection.style.display = "none";
        }
    });
});
