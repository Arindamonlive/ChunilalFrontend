document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");

    loginForm.addEventListener("submit",  async (event) =>  {
        const name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const minPasswordLength = 6; 
        const maxPasswordLength = 20; 

        if (password.length < minPasswordLength || password.length > maxPasswordLength) {
            alert(`Password must be between ${minPasswordLength} and ${maxPasswordLength} characters.`);
            return;
        }

        const lengthPhoneNumber=10;

        if (phoneNumber.length !== lengthPhoneNumber || !/^\d+$/.test(phoneNumber)) {
            alert(`Phone number must be 10 characters and should be numeric.`);
            return;
        }

        if (!email) {
            email = "NA";
        }



            try {
                const response = await fetch("http://localhost:8080/users/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "name":name, "email":email, "phoneNumber":phoneNumber,"password":password }),
                });
        
                if (response.ok) {
                    window.location.href = "committeepage.html";
                } else {
                    const errorMessage = await response.text();
                    alert(`Add failed: ${errorMessage}`);
                }
            } catch (error) {
                console.error("An error occurred:", error);
                alert("An error occurred while adding in.");
            }
        });
    });