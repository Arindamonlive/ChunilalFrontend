const alertData =[
    {alert1: "Announcement details",alert2:"Meeting details"}
]
function populateAlerts1() {
    const alertList = document.getElementById("announcement-list");
    alertList.innerHTML = '';

    alertData.forEach(alert => {
        const alertItem = document.createElement("div");
        alertItem.classList.add("announcement-list");
        alertItem.innerHTML = `
            <p>${alert.alert1}</p>
        `;
        alertList.appendChild(alertItem);
    });
}
function populateAlerts2() {
    const alertList = document.getElementById("meeting-list");
    alertList.innerHTML = '';

    alertData.forEach(alert => {
        const alertItem = document.createElement("div");
        alertItem.classList.add("meeting-list");
        alertItem.innerHTML = `
            <p>${alert.alert2}</p>
        `;
        alertList.appendChild(alertItem);
    });
}
populateAlerts1();
populateAlerts2();
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