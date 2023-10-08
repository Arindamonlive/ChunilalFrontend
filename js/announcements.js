document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("announcements");

    loginForm.addEventListener("submit",  async (event) =>  {
        const announce = document.getElementById("announcementstext").value;

        
            try {
                const response = await fetch("http://localhost:8080/ann/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ announce }),
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