// List of developer names
const developers = ["Esal Shakil", "Divyalakshana Perumal Rajaram", "Franklin Zhang", "Ashton Gibson (former member)"];
let index = 0;

// Function to update developer name
function updateDeveloperName() {
  const nameElement = document.getElementById("developer-name");
  nameElement.textContent = developers[index];
  index = (index + 1) % developers.length;
}

// Scroll names every 2 seconds
setInterval(updateDeveloperName, 2000);

// Initial call
updateDeveloperName();
