// Handles the delete button function
const delButtonHandler = async (event) => {
  // Functionality for dynamically created buttons.
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const category = event.target.getAttribute("data-category");

    const response = await fetch(`/api/jobs/${category}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile/employer/jobs");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.querySelector(".job-list").addEventListener("click", delButtonHandler);
