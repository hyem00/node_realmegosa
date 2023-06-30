function update() {
  const form = document.getElementById("post-form");
  const config = {
    method: "get",
  };
  fetch("http://localhost:8000/api/posts", config)
    .then((response) => response.json())
    .then((data) =>
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/posts",
        data: { data },
        success: function (response) {
          let rows = response;
          let apost_id = $(this).data("post-id");
          const result = rows.find((x) => x.post_id === apost_id);
          $("#cardLists").empty();
          let temp_html = `
            <div id="board">
              <form id="post-form">
                <input type="text" id="title-input" name="title" placeholder="제목을 입력해주세요." value="${result.title}" required>
                <select id ="category" name="category">
                  <option value="">카테고리</option>
                  <option value="homecook">홈레시피</option>
                  <option value="matjib">맛집추천</option>
                </select>
                <textarea id="content-input" name="content" placeholder="당신의 음식이야기를 들려주세요." required>${result.content}</textarea>
                <div class="postBtn">
                  <button type="submit" id="submitBtn" onclick="update()">게시글 수정 완료</button>
                  <button type="button" id="cancelBtn">취소</button>
                </div>
              </form>
            </div>
            `;
          $("#cardLists").append(temp_html);
        },
      })
    );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = new FormData(form);
    const myForm = {};
    await payload.forEach((value, key) => (myForm[key] = value));
    console.log(myForm);
    fetch("http://localhost:8000/api/posts/:post_id", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myForm),
    });
  });
}
