document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      if (validateForm()) {
        const taxAmount = calculateTax();
        showModal(taxAmount);
      }
    });
  
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  
    function validateForm() {
      let isValid = true;
      const inputs = document.querySelectorAll("input[type='number'], select");
      inputs.forEach(input => {
        const errorIcon = input.nextElementSibling;
        if (!input.checkValidity()) {
          errorIcon.style.display = "inline";
          isValid = false;
        } else {
          errorIcon.style.display = "none";
        }
      });
      return isValid;
    }
  
    function calculateTax() {
      const grossIncome = parseFloat(document.getElementById("grossIncome").value);
      const extraIncome = parseFloat(document.getElementById("extraIncome").value) || 0;
      const deductions = parseFloat(document.getElementById("deductions").value) || 0;
      const age = document.getElementById("age").value;
      
      let tax = 0;
      const taxableIncome = grossIncome + extraIncome - deductions - 8;
      
      if (taxableIncome > 0) {
        switch (age) {
          case "<40":
            tax = 0.3 * taxableIncome;
            break;
          case "≥40 <60":
            tax = 0.4 * taxableIncome;
            break;
          case "≥60":
            tax = 0.1 * taxableIncome;
            break;
          default:
            break;
        }
      }
      return tax;
    }
  
    function showModal(taxAmount) {
      const modalContent = document.querySelector(".modal-content");
      const taxDisplay = document.getElementById("taxAmount");
      taxDisplay.textContent = "Tax Amount: " + taxAmount.toFixed(2) + " Lakhs";
      modal.style.display = "block";
    }
  });
  