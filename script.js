const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+91 \d{5}-\d{5}$/, // exactly +91 XXXXX-XXXXX
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

const fields = ["email", "phone", "password"];
const form = document.getElementById("myForm");

// Format phone number as +91 XXXXX-XXXXX
function formatPhone(input) {
  // Remove all non-digit characters
  let digits = input.value.replace(/\D/g, "");

  // If empty, leave blank
  if (digits.length === 0) {
    input.value = "";
    return;
  }

  // Keep only last 10 digits
  if(digits.length > 10) digits = digits.slice(-10);

  // Format
  let formatted = "+91 ";
  formatted += digits.slice(0, 5);
  if(digits.length > 5) formatted += "-" + digits.slice(5);

  input.value = formatted;
}

// Validate input and
