
const announcementsData = [
    { title: "Important Update", content: "Write the important and upcoming updates" },
    { title: "Maintenance Notice", content: "Maintainance related notice" }
];

const meetingsData = [
    { date: "2023-08-30", time: "10:00 AM", location: "Community Center" },
];

const grievanceData = [
    {gmessage: "The grivenaces are below"}
]

const queriesData =[
    {qmessage: "The queries are below"}
]

function displayAnnouncements() {
    const announcementList = document.getElementById("announcement-list");
    announcementList.innerHTML = '';

    announcementsData.forEach(announcement => {
        const announcementItem = document.createElement("div");
        announcementItem.classList.add("announcement-item");
        announcementItem.innerHTML = `
            <h3>${announcement.title}</h3>
            <p>${announcement.content}</p>
        `;
        announcementList.appendChild(announcementItem);
    });
}
function displayMeetings() {
    const meetingList = document.getElementById("meeting-list");
    meetingList.innerHTML = '';

    meetingsData.forEach(meeting => {
        const meetingItem = document.createElement("div");
        meetingItem.classList.add("meeting-item");
        meetingItem.innerHTML = `
            <p>Date: ${meeting.date}</p>
            <p>Time: ${meeting.time}</p>
            <p>Location: ${meeting.location}</p>
        `;
        meetingList.appendChild(meetingItem);
    });
}

function displayGrievances() {
    const grievanceList = document.getElementById("grievance-list");
    grievanceList.innerHTML = '';

    grievanceData.forEach(grievance => {
        const grievanceItem = document.createElement("div");
        grievanceItem.classList.add("grievance-list");
        grievanceItem.innerHTML = `
            <p>${grievance.gmessage}</p>
        `;
        grievanceList.appendChild(grievanceItem);
    });
}

function displayQueries() {
    const queriesList = document.getElementById("queries-list");
    queriesList.innerHTML = '';

    queriesData.forEach(queries => {
        const queriesItem = document.createElement("div");
        queriesItem.classList.add("queries-list");
        queriesItem.innerHTML = `
            <p>${queries.qmessage}</p>
        `;
        queriesList.appendChild(queriesItem);
    });
}

displayAnnouncements();
displayMeetings();
displayGrievances();
displayQueries();

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


