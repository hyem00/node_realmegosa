function update(post_id) {
  const form = document.getElementById("post-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = new FormData(form);

    const myForm = {};
    await payload.forEach((value, key) => (myForm[key] = value));

    fetch("http://localhost:8000/api/posts/" + post_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myForm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.errorMessage === "해당 게시글을 찾을 수 없습니다.") {
          alert("해당 게시글을 찾을 수 없습니다.");
        } else if (res.message === "권한이 없습니다.") {
          alert("권한이 없습니다.");
        } else {
          alert("수정완료.");
          location.href = "main";
        }
      });
  });
}
//
