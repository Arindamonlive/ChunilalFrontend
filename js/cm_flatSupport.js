document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");

    loginForm.addEventListener("submit",  async (event) =>  {
        const flatMemberName = document.getElementById("flatMemberName").value;
        const flatNumber = document.getElementById("flatNumber").value;
        const blockNumber = document.getElementById("blockNumber").value;


        
            try {
                const response = await fetch("http://localhost:8080/flat/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 
                        "flatMemberName":flatMemberName, "flatNumber":flatNumber, "blockNumber":blockNumber }),
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