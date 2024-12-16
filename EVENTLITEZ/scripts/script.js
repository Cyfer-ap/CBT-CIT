// Initialize state variables
let editingEvent = false;
let editingEventIndex = -1;
const eventList = loadEventsFromLocalStorage();  // Load events from local storage

// Function to handle form submission (both adding and editing)
function handleFormSubmit(event) {
    event.preventDefault();

    // Retrieve form values
    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;

    // Check if the form is in edit mode
    if (editingEvent) {
        // Update the event
        eventList[editingEventIndex] = {
            name: name,
            date: date,
            time: time,
            location: location,
        };

        // Reset editing state
        editingEvent = false;
        editingEventIndex = -1;
    } else {
        // Add new event
        eventList.push({
            name: name,
            date: date,
            time: time,
            location: location,
        });
    }

    // Update event list and reset the form
    updateEventList();
    resetForm();
    saveEventsToLocalStorage();  // Save events to local storage
}

// Function to update the event list on the page
function updateEventList() {
    const eventListContainer = document.getElementById('event-list').querySelector('ul');
    eventListContainer.innerHTML = ''; // Clear the existing list

    eventList.forEach((event, index) => {
        const eventItem = document.createElement('li');
        eventItem.classList.add('event-item');

        // Add event details with buttons for editing and deleting
        eventItem.innerHTML = `
            <div class="serial">${index + 1}</div>
            <div class="name">${event.name}</div>
            <div class="date">Date: ${event.date}</div>
            <div class="time">Time: ${event.time}</div>
            <div class="location">Location: ${event.location}</div>
            <button class="edit" onclick="editEvent(${index})">Edit</button>
            <button class="delete" onclick="deleteEvent(${index})">Delete</button>
        `;

        eventListContainer.appendChild(eventItem);
    });
}

// Function to edit an event
function editEvent(index) {
    const event = eventList[index];

    // Populate the form with event data
    document.getElementById('event-name').value = event.name;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-time').value = event.time;
    document.getElementById('event-location').value = event.location;

    // Change form title and button text
    document.querySelector('#create-event h2').textContent = 'Edit Event';
    document.getElementById('submit-button').textContent = 'Update Event';

    // Set editing state
    editingEvent = true;
    editingEventIndex = index;
}

// Function to delete an event
function deleteEvent(index) {
    eventList.splice(index, 1); // Remove the event from the list
    updateEventList(); // Update the displayed event list
    saveEventsToLocalStorage();  // Save updated list to local storage
}

// Function to reset the form when adding a new event
function resetForm() {
    document.getElementById('event-name').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
    document.getElementById('event-location').value = '';

    // Reset form title and button text for adding new event
    document.querySelector('#create-event h2').textContent = 'Add Event';
    document.getElementById('submit-button').textContent = 'Add Event';
}

// Function to load events from local storage
function loadEventsFromLocalStorage() {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];  // Parse JSON or return empty array if not found
}

// Function to save events to local storage
function saveEventsToLocalStorage() {
    localStorage.setItem('events', JSON.stringify(eventList));  // Store events in JSON format
}

// Attach form submit handler
document.getElementById('event-form').addEventListener('submit', handleFormSubmit);

// Initially load the event list (if any)
updateEventList();
