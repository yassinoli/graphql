import {fetchingprofile} from '/profile.js'
async function  feetching(information){

    const resp = await fetch("https://learn.zone01oujda.ma/api/auth/signin" ,{
        method : "POST",
        headers: {
            "Authorization" : `Basic ${information}`,
             "content-type": "application/json"
        }
    })
    
    if (!resp.ok){
        console.error('data invalid')
    }
      const data = await resp.json()
      let jwt = data.jwt
      localStorage.setItem("jwt",data)
      fetchingprofile(data)
}



document.querySelector('button').addEventListener("click",(ev)=>{
    ev.preventDefault()
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
let authent = btoa(`${username}:${password}`)
    
    feetching(authent)

})