document.addEventListener("DOMContentLoaded", async function () {
    const sessionTimeout = 600000;
    // Retrieve the username from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");




const paymentHistory = [];
// const paymentAmount=[];

checkSessionTimeout(sessionTimeout);
setInterval(() => checkSessionTimeout(sessionTimeout), 1000);



const userData = {
    ownerName: "", // Initialize ownerName as empty
    flatNumber: "",
    blockNumber: "",
    contactDetails: username, // Set contactDetails from the URL parameter
};


const paymentAmount = {
    udues: "", 
    pdues: "",
};

// Function to check and log out if the session has expired
function checkSessionTimeout() {
    const sessionStartTime = sessionStorage.getItem("sessionStartTime");
    if (sessionStartTime) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(sessionStartTime, 10) > sessionTimeout) {
            // Session has expired, clear session data
            sessionStorage.clear();
            window.location.href = "index.html"; // Redirect to the login page
        }
    }
}




// Function to make the GET request and update ownerName
async function fetchOwnerName() {
    try {
        const response = await fetch(`http://localhost:8080/users/getOneUserByPhone/${userData.contactDetails}`);
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);
            userData.ownerName = data.name; // Update ownerName from the "name" field in the response
            populateUserData(); // Populate user data with updated ownerName
        } else {
            console.error("Error fetching ownerName.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function fetchflatandBlockNumber() {
    try {
        const response = await fetch(`http://localhost:8080/flat/getMemberByName/${userData.ownerName}`);
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);
            userData.flatNumber = data.flatNumber;
            userData.blockNumber=data.blockNumber; // Update ownerName from the "name" field in the response
            populateUserData(); // Populate user data with updated ownerName
        } else {
            console.error("Error fetching ownerName.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

function populateUserData() {
    document.getElementById("ownerName").textContent = userData.ownerName;
    document.getElementById("flatNumber").textContent = userData.flatNumber;
    document.getElementById("blockNumber").textContent = userData.blockNumber;
    document.getElementById("contactDetails").textContent = userData.contactDetails;
}

// Call the fetchOwnerName function to get and populate ownerName
await fetchOwnerName();
await fetchflatandBlockNumber();



async function fetchPaymentTable() {
    try {
        const response = await fetch(`http://localhost:8080/payment/userPaymentList/${userData.contactDetails}`);
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);

            const paymentTable = document.getElementById("paymentTable");
            const tbody = paymentTable.querySelector("tbody");

            data.forEach((paymentData) => {
                // Create a new payment object and push it to the paymentHistory array
                const payment = {
                    id: paymentData.id,
                    date: paymentData.createdAt,
                    updues: paymentData.paymentAmount,
                    penddues: paymentData.dues,
                    receipt: paymentData.receipt
                };
                paymentHistory.push(payment);

                // Create a "View Receipt" link
                const viewReceiptLink = document.createElement("a");
                viewReceiptLink.href = payment.receipt;
                viewReceiptLink.textContent = "View Receipt";
                viewReceiptLink.target = "_blank";
                viewReceiptLink.classList.add("view-receipt");
                viewReceiptLink.setAttribute("data-payment-id", paymentData.id);

                // Create a row and cells
                const row = document.createElement("tr");
                const idCell = document.createElement("td");
                idCell.textContent = payment.id;
                const dateCell = document.createElement("td");
                dateCell.textContent = payment.date;
                const upduesCell = document.createElement("td");
                upduesCell.textContent = payment.updues;
                const pendduesCell = document.createElement("td");
                pendduesCell.textContent = payment.penddues;
                const receiptCell = document.createElement("td");
                receiptCell.appendChild(viewReceiptLink);

                // Append cells to the row
                row.appendChild(idCell);
                row.appendChild(dateCell);
                row.appendChild(upduesCell);
                row.appendChild(pendduesCell);
                row.appendChild(receiptCell);

                // Append the row to the table
                tbody.appendChild(row);
            });

            // Now that paymentHistory is populated, you can call populatePaymentHistory
            populatePaymentHistory();
        } else {
            console.error("Error fetching data.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

await fetchPaymentTable();

const viewReceiptLinks = document.querySelectorAll(".view-receipt");
viewReceiptLinks.forEach(link => {
    link.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent the default link behavior

        const paymentId = link.getAttribute("data-payment-id");
        if (paymentId) {
            // Modify the URL to include the paymentId as a path variable
            const url = `http://localhost:8080/invoice/download/${paymentId}`;

            // Make a POST API request to generate the PDF
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: paymentId }),
                });

                if (response.ok) {
                    // Successfully generated the PDF, you can trigger the download
                    const pdfData = await response.blob();
                    const pdfUrl = window.URL.createObjectURL(pdfData);

                    // Create an invisible link element to trigger the download
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = pdfUrl;
                    a.download = "receipt.pdf"; // You can specify the filename here

                    // Add the link to the document and trigger the click event
                    document.body.appendChild(a);
                    a.click();

                    // Clean up by removing the link element
                    document.body.removeChild(a);
                } else {
                    console.error("Error generating PDF receipt.");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    });
});




async function fetchamountanddues() {
    try {
        const response = await fetch(`http://localhost:8080/flat-details/${userData.contactDetails}`);
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);
            paymentAmount.udues = data.amount;
            paymentAmount.pdues = data.dueAmount;
            console.log("paymentAmount.udues:", paymentAmount.udues);
            console.log("paymentAmount.pdues:", paymentAmount.pdues);
            populatePaymentAmount();
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function populatePaymentAmount() {
    document.getElementById("uDues").textContent = paymentAmount.udues;
    document.getElementById("pDues").textContent = paymentAmount.pdues;
}
await fetchamountanddues();




document.getElementById("generateReceiptBtn").addEventListener("click", () => {
    alert("PDF generation functionality will be added here.");
});

async function makeUPayment() {
    // You can perform the payment process here
    const amountToPay = paymentAmount.udues;

    // Assuming you have a payment gateway or some API to process the payment
    // You can make an API request to initiate the payment process
    try {
        const response = await fetch(`http://localhost:8080/flat-details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amountToPay }),
        });

        if (response.ok) {
            // Payment was successful, you can handle the success scenario
            alert(`Payment of $${amountToPay} was successful.`);
        } else {
            // Handle payment failure
            alert("Payment failed. Please try again later.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        // Handle payment error
        alert("An error occurred during the payment process.");
    }
}

document.getElementById("makeUPayment").addEventListener("click", makeUPayment);
// document.getElementById("makeUPayment").addEventListener("click", () => {
//     alert("You will be redirected to the payment page");
// });
async function makePPayment() {
    // You can perform the payment process here
    const amountToPay = paymentAmount.pdues;

    // Assuming you have a payment gateway or some API to process the payment
    // You can make an API request to initiate the payment process
    try {
        const response = await fetch(`http://localhost:8080/flat-details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amountToPay }),
        });

        if (response.ok) {
            // Payment was successful, you can handle the success scenario
            alert(`Payment of $${amountToPay} was successful.`);
        } else {
            // Handle payment failure
            alert("Payment failed. Please try again later.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        // Handle payment error
        alert("An error occurred during the payment process.");
    }
}

document.getElementById("makePPayment").addEventListener("click", makePPayment);


function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
document.getElementById("logoutButton").addEventListener("click", logout);




});
