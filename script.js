// Regex patterns
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone:/^\+91[\d{10}]$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

// Apply real-time + submit validation
["email", "phone", "password"].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => validate(id));
});

function validate(id) {
  const input = document.getElementById(id);
  const group = document.getElementById(id + "Group");
  const errorMsg = group.querySelector(".error-msg");
  const isValid = patterns[id].test(input.value.trim());

  group.classList.toggle("success", isValid);
  group.classList.toggle("error", !isValid);
  errorMsg.style.display = isValid ? "none" : "block";

  return isValid;
}

// Submit
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const validForm = ["email", "phone", "password"].every(validate);

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
    alert("Fix errors before submitting");
  }
});

