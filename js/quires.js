// document.addEventListener("DOMContentLoaded", function () {

// document.getElementById('submitwtu').addEventListener('click', function() {
//     const queryText = document.getElementById('queryTextarea').value;

//     const requestBody = {
//         query: queryText
//     };

//     fetch('http://localhost:8080/info/wtu', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//     })
//     .then(response => {
//         if (response.ok) {
//             alert('Query submitted successfully!');
//         } else {
//             alert('Failed to submit query.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('An error occurred while submitting the query.');
//     });
// });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const Form = document.getElementById("wtuform");

//     loginForm.addEventListener("submit",  async (event) =>  {
//         event.preventDefault();
//         const wtu = document.getElementById("wtu").value;

        
//             try {
//                 const response = await fetch("http://localhost:8080/info/wtu", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ wtu }),
//                 });
        
//                 if (response.ok) {
//                     alert('Query submitted successfully!');
//                 } else {
//                     alert('Failed to submit query.');
//                 }
//             } catch (error) {
//                 console.error("An error occurred:", error);
//                 alert("An error occurred while logging in.");
//             }
//         });
//     });


    document.addEventListener("DOMContentLoaded", function () {
        const loginForm = document.getElementById("login-form");
    
        loginForm.addEventListener("submit",  async (event) =>  {
            const wtu = document.getElementById("queries").value;
    
            
                try {
                    const response = await fetch("http://localhost:8080/info/wtu", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ wtu }),
                    });
            
                    if (response.ok) {
                    } else {
                        const errorMessage = await response.text();
                        alert(`Submission failed: ${errorMessage}`);
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    alert("An error occurred while submiting.");
                }
            });
        });

