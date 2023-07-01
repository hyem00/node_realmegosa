function update(post_id) {
  const form = document.getElementById("post-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = new FormData(form);

    const myForm = {};
    await payload.forEach((value, key) => (myForm[key] = value));

    fetch("http://localhost:8000/api/posts/" + post_id, {
      method: "PUT",
      master,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myForm),
    });
    alert("수정완료");
    location.href = "main";
  });
}
//
