const patterns = {
    // Regex for basic email format: user@domain.tld
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    
    // Regex for the required phone format: +91 XXXXX-XXXXX
    phone: /^\+91 \d{5}-\d{5}$/, 
    
    // Regex for password: Minimum 8 characters, at least one uppercase letter, and at least one digit.
    password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};

const fields = ["email", "phone", "password"];
// Get the form element
const form = document.getElementById("myForm");
// Get all input elements by their field IDs
const inputs = fields.map(id => document.getElementById(id));

// --- 1. Phone Formatting Function ---
// This function cleans and formats the input value as +91 XXXXX-XXXXX
function formatPhone(input) {
    // Remove all non-digit characters
    let digits = input.value.replace(/\D/g, "");

    // If empty, leave blank
    if (digits.length === 0) {
        input.value = "";
        return;
    }

    // Keep only last 10 digits (The 10 digits needed after the +91)
    if(digits.length > 10) digits = digits.slice(-10);

    // Format
    let formatted = "+91 ";
    formatted += digits.slice(0, 5); // First 5 digits
    
    // Add the hyphen and the remaining digits
    if(digits.length > 5) {
        formatted += "-" + digits.slice(5);
    }

    input.value = formatted;
}

// --- 2. Validation Function ---
// This function tests the input against its corresponding regex and applies a class.
function validate(field) {
    // Check if the input value matches the pattern
    if (patterns[field.id].test(field.value)) {
        // Validation successful: Set class to 'valid'
        field.className = "valid";
        // Hide the error message (optional, but good practice)
        field.parentElement.querySelector('.error-msg').style.display = 'none';
        return true;
    } else {
        // Validation failed: Set class to 'invalid'
        field.className = "invalid";
        // Show the error message
        field.parentElement.querySelector('.error-msg').style.display = 'block';
        return false;
    }
}

// --- 3. Event Listeners Setup ---

inputs.forEach(input => {
    // Event 1: Validate on keyup for instant feedback
    // This runs the main validation for email and password
    input.addEventListener('keyup', (e) => {
        validate(e.target);
    });

    // Special handling for the phone number field
    if (input.id === 'phone') {
        // Event 2: Format on input for seamless typing experience
        input.addEventListener('input', (e) => {
            // Run formatting first
            formatPhone(e.target);
            // Then run validation immediately after
            validate(e.target);
        });
        
        // Event 3: Final format and validation on blur (when field loses focus)
        input.addEventListener('blur', (e) => {
            formatPhone(e.target);
            validate(e.target);
        });
    }
});

// --- 4. Form Submission Control ---
form.addEventListener('submit', (e) => {
    let allValid = true;
    
    // Check all fields one last time
    inputs.forEach(input => {
        // We use the validate function's return value to check validity
        if (!validate(input)) {
            allValid = false;
        }
        // Also ensure field is not empty if validation passed but value is empty
        if (input.value === '') {
             input.className = "invalid";
             allValid = false;
        }
    });

    if (!allValid) {
        // Prevent form from submitting if any field is invalid
        e.preventDefault();
        alert('Please correct the invalid fields before submitting.');
    }
});