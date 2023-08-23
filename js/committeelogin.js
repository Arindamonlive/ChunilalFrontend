document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        // Replace this with your actual authentication logic (e.g., checking username and password)
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "cmtest" && password === "password") {
            // Redirect to a new page upon successful login
            window.location.href = "committeepage.html"; // Change "newpage.html" to the URL of your new page
        } else {
            alert("Login failed. Please check your username and password.");
        }
    });
});
