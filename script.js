function validateForm() {

    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    clearErrors();
    
    let isValid = true;
    if (!name.value.trim()) {
        showError(name, nameError, 'Name is required');
        isValid = false;
    }
    if (!email.value.trim()) {
        showError(email, emailError, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, emailError, 'Please enter a valid email format (e.g., example@email.com)');
        isValid = false;
    }
    if (!subject.value.trim()) {
        showError(subject, subjectError, 'Subject is required');
        isValid = false;
    }
    if (!message.value.trim()) {
        showError(message, messageError, 'Message is required');
        isValid = false;
    }
    if (isValid) {
        submitForm();
    } else {
        alert('Please fix the errors in the form before submitting.');
    }
    
    return false; 
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function showError(inputElement, errorElement, message) {
    inputElement.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    const formGroups = document.querySelectorAll('.form-group');
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
}
function submitForm() {
    const submitBtn = document.querySelector('.submit-btn');
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    setTimeout(() => {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        console.log('Form submitted:', formData);
        form.style.display = 'none';
        successMessage.classList.add('show');
        form.reset();
 
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        alert('Thank you for contacting us! We\'ll get back to you soon.');
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.classList.remove('show');
        }, 3000);
        
    }, 1500);
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.parentElement;
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorElement = formGroup.querySelector('.error');
                errorElement.classList.remove('show');
                errorElement.textContent = '';
            }
        });

        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

function resetForm() {
    document.getElementById('contactForm').reset();
    clearErrors();
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        validateForm();
    }
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        resetForm();
    }
});

function autoSaveForm() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            localStorage.setItem('contactForm_' + this.name, this.value);
        });
    });
}
function loadSavedFormData() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem('contactForm_' + input.name);
        if (savedValue) {
            input.value = savedValue;
        }
    });
}
function clearSavedFormData() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        localStorage.removeItem('contactForm_' + input.name);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    loadSavedFormData();
    autoSaveForm();
    document.getElementById('contactForm').addEventListener('submit', function() {
        setTimeout(clearSavedFormData, 2000);
    });
});