// Category display script added by Divyalakshana
document.addEventListener("DOMContentLoaded", function() {
	const tabs = document.querySelectorAll(".category-tab");
	const sections = document.querySelectorAll(".category-content");

	tabs.forEach(tab => {
		tab.addEventListener("click", function () {
			const selectedCategory = this.getAttribute("data-category");
			const selectedSection = document.getElementById(selectedCategory);

			// Hide all sections
			sections.forEach(section => {
				section.style.display = "none";
			});

			// Show selected section
			if (selectedSection) {
				selectedSection.style.display = "block";

				// Scroll to top of section
				selectedSection.scrollIntoView({
					behavior: "smooth",
					block: "start"
				})
			}

			tabs.forEach( t => t.classList.remove("active"));
			this.classList.add("active");
		});
	});

	tabs[0].click();
});
	


