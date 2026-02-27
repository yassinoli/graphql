import {logout} from "../auth/logout.js"
export async function recieveData(query) {
  let JWT = localStorage.getItem("jwt");
  try {
    const response = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      console.log('graph response rejected');
      return undefined;
    }

    const data = await response.json();
    
    if (data.errors){
      logout()
      return undefined
    }
    return data;
  } catch (error) {
    console.error("error fetching data : ", error);
    return undefined;
  }
}
