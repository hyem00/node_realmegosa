function newsfeed() {
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
          console.log(rows);
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
            let temp_html = `
            <div id="box" onclick="location.href='http://localhost:8000/detailpost/${post_id}'" >
             <img class="img" src="../img/pexels-photo-3138578.jpeg" alt="나중에 이미지">
            <p class="heading">${title}</p>
            
           <p class="texts">
           ${content}
              </p>
              <div class="data"></div>
              <span class="date">${createdAt}</span>
             <span class="nickname">${nickname}</span>
            </div>
           </div>
            `;
            $("#cardLists").append(temp_html);
          }
        },
      })
    )
    .catch((error) => console.log(error));
}
