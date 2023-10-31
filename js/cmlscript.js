
// const meetingsData = [
//     { date: "2023-08-30", time: "10:00 AM", location: "Community Center" },
// ];

const announcementsData = [ { title: ""}];



const grievanceData = [
    {gmessage: ""}
]

const queriesData =[
    {qmessage: ""}
]

async function announcement() {
    try {
        const response = await fetch("http://localhost:8080/ann/getann");
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);

            // Clear existing data
            announcementsData.length = 0;

            // Push announcements from the API into the announcementsData array
            data.forEach(item => {
                announcementsData.push({
                    title: item.announce
                });
            });
        } else {
            console.error("Error fetching.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function populateAnnouncementsData() {
    const announcementList = document.getElementById("announcement-list");
    announcementList.innerHTML = '';

 
    const mostRecentAnnouncement = announcementsData[announcementsData.length - 1];

    if (mostRecentAnnouncement) {
        const announcementItem = document.createElement("div");
        announcementItem.classList.add("announcement-item");

        announcementItem.innerHTML = `
            <p>${mostRecentAnnouncement.title}</p>
        `;
        announcementList.appendChild(announcementItem);
    }
}

(async () => {
    await announcement(); 
    populateAnnouncementsData();
})();


async function grievance() {
    try {
        const response = await fetch("http://localhost:8080/comp/getcmp");
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);

            grievanceData.length = 0;

            data.forEach(item => {
                const timestamp = new Date(item.createdAt);
                const date = timestamp.toLocaleDateString();
                grievanceData.push({
                    gmessage: date + ">>>>>" +item.cmp
                });
            });
        } else {
            console.error("Error fetching.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function populateGrievanceData() {
    const grievanceList = document.getElementById("grievance-list");
    grievanceList.innerHTML = '';

    // Get the 5 most recent grievances
    const latestGrievances = grievanceData.slice(-5);

    latestGrievances.forEach(grievance => {
        const grievanceItem = document.createElement("div");
        grievanceItem.classList.add("grievance-list");

        grievanceItem.innerHTML = `
            <p>${grievance.gmessage}</p>
        `;
        grievanceList.appendChild(grievanceItem);
    });
}

(async () => {
    await grievance(); 
    populateGrievanceData();
})();






async function queries() {
    try {
        const response = await fetch("http://localhost:8080/info/getwtu");
        if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);

            queriesData.length = 0;

            data.forEach(item => {
                const timestamp = new Date(item.createdAt);
                const date = timestamp.toLocaleDateString();
                queriesData.push({
                    qmessage: date + ">>>>>" +item.wtu
                });
            });
        } else {
            console.error("Error fetching.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function populateQueriesData() {
    const queriesList = document.getElementById("queries-list");
    queriesList.innerHTML = '';

    // Get the 5 most recent grievances
    const latestQueries = queriesData.slice(-4);

    latestQueries.forEach(queries => {
        const queriesItem = document.createElement("div");
        queriesItem.classList.add("queries-list");

        queriesItem.innerHTML = `
            <p>${queries.qmessage}</p>
        `;
        queriesList.appendChild(queriesItem);
    });
}

(async () => {
    await queries(); 
    populateQueriesData();
})();

// function displayGrievances() {
//     const grievanceList = document.getElementById("grievance-list");
//     grievanceList.innerHTML = '';

//     grievanceData.forEach(grievance => {
//         const grievanceItem = document.createElement("div");
//         grievanceItem.classList.add("grievance-list");
//         grievanceItem.innerHTML = `
//             <p>${grievance.gmessage}</p>
//         `;
//         grievanceList.appendChild(grievanceItem);
//     });
// }

// function displayQueries() {
//     const queriesList = document.getElementById("queries-list");
//     queriesList.innerHTML = '';

//     queriesData.forEach(queries => {
//         const queriesItem = document.createElement("div");
//         queriesItem.classList.add("queries-list");
//         queriesItem.innerHTML = `
//             <p>${queries.qmessage}</p>
//         `;
//         queriesList.appendChild(queriesItem);
//     });
// }

// displayAnnouncements();
// displayMeetings();
// displayGrievances();
// displayQueries();

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

document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll("menu li a");
    const contentDiv = document.getElementById("content");

    menuItems.forEach(item => {
        item.addEventListener("click", function(event) {
            event.preventDefault(); 
            const targetSectionID = event.target.getAttribute("href").substring(1);
            
            loadContent(targetSectionID);
        });
    });
    function loadContent(sectionID) {
        const sectionContent = document.getElementById(sectionID + "-content").innerHTML;
        contentDiv.innerHTML = sectionContent;
    }
});


