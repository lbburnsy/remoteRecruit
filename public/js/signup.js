const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const location = document.querySelector('#location-signup').value.trim();
    const website = document.querySelector('#website-signup').value.trim();
    const role = document.querySelector('#name-signup').getAttribute("data-role")

    if (name && email && password && location && website && role ) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, location, website, role }),
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

// on click for switch check box
