document.addEventListener("DOMContentLoaded", function () {

    const paymentHistory = [];
    const userData = {
        ownerName: "",
        flatNumber: "",
        blockNumber: "",
        contactDetails: "",
    };
    const paymentAmount = {
        udues: "",
        pdues: "",
    };

    document.getElementById("search-button").addEventListener("click", async function () {

        const searchInput = document.getElementById("search-box").value;
        userData.contactDetails = searchInput;
    
  
        clearUserData();
    
        
        await fetchOwnerName();
        
        await fetchflatandBlockNumber();
        
        await fetchPaymentTable();
        
        await fetchamountanddues();
    });
    
    
    function clearUserData() {
        userData.ownerName = "";
        userData.flatNumber = "";
        userData.blockNumber = "";
        paymentAmount.udues = "";
        paymentAmount.pdues = "";
    
        document.getElementById("ownerName").textContent = "";
        document.getElementById("flatNumber").textContent = "";
        document.getElementById("blockNumber").textContent = "";
        document.getElementById("contactDetails").textContent = "";
        document.getElementById("uDues").textContent = "";
        document.getElementById("pDues").textContent = "";
    
        
        const paymentTable = document.getElementById("paymentTable");
        const tbody = paymentTable.querySelector("tbody");
        tbody.innerHTML = '';
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
                userData.blockNumber = data.blockNumber;
                populateUserData(); 
            } else {
                console.error("Error fetching flat and block numbers.");
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
                    // row.appendChild(receiptCell);
    
                    
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
            } else {
                console.error("Error fetching payment amounts and dues.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    function populatePaymentAmount() {
        document.getElementById("uDues").textContent = paymentAmount.udues;
        document.getElementById("pDues").textContent = paymentAmount.pdues;
    }


    document.getElementById("makeUPayment").addEventListener("click", makeUPayment);


    async function makeUPayment() {
        const amountToPay = paymentAmount.udues;

        
        try {
            const response = await fetch(`http://localhost:8080/flat-details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amountToPay }),
            });

            if (response.ok) {
                
                alert(`Payment of $${amountToPay} was successful.`);
            } else {
                
                alert("Payment failed. Please try again later.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
           
            alert("An error occurred during the payment process.");
        }
    }

   
    function logout() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }


    // document.getElementById("logoutButton").addEventListener("click", logout);
});
document.getElementById("logoutButton").addEventListener("click", function () {
    window.location.href = "index.html";
});
