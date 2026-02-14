export async function fetchingprofile(jwt){
    document.querySelector('body').innerHTML = ""
    const response = await fetch('https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql',{
        method : "POST",
        headers : {
            "Authorization" : `Bearer ${jwt}`,
            "content-type": "application/json"
        },
       body: JSON.stringify({
  query: `
    query {
      user {
        id
        login
        auditRatio
        avatarUrl
         xps {
        amount
        path
        originEventId
      }
      }
        
    }
  `
})
    })
    if (!response.ok){
        console.error("error fetching data")
    }
    let data = await response.json()
    let total = 70000
    let totalXp = data.data.user[0].xps
    await totalXp.forEach(elm => {
      if ((elm["originEventId"])==41){
         total += elm["amount"]
      }
     
    });
    userInfoCreate(data.data.user[0].login , data.data.user[0].id ,data.data.user[0].auditRatio ,data.data.user[0].avatarUrl ,total )

}

function userInfoCreate(username,id,auditR,image,total){
    let userInfo = document.createElement('div')
    userInfo.className = 'userInfo'
    document.body.style.background = 'white'
    userInfo.innerHTML = `
    <div><img src="${image}"></div>
    <br>
    <h1>UserName : ${username}</h1>
    <br>
    <h1>Id : ${id}</h1>
    <br>
    <h1>audit Ratio : ${Number(auditR).toFixed(2)}</h1>
     <br>
    <h1>total Xp : ${total}</h1>`
    document.body.appendChild(userInfo)
}