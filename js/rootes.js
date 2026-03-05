import { LoginPage } from "./auth/template.js";
import { signin } from "./auth/login.js";
import { logout } from "./auth/logout.js";
import { recieveData } from "./graphql/fetch.js";
import { query } from "./graphql/querys.js";
import { skillsInfo, userinfo } from "./graphql/userInfo.js";
import { xpandlevel } from "./graphql/querys.js";
import { transactions } from "./graphql/querys.js";
import { progress } from "./graphql/userInfo.js";
export let info
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
    let xps = await recieveData(xpandlevel)
    let trs = await recieveData(transactions)
    
    info = data.data.user[0]   
    let xplevel = xps.data 
    app.innerHTML = userinfo(info , xplevel)
    skillsInfo(info)
    progress(trs)
    
    document.getElementById("logout").onclick = logout;
  }
};

window.onload = start;


