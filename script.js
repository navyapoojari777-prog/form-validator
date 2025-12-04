const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+91\s\d{5}-\d{5}$/, // +91 98765-76543, any first digit 0-9
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

const fields = ["email", "phone", "password"];
const form = document.getElementById("myForm");

// Format phone number as +91 XXXXX-XXXXX
function formatPhone(input) {
  // Remove all non-digits
  let digits = input.value.replace(/\D/g, "");

  // Remove leading '0' or '91' if present
  if(digits.length > 10) digits = digits.slice(-10);

  // If no digits, clear
  if(digits.length === 0) {
    input.value = "";
    return;
  }

  // Format as +91 XXXXX-XXXXX
  let formatted = "+91 " + digits.slice(0,5);
  if(digits.length > 5) formatted += "-" + digits.slice(5);
  input.value = formatted;
}

// Add listeners for all fields
fields.forEach(id => {
  const input = document.getElementById(id);

  if(id === "phone") {
    input.addEventListener("input", () => formatPhone(input));
    input.addEventListener("blur", () => formatPhone(input));
  }

  input.addEventListener("input", () => validate(id));
});

// Validate input
function validate(id) {
  const input = document.getElementById(id);
  const group = document.getElementById(id + "Group");
  const ok = patterns[id].test(input.value.trim());
  group.classList.toggle("success", ok);
  group.classList.toggle("error", !ok);
  group.querySelector(".error-msg").style.display = ok ? "none" : "block";
  return ok;
}

// Form submission
form.addEventListener("submit", e => {
  e.preventDefault();
  const valid = fields.every(validate);

  if(valid){
    alert("Form Submitted Successfully!");
    form.reset();
    document.querySelectorAll(".input-group").forEach(g => {
      g.classList.remove("success", "error");
      g.querySelector(".error-msg").style.display = "none";
    });
  } else {
    const firstInvalid = fields.find(id => !validate(id));
    document.getElementById(firstInvalid).focus();
    alert("Fix errors before submitting");
  }
});
