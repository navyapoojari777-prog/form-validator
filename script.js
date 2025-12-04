const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10}$/,
 password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

// Apply real-time + submit validation
["email", "phone", "password"].forEach(id => {
  const input = document.getElementById(id);
  
  if (id === "phone") {
    // Auto-format phone number while typing
    input.addEventListener("input", formatPhone);
  }
  
  input.addEventListener("input", () => validate(id));
});

// Format phone number to +91 XXXXX-XXXXX
function formatPhone(e) {
  let value = e.target.value.replace(/\D/g, ""); // remove non-digits
  if (value.startsWith("91")) value = value.slice(2); // remove leading 91 if typed
  if (value.length > 10) value = value.slice(0, 10); // limit to 10 digits

  let formatted = "+91 ";
  if (value.length <= 5) {
    formatted += value;
  } else {
    formatted += value.slice(0, 5) + "-" + value.slice(5);
  }

  e.target.value = formatted;
}

function validate(id) {
  const input = document.getElementById(id);
  const group = document.getElementById(id + "Group");
  if (validForm) {
    alert("Form Submitted Successfully!");

    // Reset form fields
    this.reset();

    // Remove success/error classes
    document.querySelectorAll('.input-group').forEach(group => {
      group.classList.remove('success', 'error');
      group.querySelector('.error-msg').style.display = 'none';
    });
  } else {
    const firstInvalid = ["email","phone","password"].find(id => !validate(id));
    document.getElementById(firstInvalid).focus();
    alert("Fix errors before submitting");
  }
};