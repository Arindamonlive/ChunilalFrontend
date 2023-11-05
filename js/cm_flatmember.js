document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");

    loginForm.addEventListener("submit",  async (event) =>  {
        const flatDetails = document.getElementById("flatDetails").value;
        const amount = document.getElementById("amount").value;
        const dueAmount = document.getElementById("dueAmount").value;
        // const dueAmount = 0;

        if (!dueAmount) {
            dueAmount == 0;
        }

        if (!/^\d+$/.test(amount)) {
            alert(`Amount should be numeric.`);
            return;
        }

        // if (!/^\d+$/.test(dueAmount)) {
        //     alert(`Due Amount should be numeric.`);
        //     return;
        // }

        
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