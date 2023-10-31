document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");

    loginForm.addEventListener("submit",  async (event) =>  {
        const flatDetails = document.getElementById("flatDetails").value;
        const amount = document.getElementById("amount").value;
        // const blockNumber = document.getElementById("blockNumber").value;
        const dueAmount = 0;


        
            try {
                const response = await fetch("http://localhost:8080/flat-details/addAmount", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        "flatDetails":flatDetails, "amount":amount, "dueAmount":dueAmount }),
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