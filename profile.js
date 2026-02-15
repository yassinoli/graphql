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
        campus
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
      if ((elm["originEventId"])==41  ||(elm["originEventId"])==490 ||(elm["originEventId"])== 458 ||(elm["originEventId"])==305){
         total += elm["amount"]
      }
     
    });
    let userInfo = data.data.user[0]
    userInfoCreate(userInfo.login , userInfo.id ,userInfo.auditRatio ,userInfo.avatarUrl ,total , userInfo.campus )

}

function userInfoCreate(username,id,auditR,image,total,campus){
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
    <h1>total Xp : ${total}</h1>
    <h1>Campus : ${campus}</h1>
    `
    document.body.appendChild(userInfo)
}