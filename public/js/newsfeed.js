function newsfeed() {
  $.ajax({
    type: "GET",
    url: "/newsfeed",
    data: {},
    seucces: function (response) {
      let rows = response["result"];
      $("#cardList").empty();

      for (let i = rows.length - 1; i >= 0; i--) {
        let name = rows[i]["name"];
        let id = rows[i]["_id"];
        let comment = rows[i]["comment"];
        let group = rows[i]["group"];
        // console.log(rows)
        // ${name} = rows[i]['name'] , ${id} = rows[i]['_id']
        let temp_html = `
        <section class="cardList" id="cardList">
            <div>test</div>
        </section>`;
        $("#cardList").append(temp_html);
      }
    },
  });
}
