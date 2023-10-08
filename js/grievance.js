        document.addEventListener("DOMContentLoaded", function () {
            const loginForm = document.getElementById("login-form");
        
            loginForm.addEventListener("submit",  async (event) =>  {
                const cmp = document.getElementById("grievance").value;
        
                
                    try {
                        const response = await fetch("http://localhost:8080/comp/grv", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ cmp }),
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