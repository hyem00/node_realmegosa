const openModalBtn = document.getElementById("openModalBtn");
const searchModal = document.getElementById("searchModal");
const closeModal = document.querySelector(".close");

openModalBtn.addEventListener("click", function () {
  searchModal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  searchModal.style.display = "none";
});

// window.addEventListener("click", function (event) {
//   if (event.target === searchModal) {
//     searchModal.style.display = "none";
//   }
// });
