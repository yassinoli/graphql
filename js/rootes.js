import { LoginPage } from "./auth/template.js";
import { signin } from "./auth/login.js";
import { logout } from "./auth/logout.js";
import { recieveData } from "./graphql/fetch.js";
import { query } from "./graphql/querys.js";

export const start = async () => {
  let app = document.querySelector("#app");
  if (!app) {
    return;
  }
  let jwt = localStorage.getItem("jwt");
  if (!jwt) {
    app.innerHTML = LoginPage;
    document.getElementById("btnLogin").onclick = signin;
    document.getElementById("password").addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        signin();
      }
    });
  } else {
    let data = await recieveData(query)
    let info = data.data.user[0]
    console.log(info);
    
    app.innerHTML = `<div id="logout"></div>`
    app.innerHTML += `<p>
    username     : ${info.login} <br>
    phone Number : ${info.attrs.tel}
    </p>`

    document.getElementById("logout").onclick = logout;
  }
};

window.onload = start;
let resizeTimeout;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    location.reload();
  }, 1000);
});
