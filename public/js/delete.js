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
      } else if (res.errorMessage === "로그인 후 이용 가능한 기능1입니다.") {
        alert("로그인 해주세요")
      }else {
        alert("삭제완료.");
        location.href = `http://localhost:8000/main`;
      }
    });
}
