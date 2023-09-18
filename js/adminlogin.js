document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 


        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admintest" && password === "password") {
            window.location.href = "payment.html"; 
        } else {
            alert("Login failed. Please check your username and password.");
        }
    });
});
