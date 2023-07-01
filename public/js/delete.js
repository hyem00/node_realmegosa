function deleteBtn(post_id) {
  fetch("http://localhost:8000/api/posts/" + post_id, {
    method: "DELETE",
  });
  alert("삭제 완료");
  location.href = "main";
}
//
