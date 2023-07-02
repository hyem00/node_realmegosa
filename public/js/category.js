function categorytype() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  const config = {
    method: "get",
  };
  fetch("http://localhost:8000/api/posts", config)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let rows = data;
      $("#cardLists").empty();

      const result = rows.filter((x) => x.category === category);
      for (let i = result.length - 1; i >= 0; i--) {
        let post_id = result[i]["post_id"];
        let user_id = result[i]["user_id"];
        let title = result[i]["title"];
        let content = result[i]["content"];
        let category = result[i]["category"];
        let pimage_url = result[i]["pimage_url"];
        let createdAt = result[i]["createdAt"];
        let a = createdAt.substring(0, 10);
        let nickname = result[i]["nickname"];
        let temp_html = `
            <div id="box" onclick="datailpostBtn(${post_id})">
            <img id="img" src="${pimage_url}" alt="나중에 이미지">
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
categorytype();
