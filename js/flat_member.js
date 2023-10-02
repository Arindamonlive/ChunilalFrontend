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
//                     window.location.href = "flat_member_landingPage.html";
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
        event.preventDefault(); // Prevent the form from submitting by default

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
                window.location.href = "flat_member_landingPage.html";
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
























































/*Default login setting*/

//         if (username === "fmtest" && password === "password") {
//             // Redirect to a new page upon successful login
//             window.location.href = "flat_member_landingPage.html"; // Change "newpage.html" to the URL of your new page
//         } else {
//             alert("Login failed. Please check your username and password.");
//         }
//     });
// 





/*Legacy code**/

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

