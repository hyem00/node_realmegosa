function newsfeed() {
  const config = {
    method: "get",
  };
  fetch("http://localhost:8000/api/posts", config)
    .then((response) => response.json())
    .then((data) => {
      let rows = data;
      $("#cardLists").empty();
      for (let i = rows.length - 1; i >= 0; i--) {
        let post_id = rows[i]["post_id"];
        let user_id = rows[i]["user_id"];
        let title = rows[i]["title"];
        let content = rows[i]["content"];
        let category = rows[i]["category"];
        let foodtype = rows[i]["foodtype"];
        let createdAt = rows[i]["createdAt"];
        let a = createdAt.substring(0, 10);
        let nickname = rows[i]["nickname"];
        let temp_html = `
        <div id="box" onclick="datailpostBtn(${post_id})">

         <img class="img" src="../img/pexels-photo-3138578.jpeg" alt="나중에 이미지">
        <p class="heading">${title}</p>
       <p class="texts">
       ${content}
          </p>
          <div class="data"></div>
          <span class="date">${a}</span>
         <span class="nickname">${nickname}</span>

        </div>
       </div>
        `;
        $("#cardLists").append(temp_html);
      }
    });
}
