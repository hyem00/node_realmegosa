function deleteBtn() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");

  fetch(`http://localhost:8000/api/posts/${postId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.errorMessage === "해당 게시글을 찾을 수 없습니다.") {
        alert("해당 게시글을 찾을 수 없습니다.");
      } else if (res.message === "권한이 없습니다.") {
        alert("권한이 없습니다.");
        location.href = `http://localhost:8000/posts/?post_id=${postId}`;
      } else {
        alert("삭제 완료.");
        location.href = `http://localhost:8000/main`;
      }
    });
}
