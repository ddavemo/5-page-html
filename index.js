// scripts/main.js


// Get the form element
const form = document.querySelector('#contact form');
const formMessage = document.querySelector('#contact .form-message');

// Add an event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  // Reset the form message
  formMessage.textContent = '';
  formMessage.classList.remove('success', 'error');

  // Get form values
  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  // Perform form validation
  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.classList.add('error');
    return;
  }

  // Prepare the form data
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  // Send the form data to the server
  fetch('/submit-form', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      formMessage.textContent = 'Your message has been sent successfully!';
      formMessage.classList.add('success');
      form.reset(); // Reset the form fields
    } else {
      formMessage.textContent = 'Something went wrong. Please try again later.';
      formMessage.classList.add('error');
    }
  })
  .catch(error => {
    formMessage.textContent = 'Something went wrong. Please try again later.';
    formMessage.classList.add('error');
    console.error('Error:', error);
  });
});