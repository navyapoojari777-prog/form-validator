const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+91\s[6-9]\d{4}-\d{5}$/, 
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

const fields = ["email", "phone", "password"];
const form = document.getElementById("myForm");

// Format phone number to +91 XXXXX-XXXXX
function formatPhone(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 10); // only digits
  if (v.length > 0) {
    input.value = "+91 " + v.slice(0,5) + (v.length > 5 ? "-" + v.slice(5) : "");
  } else {
    input.value = "";
  }
}

fields.forEach(id => {
  const input = document.getElementById(id);

  // Phone formatting
  if (id === "phone") {
    input.addEventListener("input", () => formatPhone(input));
    input.addEventListener("blur", () => formatPhone(input));
  }

  // Real-time validation
  input.addEventListener("input", () => validate(id));
});

function validate(id) {
  const input = document.getElementById(id);
  const group = document.getElementById(id + "Group");
  const ok = patterns[id].test(input.value.trim());
  group.classList.toggle("success", ok);
  group.classList.toggle("error", !ok);
  group.querySelector(".error-msg").style.display = ok ? "none" : "block";
  return ok;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const valid = fields.every(validate);

  if(valid){
    alert("Form Submitted Successfully!");
    form.reset();
    document.querySelectorAll(".input-group").forEach(g => {
      g.classList.remove
