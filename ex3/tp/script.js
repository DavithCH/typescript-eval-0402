var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let userData;
let postData;
let data;
const userBlog = document.querySelector(".user-blog");
const fetchData = () => __awaiter(this, void 0, void 0, function* () {
    const reqUser = yield fetch("https://jsonplaceholder.typicode.com/users");
    userData = yield reqUser.json();
    const reqPost = yield fetch("https://jsonplaceholder.typicode.com/posts");
    postData = yield reqPost.json();
    data = userData.map((u) => {
        return Object.assign({}, u, postData.filter((p) => p.userId === u.id));
    });
    let html = "";
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
});
const filter = (data) => {
    const form = document.querySelector("form");
    const byTitle = document.querySelector(".by-title");
    const byUser = document.querySelector(".by-user");
    form.addEventListener("submit", (e) => {
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
            let html = "";
            for (let i = 0; i < data.length; i++) {
                html += `
              <h2>${data[i].name}</h2>
              <p>${data[i].email}</p>
              <h1>Titre des articles rédigés</h1>
              <ul>
            `;
                data.map((d) => {
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
                    Object.assign({}, p, userData.filter((u) => u.id === p.userId));
            });
            let html = "";
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
