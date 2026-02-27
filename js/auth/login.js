import { start } from "../rootes.js";

export async function signin() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  if (!username || !password) {
    console.log("%c[!] form missing", "color:#0f0");
    return;
  }

  if (!username.value || !password.value) {
    username.style.border = `2px solid #0f0`;
    password.style.border = `2px solid #0f0`;
    return;
  }
  username = username.value;
  password = password.value;
  let credentials = btoa(username + ":" + password);
  try {
    let response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert(`ACCESS DENIED [HTTP ${response.status}]`);
      return;
    }

    let data = await response.json();
    localStorage.setItem("jwt", data);
    start();
  } catch (error) {
    console.error("%c[!] fetch failed", "color:#f00", error);
    return null;
  }
}
