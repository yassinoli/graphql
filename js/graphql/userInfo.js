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
   let skills =  info.transactions.filter(elm => elm.type.startsWith("skill") )
   let skillso = []
   for (let i = 0; i < skills.length; i++) {
       const elm = skills[i];
       skillso[i] = `${elm.type.slice(6)} = ${elm.amount}`
    }
    console.log(skillso);
    
    document.body.innerHTML += `<svg id="chart" width="800" height="300"></svg>`
    
// parse data
const data = skillso.map(item => {
  const [name, value] = item.split('=');
  return {
    name: name.trim(),
    value: Number(value.trim())
  };
});

const svg = document.getElementById("chart");

const width = 800;
const height = 300;
const padding = 30;

const barWidth = width / data.length;

// max value
const max = Math.max(...data.map(d => d.value));

data.forEach((d, i) => {
  const barHeight = (d.value / max) * (height - padding);

  const x = i * barWidth;
  const y = height - barHeight;

  // create rect
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x + 5);
  rect.setAttribute("y", y);
  rect.setAttribute("width", barWidth - 10);
  rect.setAttribute("height", barHeight);
  rect.setAttribute("class", "bar");

  svg.appendChild(rect);

  // skill name
 const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

const tx = x + barWidth / 2;
const ty = height -6; //  chart 

text.setAttribute("x", tx);
text.setAttribute("y", ty);

// rotate vertical
// text.setAttribute("transform", `rotate(-90, ${tx}, ${ty})`);

text.setAttribute("text-anchor", "end");
text.setAttribute("class", "label");

text.textContent = d.name;

svg.appendChild(text);

  // value
  const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  valueText.setAttribute("x", x + barWidth / 2);
  valueText.setAttribute("y", y - 5);
  valueText.setAttribute("class", "value");
  valueText.textContent = d.value;

  svg.appendChild(valueText);
});

  
}





