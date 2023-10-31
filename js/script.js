// const alertData =[
//     {alert1: "Announcement details",alert2:"Meeting details"}
// ]

const announcementsData = [ { title: ""}];

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

    // Get the most recent announcement (highest index)
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

// function populateAlerts1() {
//     const alertList = document.getElementById("announcement-list");
//     alertList.innerHTML = '';

//     alertData.forEach(alert => {
//         const alertItem = document.createElement("div");
//         alertItem.classList.add("announcement-list");
//         alertItem.innerHTML = `
//             <p>${alert.alert1}</p>
//         `;
//         alertList.appendChild(alertItem);
//     });
// }
// function populateAlerts2() {
//     const alertList = document.getElementById("meeting-list");
//     alertList.innerHTML = '';

//     alertData.forEach(alert => {
//         const alertItem = document.createElement("div");
//         alertItem.classList.add("meeting-list");
//         alertItem.innerHTML = `
//             <p>${alert.alert2}</p>
//         `;
//         alertList.appendChild(alertItem);
//     });
// }
// populateAlerts1();
// populateAlerts2();


document.querySelector('.grievance-button').addEventListener('click', function() {
    window.location.href = 'grievance.html';
});
document.querySelector('.writetous').addEventListener('click', function() {
    window.location.href = 'writetous.html';
});
burger=document.querySelector('.burger')
navbar=document.querySelector('.navbar')
navList=document.querySelector('.nav-list')
// rightNav=document.querySelector('.rightNav')

burger.addEventListener('click',()=>{
    // rightNav.classList.toggle('v-class-resp');
    navList.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');
})