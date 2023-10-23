document.addEventListener("DOMContentLoaded", async function () {
    // Retrieve the username from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");


// const userData = {
//     ownerName: "",
//     flatNumber: "D5",
//     blockNumber: "1",
//     contactDetails:username,
// };
// userData.contactDetails = username;

// const paymentHistory = [
//     { date: "", id:"",updues: "",penddues:"", receipt: "" },
//     ,
// ];

const paymentHistory = [];

const paymentAmount = {
    udues: "Rs.100.00", 
    pdues: "Rs.200.00",
};



const userData = {
    ownerName: "", // Initialize ownerName as empty
    flatNumber: "",
    blockNumber: "",
    contactDetails: username, // Set contactDetails from the URL parameter
};

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





// async function fetchPaymentTable() {
//     try {
//         const response = await fetch(`http://localhost:8080/payment/userPaymentList/${userData.contactDetails}`);
//         if (response.ok) {
//             const data = await response.json();
//             console.log("API Response:", data);
//             // Assuming `data` is an array, you can push it into the paymentHistory array
//             // paymentHistory.date=data.createdAt
//             // paymentHistory.id=data.id
//             // paymentHistory.penddues=data.dues
//             // paymentHistory.udues=data.paymentAmount
//             // paymentHistory.receipt=data.receipt
//             // paymentHistory.push({
//             //     id: data.id,
//             //     date: data.createdAt,
//             //     updues: data.paymentAmount,
//             //     penddues: data.dues,
//             //     receipt: data.receipt
//             // });
//             // populatePaymentHistory();
//             // const paymentTable = document.getElementById("paymentTable");
//             //     const tbody = paymentTable.querySelector("tbody");

//             //     tbody.innerHTML = ''; // Clear the existing table rows
//             //     paymentHistory.forEach((payment) => {
//             //         const row = document.createElement("tr");
//             //         row.innerHTML = `
//             //             <td>${payment.id}</td>
//             //             <td>${payment.date}</td>
//             //             <td>${payment.updues}</td>
//             //             <td>${payment.penddues}</td>
//             //             <td><a href="${payment.receipt}" target="_blank">View Receipt</a></td>
//             //         `;
//             //         tbody.appendChild(row);
//             //     });
//             data.forEach((paymentData) => {
//                 // Create a new payment object and push it to the paymentHistory array
//                 const payment = {
//                     id: paymentData.id,
//                     date: paymentData.createdAt,
//                     updues: paymentData.paymentAmount,
//                     penddues: paymentData.dues,
//                     receipt: paymentData.receipt
//                 };
//                 paymentHistory.push(payment);
//                 const viewReceiptLink = document.createElement("a");
//                 viewReceiptLink.href = payment.receipt;
//                 viewReceiptLink.textContent = "View Receipt";
//                 viewReceiptLink.target = "_blank";
//                 viewReceiptLink.classList.add("view-receipt");
//                 viewReceiptLink.setAttribute("data-payment-id", paymentData.id);

//                 // Now, you can handle the click event for the "View Receipt" link
//                 viewReceiptLink.addEventListener("click", async (event) => {
//                     event.preventDefault(); // Prevent the default link behavior

//                     const paymentId = viewReceiptLink.getAttribute("data-payment-id");
//                     if (paymentId) {
//                         // Make an API request to generate the PDF
//                         try {
//                             const response = await fetch(`http://localhost:8080/invoice/generate/${paymentId}`);
//                             if (response.ok) {
//                                 // Successfully generated the PDF, you can do something with it
//                                 const pdfData = await response.blob();
//                                 const pdfUrl = window.URL.createObjectURL(pdfData);
//                                 // For example, open the PDF in a new tab
//                                 window.open(pdfUrl);
//                             } else {
//                                 console.error("Error generating PDF receipt.");
//                             }
//                         } catch (error) {
//                             console.error("An error occurred:", error);
//                         }
//                     }
//                 });
//             });

//             // Now that paymentHistory is populated, you can call populatePaymentHistory
//             populatePaymentHistory();
//         } else {
//             console.error("Error fetching data.");
//         }
//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// }

// function populatePaymentHistory() {
//     const paymentTable = document.getElementById("paymentTable");
//     const tbody = paymentTable.querySelector("tbody");

//     paymentHistory.forEach((payment) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${payment.id}</td>
//             <td>${payment.date}</td>
//             <td>${payment.updues}</td>
//             <td>${payment.penddues}</td>
//             <td></td>
//         `;
//                     const lastCell = row.querySelector("td:last-child");
//                     // lastCell.appendChild(viewReceiptLink);
//         tbody.appendChild(row);
//     });
// }
// populatePaymentHistory();
await fetchPaymentTable();


// const viewReceiptLinks = document.querySelectorAll(".view-receipt");
// viewReceiptLinks.forEach(link => {
//     link.addEventListener("click", async (event) => {
//         event.preventDefault(); // Prevent the default link behavior

//         const paymentId = link.getAttribute("data-payment-id");
//         if (paymentId) {
//             // Make a POST API request to generate the PDF
//             try {
//                 const response = await fetch(`http://localhost:8080/invoice/generate/${paymentId}`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ paymentId: paymentId }),
//                 });

//                 if (response.ok) {
//                     // Successfully generated the PDF, you can do something with it
//                     const pdfData = await response.blob();
//                     const pdfUrl = window.URL.createObjectURL(pdfData);
//                     // For example, open the PDF in a new tab
//                     window.open(pdfUrl);
//                 } else {
//                     console.error("Error generating PDF receipt.");
//                 }
//             } catch (error) {
//                 console.error("An error occurred:", error);
//             }
//         }
//     });
// });

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





function populatePaymentAmount() {
    document.getElementById("uDues").textContent = paymentAmount.udues;
    document.getElementById("pDues").textContent = paymentAmount.pdues;
}


document.getElementById("generateReceiptBtn").addEventListener("click", () => {
    alert("PDF generation functionality will be added here.");
});
document.getElementById("makeUPayment").addEventListener("click", () => {
    alert("You will be redirected to the payment page");
});
document.getElementById("makePPayment").addEventListener("click", () => {
    alert("You will be redirected to the payment page");
});

populateUserData();
// populatePaymentHistory();
populatePaymentAmount();


function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
}
// function clearSession() {
//     sessionStorage.clear(); 
// }
window.onpopstate = function(event) {
    if (event.state && event.state.clearSession) {
        clearSession();
    }
};
function clearSessionOnBackOrForward() {
    history.pushState({ clearSession: true }, null, null);
}
sessionStorage.setItem('key', 'value');
document.getElementById("logoutButton").addEventListener("click", logout);

});
