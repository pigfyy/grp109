// added by Franklin

let promotionCodeValid = false;
const VALID_PROMOTION_CODE = "25off";

document.addEventListener("DOMContentLoaded", function () {
  const promotionInput = document.getElementById("promotion-code");
  const checkCodeBtn = document.getElementById("apply-promo-btn");
  const promotionMessage = document.getElementById("promotion-message");

  // when the check code button is clicked, check code to see if it equals the valid promotion code constant
  checkCodeBtn.addEventListener("click", function () {
    const enteredCode = promotionInput.value.trim().toLowerCase();

    // handles three cases: valid code, empty code, invalid code. changes text content, color, and boldness accordingly
    if (enteredCode === VALID_PROMOTION_CODE) {
      promotionCodeValid = true;
      promotionMessage.textContent =
        "✓ Valid promotion code! 25% discount applied.";
      promotionMessage.style.color = "green";
      promotionMessage.style.fontWeight = "bold";
      checkCodeBtn.textContent = "✓ Applied";
      checkCodeBtn.disabled = true;
      checkCodeBtn.style.backgroundColor = "#4CAF50";
      checkCodeBtn.style.color = "white";
      promotionInput.disabled = true;

      // Update cart displays if functions are available
      if (typeof window.updateCartDisplay === "function") {
        window.updateCartDisplay();
      }
      if (typeof window.updateCheckoutOrderSummary === "function") {
        window.updateCheckoutOrderSummary();
      }
    } else if (enteredCode === "") {
      promotionMessage.textContent = "Please enter a promotion code.";
      promotionMessage.style.color = "orange";
      promotionMessage.style.fontWeight = "normal";
    } else {
      promotionCodeValid = false;
      promotionMessage.textContent = "✗ Invalid promotion code.";
      promotionMessage.style.color = "red";
      promotionMessage.style.fontWeight = "normal";
    }
  });

  // enter should also allow the input to work
  promotionInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkCodeBtn.click();
    }
  });

  // resets the promotional code field
  function resetPromotionCode() {
    promotionCodeValid = false;
    promotionInput.value = "";
    promotionInput.disabled = false;
    promotionMessage.textContent = "";
    checkCodeBtn.textContent = "Apply";
    checkCodeBtn.disabled = false;
    checkCodeBtn.style.backgroundColor = "";
    checkCodeBtn.style.color = "";
  }

  window.resetPromotionCode = resetPromotionCode;
});

// accesses current promotion field
function getPromotionDiscount() {
  return promotionCodeValid ? 0.25 : 0;
}

// checks if the promotion code is valid
function isPromotionCodeValid() {
  return promotionCodeValid;
}

// Make functions globally accessible
window.getPromotionDiscount = getPromotionDiscount;
window.isPromotionCodeValid = isPromotionCodeValid;
