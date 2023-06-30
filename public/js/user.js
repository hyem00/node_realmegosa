const form = document.getElementById("signup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = new FormData(form);

  const myForm = {};
  await payload.forEach((value, key) => (myForm[key] = value));

  fetch("http://localhost:8000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myForm),
  });
});
