// const postForm = document.getElementById("post-form");
// const postList = document.getElementById("post-list");

// postForm.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const authorInput = document.getElementById("author-input");
//   const contentInput = document.getElementById("content-input");

//   const author = authorInput.value;
//   const content = contentInput.value;

//   if (author.trim() !== "" && content.trim() !== "") {
//     createPost(author, content);
//     authorInput.value = "";
//     contentInput.value = "";
//   }
// });

// function createPost(author, content) {
//   const post = document.createElement("div");
//   post.classList.add("post");
//   post.innerHTML = `
//     <h3>${author}</h3>
//     <p>${content}</p>
//   `;
//   postList.appendChild(post);
// }
