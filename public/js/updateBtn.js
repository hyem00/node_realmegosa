function updateBtn(post_id) {
  const config = {
    method: "get",
  };
  console.log(post_id);

  fetch("http://localhost:8000/api/posts/" + post_id, config)
    .then((response) => response.json())
    .then((data) =>
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/posts/" + post_id,
        data: { data },
        success: function () {
          let rows = [data];
          $("#cardLists").empty();
          for (let i = rows.length - 1; i >= 0; i--) {
            let post_id = rows[i]["post_id"];
            let user_id = rows[i]["user_id"];
            let title = rows[i]["title"];
            let content = rows[i]["content"];
            let category = rows[i]["category"];
            let foodtype = rows[i]["foodtype"];
            let createdAt = rows[i]["createdAt"];
            //닉네임 고치기
            let nickname = rows[i]["nickname"];

            console.log(createdAt);

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
            $("#cardLists").append(temp_html);
          }
        },
      })
    );
}
//
