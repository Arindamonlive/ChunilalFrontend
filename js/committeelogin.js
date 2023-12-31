// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("login-form");

//     loginForm.addEventListener("submit", function (e) {
//         e.preventDefault(); 

//         // Replace this with your actual authentication logic (e.g., checking username and password)
//         const username = document.getElementById("username").value;
//         const password = document.getElementById("password").value;

//         if (username === "cmtest" && password === "password") {
//             // Redirect to a new page upon successful login
//             window.location.href = "committeepage.html"; // Change "newpage.html" to the URL of your new page
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
//                     window.location.href = "committeepage.html";
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
            const url = new URL("http://localhost:8080/committee/login");
            url.searchParams.append("userName", username);
            url.searchParams.append("password", password);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                
                window.location.href = "committeepage.html";
            } else {
                
                const errorMessage = await response.text();
                alert(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred while logging in.");
        }
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("login-form");

//     loginForm.addEventListener("submit",  async (event) =>  {
//         const userName = document.getElementById("userName").value;
//         const password = document.getElementById("password").value;

        
//             try {
//                 const response = await fetch("http://localhost:8080/committee/login", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ username, password }),
//                 });

        
//                 if (response.ok) {
//                     // Redirect to the landing page upon successful login
//                     window.location.href = "committeepage.html";
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


