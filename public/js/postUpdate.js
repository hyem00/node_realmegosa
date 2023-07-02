function postUpdate() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("post_id");

  fetch(`http://localhost:8000/api/${postId}`, {
    method: "get",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.errorMessage === "해당 권한이 없습니다") {
        alert("해당 권한이 없습니다");
        location.href = `http://localhost:8000/posts/?post_id=${postId}`;
      } else if (res.errorMessage === "로그인이 필요한 기능입니다") {
        alert("로그인이 필요한 기능입니다");
        location.href = `http://localhost:8000/posts/?post_id=${postId}`;
      }
    });

  fetch(`http://localhost:8000/api/posts/${postId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
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
                <button type="button" id="cancelBtn" onclick="datailpostBtn(${post_id})">취소</button>
              </div>
            </form>
            `;
      $("#detailpost").append(temp_html);
    });
}

postUpdate();
