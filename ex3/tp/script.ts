let userData;
let postData;

const userBlog = document.querySelector(".user-blog") as HTMLDivElement;

const fetchData = async () => {
  const reqUser = await fetch("https://jsonplaceholder.typicode.com/users");
  userData = await reqUser.json();

  const reqPost = await fetch("https://jsonplaceholder.typicode.com/posts");
  postData = await reqPost.json();

  const data = userData.map((u) => {
    return Object.assign(
      {},
      u,
      postData.filter((p) => p.userId === u.id)
    );
  });
  let html: string = "";

  console.log(data);

  for (let i = 0; i < data.length; i++) {
    html += `
              <h2>${data[i].name}</h2>
              <p>${data[i].email}</p>
              <h1>Titre des articles rédigés</h1>
              <ul>
            `;
    data.map((d) => {
      html += `<li>
        ${d[i].title}
      </li></ul>`;
    });
  }
  userBlog.innerHTML = html;
};
fetchData();

//  tsc script.ts && node script.js

// tsc script.ts --lib "ES2015","DOM" --watch --target es6 && node script.js
