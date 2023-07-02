function update() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");
  const form = document.getElementById("post-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = new FormData(form);

    const myForm = {};
    await payload.forEach((value, key) => (myForm[key] = value));

    fetch(`http://localhost:8000/api/posts/${postId}`, {
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
        } else if (res.errorMessage === "로그인 후 이용 가능한 기능1입니다.") {
          alert("로그인 해주세요");
          location.href = `http://localhost:8000/posts/?post_id=${postId}`;
        } else if (res.message === "권한이 없습니다.") {
          alert("권한이 없습니다.");
          location.href = `http://localhost:8000/posts/?post_id=${postId}`;
        } else {
          alert("수정완료.");
          location.href = `http://localhost:8000/main`;
        }
      });
  });
}
