// Javascript for Online Table Reservation feature --> Added by Divyalakshana

function openReservation() {
  document.getElementById("reservationModal").style.display = "block";
  document.getElementById("reservationForm").style.display = "block";
  document.getElementById("reservationForm").reset();
  document.getElementById("confirmationMessage").style.display = "none";
}

function closeReservation() {
  document.getElementById("reservationModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("reservationModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", function () {
  const reservationForm = document.getElementById("reservationForm");
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("reservationName").value;
      const date = document.getElementById("reservationDate").value;
      const people = document.getElementById("reservationPeople").value;

      const confirmation = `
	<h2>Reservation Confirmed!</h2>
	<p><strong>Name:</strong> ${name}</p>
	<p><strong>Date:</strong> ${date}</p>
	<p><strong>Number of People:</strong> ${people}</p><br>
	<button onclick="closeReservation()">Close</button>
	`;

      document.getElementById("reservationForm").style.display = "none";
      const confirmDiv = document.getElementById("confirmationMessage");
      confirmDiv.innerHTML = confirmation;
      confirmDiv.style.display = "block";
      //alert("reservation confirmed! Thank you.");
      //closeReservation();
      event.target.reset();
    });
  }
});
