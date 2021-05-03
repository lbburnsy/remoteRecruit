const jobFormHandler = async (event) => {
  event.preventDefault();
  let categories = [];

  const name = document.querySelector("#job-title-create").value.trim();
  const description = document
    .querySelector("#job-description-create")
    .value.trim();
  const qualifications = document
    .querySelector("#qualifications-create")
    .value.trim();
  const location = document.querySelector("#location-create").value.trim();
  const website = document.querySelector("#website-create").value.trim();

  document.getElementsByName("developer-type").forEach((checkbox) => {
    if (checkbox.checked) {
      console.log(checkbox.value);
      categories.push(checkbox.value);
    }
  });
  let category = categories[0];

  if (
    name &&
    description &&
    qualifications &&
    location &&
    website &&
    category
  ) {
    const response = await fetch(`/api/users/${category}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        qualifications,
        location,
        website,
        category
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile/employer/jobs");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".jobCreateForm")
  .addEventListener("submit", jobFormHandler);
