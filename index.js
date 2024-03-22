
const form = document.querySelector('#contact form');
const formMessage = document.querySelector('#contact .form-message');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 


  formMessage.textContent = '';
  formMessage.classList.remove('success', 'error');


  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.classList.add('error');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);


  fetch('/submit-form', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      formMessage.textContent = 'Your message has been sent successfully!';
      formMessage.classList.add('success');
      form.reset(); 
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