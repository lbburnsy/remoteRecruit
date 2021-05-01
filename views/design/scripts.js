const signupFormHandler = async (event) => {
  event.preventDefault();
  let categories=[];

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const location = document.querySelector('#location-signup').value.trim();
  const website = document.querySelector('#website-signup').value.trim();
  const bio = document.querySelector('#bio-signup').value.trim();
  const role = document.querySelector('#name-signup').getAttribute("data-role");

  document.getElementsByName('developer-type')
  .forEach(checkbox => {
      if (checkbox.checked) {
          console.log(checkbox.value);
          categories.push(checkbox.value);
      }
  });
  categories = JSON.stringify(categories);
  if (name && email && password && location && bio && role) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, location, website, bio, role, categories }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);