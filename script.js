const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10}$/,  // EXACT 10 digits only
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/ 
};

// Attach real-time validation
["email", "phone", "password"].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => validateField(id));
});

// Validate single field
function validateField(id) {
  const input = document.getElementById(id);
  const group = document.getElementById(id + "Group");
  const error = group.querySelector(".error-msg");

  const isValid = patterns[id].test(input.value);

  if (isValid) {
    group.classList.add("success");
    group.classList.remove("error");
    error.style.display = "none";
  } else {
    group.classList.add("error");
    group.classList.remove("success");
    error.style.display = "block";
  }

  return isValid;
}

// Handle the form submit
document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const validEmail = validateField("email");
  const validPhone = validateField("phone");
  const validPassword = validateField("password");

  if (validEmail && validPhone && validPassword) {
    alert("Form Submitted Successfully!");

    this.reset();

    document.querySelectorAll(".input-group").forEach(group => {
      group.classList.remove("success", "error");
      group.querySelector(".error-msg").style.display = "none";
    });
  } else {
    alert("Fix errors before submitting.");
  }
});
