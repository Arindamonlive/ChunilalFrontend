document.addEventListener("DOMContentLoaded", async function () {
    const sessionTimeout = 600000;
    
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");




const paymentHistory = [];
// const paymentAmount=[];

checkSessionTimeout(sessionTimeout);
setInterval(() => checkSessionTimeout(sessionTimeout), 1000);



const userData = {
    ownerName: "", 
    flatNumber: "",
    blockNumber: "",
    contactDetails: username, 
};


const paymentAmount = {
    udues: "", 
    pdues: "",
};


function checkSessionTimeout() {
    const sessionStartTime = sessionStorage.getItem("sessionStartTime");
    if (sessionStartTime) {
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(sessionStartTime, 10) > sessionTimeout) {
            
            sessionStorage.clear();
            window.location.href = "index.html"; 
        }
    }
}





async function fetchOwnerName() {
    try {
        const response = await fetch(`http://localhost:8080/users/getOneUserByPhone/${userData.contactDetails}`);
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);
            userData.ownerName = data.name; 
            populateUserData();
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
            userData.blockNumber=data.blockNumber; 
            populateUserData(); 
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

            
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            data.forEach((paymentData) => {
                
                const payment = {
                    id: paymentData.id,
                    date: paymentData.createdAt,
                    updues: paymentData.paymentAmount,
                    penddues: paymentData.dues,
                    receipt: paymentData.receipt
                };
                paymentHistory.push(payment);

                
                const viewReceiptLink = document.createElement("a");
                viewReceiptLink.href = payment.receipt;
                viewReceiptLink.textContent = "View Receipt";
                viewReceiptLink.target = "_blank";
                viewReceiptLink.classList.add("view-receipt");
                viewReceiptLink.setAttribute("data-payment-id", paymentData.id);

                
                const row = document.createElement("tr");
                const idCell = document.createElement("td");
                idCell.textContent = payment.id;
                const dateCell = document.createElement("td");
                const timestamp = payment.date; 
                const date = new Date(timestamp);
                dateCell.textContent = date.toLocaleString();
                const upduesCell = document.createElement("td");
                upduesCell.textContent = payment.updues;
                const pendduesCell = document.createElement("td");
                pendduesCell.textContent = payment.penddues;
                const receiptCell = document.createElement("td");
                receiptCell.appendChild(viewReceiptLink);

                
                row.appendChild(idCell);
                row.appendChild(dateCell);
                row.appendChild(upduesCell);
                row.appendChild(pendduesCell);
                row.appendChild(receiptCell);

                
                tbody.appendChild(row);
            });

            
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
        event.preventDefault();

        const paymentId = link.getAttribute("data-payment-id");
        if (paymentId) {
            
            const url = `http://localhost:8080/invoice/download/${paymentId}`;

           
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: paymentId }),
                });

                if (response.ok) {
                    
                    const pdfData = await response.blob();
                    const pdfUrl = window.URL.createObjectURL(pdfData);

                    
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = pdfUrl;
                    a.download = "receipt.pdf"; 

                    
                    document.body.appendChild(a);
                    a.click();

                    
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




document.getElementById("support").addEventListener("click", () => {
    window.location.href = 'grievance.html';
});

const method="Online";
async function makeUPayment() {
    
    const amountToPay = paymentAmount.udues;
    


    try {
        const response = await fetch(`http://localhost:8080/payment/test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "flatDetails": userData.contactDetails,"paymentAmount": amountToPay,"method":method }),
        });

        if (response.ok) {
            
            alert(`Payment of Rs.${amountToPay} was successful.`);
        } else {
            
            alert("Payment failed. Please try again later.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        
        alert("An error occurred during the payment process.");
    }
}

document.getElementById("makeUPayment").addEventListener("click", makeUPayment);
// document.getElementById("makeUPayment").addEventListener("click", () => {
//     alert("You will be redirected to the payment page");
// });
async function makePPayment() {
    
    const amountToPay = paymentAmount.pdues;


    try {
        const response = await fetch(`http://localhost:8080/payment/test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "flatDetails": userData.contactDetails,"dues": amountToPay,"method":method}),
        });

        if (response.ok) {
            
            alert(`Payment of Rs.${amountToPay} was successful.`);
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
