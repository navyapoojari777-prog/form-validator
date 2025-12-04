const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+91\s[6-9]\d{4}-\d{5}$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

const fields = ["email", "phone", "password"];

const form = document.getElementById("myForm");

fields.forEach(id => {
  const input = document.getElementById(id);

  // Phone formatting
  if (id === "phone") {
    input.addEventListener("input", e => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 10);
      e.target.value = "+91 " + v.slice(0,5) + (v.length>5 ? "-" + v.slice(5) : "");
    });
    input.addEventListener("blur", () => {
      let v = input.value.replace(/\D/g, "");
      if(v.length === 10) input.value = "+91 " + v.slice(0,5) + "-" + v.slice(5);
    });
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

form.addEventListener
