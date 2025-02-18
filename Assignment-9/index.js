document.addEventListener("DOMContentLoaded", function () {
    loadAppointments();
});

function openForm(service) {
    document.getElementById("appointmentForm").style.display = "block";
    document.getElementById("service").value = service;
}

function closeForm() {
    document.getElementById("appointmentForm").style.display = "none";
}

function validateForm() {
    let valid = true;

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let dateTime = document.getElementById("dateTime").value;
    let terms = document.getElementById("terms").checked;

    document.getElementById("nameError").innerText = name ? "" : "Name is required";
    document.getElementById("emailError").innerText = /\S+@\S+\.\S+/.test(email) ? "" : "Invalid email";
    document.getElementById("phoneError").innerText = /^\d{10}$/.test(phone) ? "" : "Phone must be 10 digits";
    document.getElementById("dateTimeError").innerText = new Date(dateTime) > new Date() ? "" : "Select a future date";
    document.getElementById("termsError").innerText = terms ? "" : "You must agree to terms";

    return name && /\S+@\S+\.\S+/.test(email) && /^\d{10}$/.test(phone) && new Date(dateTime) > new Date() && terms;
}

document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    if (!validateForm()) return;

    let appointment = {
        name: document.getElementById("name").value,
        service: document.getElementById("service").value,
        dateTime: document.getElementById("dateTime").value,
        status: "Pending"
    };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadAppointments();
    closeForm();
    showConfirmation(appointment);
});

function loadAppointments() {
    let table = document.getElementById("appointmentsTable");
    table.innerHTML = "<tr><th>Name</th><th>Service</th><th>Date & Time</th><th>Status</th></tr>";

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.forEach(app => {
        table.innerHTML += `<tr><td>${app.name}</td><td>${app.service}</td><td>${app.dateTime}</td><td>${app.status}</td></tr>`;
    });
}

function showConfirmation(appointment) {
    document.getElementById("confirmationMessage").innerText = `Thank you, ${appointment.name}! Your appointment for ${appointment.service} on ${appointment.dateTime} is confirmed.`;
    document.getElementById("confirmationPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}
