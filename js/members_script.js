// add js here
function displayInfo() {
  var select = document.getElementById("member-dropdown");

  // Hide All members content by default
  for (let i = 0; i < select.options.length; i++) {
    const memberId = select.options[i].value;
    const memberDiv = document.getElementById(memberId);
    memberDiv.style.display = "none";
  }

  //Get the member element for selected value and display it
  var selectedValue = select.value;
  var memberElement = document.getElementById(selectedValue);
  memberElement.style.display = "block";

  //change the css file based on selected value
  var styleLink = document.getElementById("member-css");
  styleLink.href = `../css/members/individual/${selectedValue}.css`;
  console.log(styleLink.href);
}
