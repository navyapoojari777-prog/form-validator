const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+91[\s\d{5}-\d{5}]$/, // exactly +91 XXXXX-XXXXX
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

const fields = ["email", "phone", "password"];
const form = document.getElementById("myForm");

// Format phone number as +91 XXXXX-XXXXX
function formatPhone(input) {
  // Remove all non-digit characters
  let digits = input.value.replace(/\D/g, "");

  // Keep only last 10 digits
  if(digits.length > 10) digits = digits.slice(-10);

  // Format
  let formatted = "+91 ";
  if(digits.length > 0) formatted += digits.slice(0,5);
  if(digits.length > 5) formatted += "-" + digits.slice(5);

  input.value = formatted;
}

// Validate input and show errors
function validate(id) {
  const input = document.getElementById(id);
  const group = document.getElementById(id + "Group");
  const ok = patterns[id].test(input.value.trim());
  group.classList.toggle("success", ok);
  group.classList.toggle("error", !ok);
  group.querySelector(".error-msg").style.display = ok ? "none" : "block";
  return ok;
}

// Add listeners
fields.forEach(id => {
  const input = document.getElementById(id);

  if(id === "phone") {
    input.addEventListener("input", () => formatPhone(input));
    input.addEventListener("blur", () => formatPhone(input));
  }

  input.addEventListener("input", () => validate(id));
});

// Form submit
form.addEventListener("submit", e => {
  e.preventDefault();
  const valid = fields.every(validate);

  if(valid){
    alert("Form Submitted Successfully!");
    form.reset();
    document.querySelectorAll(".input-group").forEach(g => {
      g.classList.remove("success","error");
      g.querySelector(".error-msg").style.display="none";
    });
  } else {
    const firstInvalid = fields.find(id => !validate(id));
    document.getElementById(firstInvalid).focus();
    alert("Fix errors before submitting");
  }
});
