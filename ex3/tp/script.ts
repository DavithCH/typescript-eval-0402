let userData: Array<any>;
let postData: Array<any>;
let data;

const userBlog = document.querySelector(".user-blog") as HTMLDivElement;

const fetchData = async () => {
  const reqUser = await fetch("https://jsonplaceholder.typicode.com/users");
  userData = await reqUser.json();

  const reqPost = await fetch("https://jsonplaceholder.typicode.com/posts");
  postData = await reqPost.json();

  data = userData.map((u) => {
    return Object.assign(
      {},
      u,
      postData.filter((p: any) => p.userId === u.id)
    );
  });
  let html: string = "";

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

  filter(data);
};

const filter = (data: any) => {
  const form = document.querySelector("form") as HTMLFormElement;
  const byTitle = document.querySelector(".by-title") as HTMLInputElement;
  const byUser = document.querySelector(".by-user") as HTMLInputElement;

  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    if (byUser.value !== "") {
      data = userData.filter((u) => {
        if (u.name === byUser.value) {
          // return Object.assign(
          //   {},
          //   u,
          //   postData.filter((p) => p.userId === u.id)
          // );
          return [u, postData.filter((p) => p.userId === u.id)];
        }
      });

      console.log(data);
      let html: string = "";

      for (let i = 0; i < data.length; i++) {
        html += `
              <h2>${data[i].name}</h2>
              <p>${data[i].email}</p>
              <h1>Titre des articles rédigés</h1>
              <ul>
            `;

        data.map((d: any) => {
          if (d[i].title) {
            html += `<li>
        ${d[i].title}
      </li></ul>`;
          }
        });
      }
      userBlog.innerHTML = html;
    }

    if (byTitle.value !== "") {
      data = postData.filter((p) => {
        p.title === byTitle.value &&
          Object.assign(
            {},
            p,
            userData.filter((u) => u.id === p.userId)
          );
      });
      let html: string = "";

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
    }
  });
};
fetchData();

// tsc script.ts --lib "ES2015","DOM" --watch --target es6 && node script.js
