document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const flatNumber = document.getElementById("flatNumber").value;
        const blockNumber = document.getElementById("blockNumber").value;
        const amount = document.getElementById("amount").value;
        const dueAmount = document.getElementById("dueAmount").value;

        const minPasswordLength = 6;
        const maxPasswordLength = 20;
        const lengthBN = 1;
        const lengthPhoneNumber = 10;

        if (password.length < minPasswordLength || password.length > maxPasswordLength) {
            alert(`Password must be between ${minPasswordLength} and ${maxPasswordLength} characters.`);
            return;
        }

        if (phoneNumber.length !== lengthPhoneNumber || !/^\d+$/.test(phoneNumber)) {
            alert(`Phone number must be 10 characters and should be numeric.`);
            return;
        }

        if (!email) {
            email = "NA";
        }

        if (blockNumber.length != lengthBN || !/^\d+$/.test(blockNumber)) {
            alert('Block number: Max character allowed 1, no spaces and symbols are allowed');
            return;
        }

        if (!dueAmount) {
            dueAmount = 0;
        }

        if (!/^\d+$/.test(amount)) {
            alert(`Amount should be numeric.`);
            return;
        }

        if (!/^\d+$/.test(dueAmount)) {
            alert(`Due Amount should be numeric.`);
            return;
        }

        // Make the API call to add user data
        try {
            const userResponse = await fetch("http://localhost:8080/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "name": name, "email": email, "phoneNumber": phoneNumber, "password": password }),
            });

            if (!userResponse.ok) {
                const userErrorMessage = await userResponse.text();
                alert(`User Add failed: ${userErrorMessage}`);
                return;
            }
        } catch (error) {
            console.error("An error occurred while adding user:", error);
            alert("An error occurred while adding user.");
            return;
        }

        // Make the API call to add flat data
        try {
            const flatResponse = await fetch("http://localhost:8080/flat/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "flatMemberName": name, "flatNumber": flatNumber, "blockNumber": blockNumber }),
            });

            if (!flatResponse.ok) {
                const flatErrorMessage = await flatResponse.text();
                alert(`Flat Add failed: ${flatErrorMessage}`);
                return;
            }
        } catch (error) {
            console.error("An error occurred while adding flat:", error);
            alert("An error occurred while adding flat.");
            return;
        }

        // Make the API call to add flat details
        try {
            const detailsResponse = await fetch("http://localhost:8080/flat-details/addAmount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "flatDetails": phoneNumber, "amount": amount, "dueAmount": dueAmount }),
            });

            if (!detailsResponse.ok) {
                const detailsErrorMessage = await detailsResponse.text();
                alert(`Details Add failed: ${detailsErrorMessage}`);
                return;
            }
        } catch (error) {
            console.error("An error occurred while adding details:", error);
            alert("An error occurred while adding details.");
            return;
        }

        // If all API calls were successful, redirect to "committeepage.html"
        window.location.href = "committeepage.html";
    });
});
