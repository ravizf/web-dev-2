let events = JSON.parse(localStorage.getItem("events")) || [];

const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const eventList = document.getElementById("eventList");

document.getElementById("addBtn").addEventListener("click", addEvent);
document.getElementById("clearBtn").addEventListener("click", clearEvents);
document.getElementById("sampleBtn").addEventListener("click", addSample);

function saveEvents(){
    localStorage.setItem("events", JSON.stringify(events));
}

function renderEvents(){
    eventList.innerHTML = "";

    events.forEach((event,index)=>{
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <div class="delete-btn" onclick="deleteEvent(${index})">X</div>
            <div class="edit-btn" onclick="editEvent(${index})">Edit</div>
            <h3>${event.title}</h3>
            <div class="event-date">📅 ${event.date}</div>
            <div class="badge">${event.category}</div>
            <p>${event.description}</p>
        `;

        eventList.appendChild(card);
    });
}

function addEvent(){
    const title = titleInput.value.trim();
    const date = dateInput.value;
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();

    if(!title || !date || !category){
        alert("Please fill all required fields");
        return;
    }

    events.push({title,date,category,description});
    saveEvents();
    renderEvents();
    clearForm();
}

function deleteEvent(index){
    events.splice(index,1);
    saveEvents();
    renderEvents();
}

function editEvent(index){
    const event = events[index];

    titleInput.value = event.title;
    dateInput.value = event.date;
    categoryInput.value = event.category;
    descriptionInput.value = event.description;

    deleteEvent(index);
}

function clearEvents(){
    events = [];
    saveEvents();
    renderEvents();
}

function addSample(){
    events.push({
        title:"Hack KRMU",
        date:"2026-02-18",
        category:"Miscellaneous",
        description:"Hackathon"
    });
    saveEvents();
    renderEvents();
}

function clearForm(){
    titleInput.value="";
    dateInput.value="";
    categoryInput.value="";
    descriptionInput.value="";
}

renderEvents();
