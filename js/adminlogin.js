// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("login-form");

//     loginForm.addEventListener("submit", function (e) {
//         e.preventDefault(); 


//         const username = document.getElementById("username").value;
//         const password = document.getElementById("password").value;

//         if (username === "admintest" && password === "password") {
//             window.location.href = "payment.html"; 
//         } else {
//             alert("Login failed. Please check your username and password.");
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("login-form");

//     loginForm.addEventListener("submit",  async () =>  {
//         const username = document.getElementById("username").value;
//         const password = document.getElementById("password").value;

        
//             try {
//                 const response = await fetch("http://localhost:8080/users/login", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ username, password }),
//                 });
        
//                 if (response.ok) {
//                     // Redirect to the landing page upon successful login
//                     window.location.href = "payment.html";
//                 } else {
//                     // Handle login failure
//                     const errorMessage = await response.text();
//                     alert(`Login failed: ${errorMessage}`);
//                 }
//             } catch (error) {
//                 console.error("An error occurred:", error);
//                 alert("An error occurred while logging in.");
//             }
//         });
//     });





document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const url = new URL("http://localhost:8080/users/login");
            url.searchParams.append("username", username);
            url.searchParams.append("password", password);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Redirect to the landing page upon successful login
                window.location.href = "payment.html";
            } else {
                // Handle login failure
                const errorMessage = await response.text();
                alert(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred while logging in.");
        }
    });
});
