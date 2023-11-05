document.addEventListener("DOMContentLoaded", function () {
    // This code will run when the DOM content is fully loaded

    // Define your global variables
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

    // Add an event listener to the "Search" button
    document.getElementById("search-button").addEventListener("click", async function () {
        // This code will execute when the "Search" button is clicked
    
        // Retrieve the search input value from the input box
        const searchInput = document.getElementById("search-box").value;
        userData.contactDetails = searchInput;
    
        // Clear existing data before making new requests
        clearUserData();
    
        // Call the fetchOwnerName function to fetch user data
        await fetchOwnerName();
        // Call the fetchflatandBlockNumber function to fetch flat and block number
        await fetchflatandBlockNumber();
        // Call the fetchPaymentTable function to fetch payment history
        await fetchPaymentTable();
        // Call the fetchamountanddues function to fetch payment amounts and dues
        await fetchamountanddues();
    });
    
    // Function to clear user data on the page
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
    
        // Clear the payment history table
        const paymentTable = document.getElementById("paymentTable");
        const tbody = paymentTable.querySelector("tbody");
        tbody.innerHTML = '';
    }
    
    // Function to make a GET request and update ownerName
    async function fetchOwnerName() {
        try {
            const response = await fetch(`http://localhost:8080/users/getOneUserByPhone/${userData.contactDetails}`);
            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);
                userData.ownerName = data.name; // Update ownerName from the "name" field in the response
                populateUserData(); // Populate user data with the updated ownerName
            } else {
                console.error("Error fetching ownerName.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // Function to fetch flat and block numbers
    async function fetchflatandBlockNumber() {
        try {
            const response = await fetch(`http://localhost:8080/flat/getMemberByName/${userData.ownerName}`);
            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);
                userData.flatNumber = data.flatNumber;
                userData.blockNumber = data.blockNumber;
                populateUserData(); // Populate user data with updated ownerName
            } else {
                console.error("Error fetching flat and block numbers.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    // Function to populate user data on the page
    function populateUserData() {
        document.getElementById("ownerName").textContent = userData.ownerName;
        document.getElementById("flatNumber").textContent = userData.flatNumber;
        document.getElementById("blockNumber").textContent = userData.blockNumber;
        document.getElementById("contactDetails").textContent = userData.contactDetails;
    }

    // Function to fetch and display payment history
    async function fetchPaymentTable() {
        try {
            const response = await fetch(`http://localhost:8080/payment/userPaymentList/${userData.contactDetails}`);
            if (response.ok) {
                const data = await response.json();
                console.log("API Response:", data);
    
                const paymentTable = document.getElementById("paymentTable");
                const tbody = paymentTable.querySelector("tbody");
    
                // Sort the data by payment date in descending order
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
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
                    const timestamp = payment.date; // Assuming payment.date is a timestamp
                    const date = new Date(timestamp);
                    dateCell.textContent = date.toLocaleString();
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
                    // row.appendChild(receiptCell);
    
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
    

    // Other functions go here...

    // Function to fetch payment amounts and dues
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

    // Function to populate payment amounts and dues on the page
    function populatePaymentAmount() {
        document.getElementById("uDues").textContent = paymentAmount.udues;
        document.getElementById("pDues").textContent = paymentAmount.pdues;
    }

    // Add event listener for making a payment
    document.getElementById("makeUPayment").addEventListener("click", makeUPayment);

    // Add event listener for making another type of payment
    // document.getElementById("makePPayment").addEventListener("click", makePPayment);

    // Function to make a payment
    async function makeUPayment() {
        const amountToPay = paymentAmount.udues;

        // Assuming you have a payment gateway or some API to process the payment
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

    // Function for logging out
    function logout() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }

    // Add an event listener for the "Logout" button
    // document.getElementById("logoutButton").addEventListener("click", logout);
});
document.getElementById("logoutButton").addEventListener("click", function () {
    window.location.href = "index.html";
});
