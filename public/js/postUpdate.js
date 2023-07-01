function postUpdate() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");
  const config = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`http://localhost:8000/api/posts/${postId}`, config)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let rows = data;
      $("#detailpost").empty();
      let post_id = rows.post_id;
      let title = rows["title"];
      let content = rows["content"];
      let category = rows["category"];
      let createdAt = rows["createdAt"];
      let nickname = rows["nickname"];
      let temp_html = `
            <form id="post-form">
              <input type="text" id="title-input" name="title" placeholder="제목을 입력해주세요." value="${title}" required>
              <select id ="category" name="category"> 
                <option value="${category}"></option> 
                <option value="homecook">홈레시피</option> 
                <option value="matjib">맛집추천</option> 
              </select>
              <textarea id="content-input" name="content" placeholder="당신의 음식이야기를 들려주세요." required>${content}</textarea>
              <div class="postBtn">
                <button type="submit" id="submitBtn" onclick="update(${post_id})">게시글 수정 완료</button>
                <button type="button" id="cancelBtn" onclick="deleteBtn(${post_id})">취소</button>
              </div>
            </form>
            `;
      $("#detailpost").append(temp_html);
    });
}
