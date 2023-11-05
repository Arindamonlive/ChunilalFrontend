document.addEventListener("DOMContentLoaded", function () {


    const form = document.getElementById("form");

    form.querySelector(".submit_amount").addEventListener("click", async (event) => {
        event.preventDefault();

        const flatDetails = document.getElementById("flatDetails").value;
        const amount = document.getElementById("amount").value;
        const method = "Offline";

        try {
            const response = await fetch("http://localhost:8080/payment/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "flatDetails": flatDetails, "paymentAmount": amount, "method": method }),
            });

            if (response.ok) {
                alert(`Payment of Rs.${amount} was successful.`);
            } else {
                alert("Payment failed. Please try again later.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred during the payment process.");
        }
    });

    form.querySelector(".submit_due").addEventListener("click", async (event) => {
        event.preventDefault();

        const flatDetails = document.getElementById("flatDetails").value;
        const dueAmount = document.getElementById("dueAmount").value;
        const method = "Offline";

        try {
            const response = await fetch("http://localhost:8080/payment/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "flatDetails": flatDetails, "dues": dueAmount, "method": method }),
            });

            if (response.ok) {
                alert(`Payment of Rs.${dueAmount} was successful.`);
            } else {
                alert("Payment failed. Please try again later.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred during the payment process.");
        }
    });

});


