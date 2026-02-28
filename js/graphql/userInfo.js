export function userinfo(info){
    return `
    <p class="userInfo">
    username     : ${info.login} <br>
    phone Number : ${info.attrs.tel} <br>
    city         : ${info.attrs.city} <br>
    </p>
    <div><img src="${info.attrs.avatarUrl}" class="avatar-circle"></div>
`
}


export function auditInfo(info) {
    return `
    <p>audit Ratio ${Number(info.auditRatio).toFixed(2)}</p>
    <div>
        ${info.transactions
            .map(elm => `<p>${elm.amount} ${elm.type}</p>`)
            .join('')}
    </div>
    `;
}





