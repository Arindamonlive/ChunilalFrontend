
const announcementsData = [
    { title: "Important Update", content: "Write the important and upcoming updates" },
    { title: "Maintenance Notice", content: "Maintainance related notice" }
];

const meetingsData = [
    { date: "2023-08-30", time: "10:00 AM", location: "Community Center" },
    { date: "2023-09-15", time: "2:00 PM", location: "Conference Room" }
];


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

displayAnnouncements();
displayMeetings();
