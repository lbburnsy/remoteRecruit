const signupFormHandler = async (event) => {
  event.preventDefault();
  var selections=[];

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const location = document.querySelector('#location-signup').value.trim();
  const website = document.querySelector('#website-signup').value.trim();

  document.getElementsByName('developer-type')
  .forEach(checkbox => {
      if (checkbox.checked) {
          console.log(checkbox.value);
          selections.push(checkbox.value);
      }
  });
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, location, website, selections }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".create-account")
  .addEventListener("submit", signupFormHandler);

// on click for switch check box
