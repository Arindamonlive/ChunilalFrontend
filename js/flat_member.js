document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        // Replace this with your actual authentication logic (e.g., checking username and password)
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;


    //     function verifyUser(username, password) {
    //         const apiUrl = 'https://chunilalapartment.com/fmlogin';
    //         const data = {
    //           username: username,
    //           password: password
    //         };
    //         return fetch(apiUrl, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify(data)
    //         })
    //         .then(response => {
    //           if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //           }
    //           return response.json();
    //         })
    //         .then(result => {
    //           if (result.success) {
    //             return true;
    //           } else {
    //             return false;
    //           }
    //         })
    //         .catch(error => {
    //           console.error('Error:', error);
    //           return false;
    //         });
    //       }
          

    //       const username = document.getElementById("username").value;
    //       const password = document.getElementById("password").value;

    //       verifyUser(username, password)
    //         .then(isAuthenticated => {
    //           if (isAuthenticated) {
    //             window.location.href = "payment.html";
    //           } else {
    //             console.log('Authentication failed');
    //           }
    //         });




        if (username === "fmtest" && password === "password") {
            // Redirect to a new page upon successful login
            window.location.href = "flat_member_landingPage.html"; // Change "newpage.html" to the URL of your new page
        } else {
            alert("Login failed. Please check your username and password.");
        }
    });
});

