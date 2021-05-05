var clearBtn = document.querySelector("#search-btn");
clearBtn.addEventListener("click", clearSearch);

function clearSearch() {
  var textSearch = document.getElementById("searchbar");
  var txtrsults = textSearch.value;
  window.location = "/search/" + txtrsults;
}
