// navbar.js
export function loadNavbar() {
    $("#navbar-placeholder").load("navbar.html", function() {
        // Get the current path
        var currentPath = window.location.pathname;
        // Get all nav-link elements
        var navLinks = document.querySelectorAll('.nav-item .nav-link');
        // Iterate over each link
        navLinks.forEach(function(link) {
            var linkPath = new URL(link.getAttribute('href'), window.location.href).pathname;
            // Check if the link's path matches the current path
            if (currentPath === linkPath) {
                // Add the 'active' class to the matching link
                link.classList.add('active');
            } else {
                // Remove the 'active' class from other links
                link.classList.remove('active');
            }
        });
    });
}
