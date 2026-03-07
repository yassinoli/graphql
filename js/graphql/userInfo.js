export function userinfo(info , xp){
    return `
    <div class="header-section">
        <div class="user-info-container">
            <div class="user-info-row"><strong>Username:</strong> ${info.login}</div>
            <div class="user-info-row"><strong>Name:</strong> ${info.firstName} ${info.lastName}</div>
            <div class="user-info-row"><strong>City:</strong> ${info.attrs.city}</div>
            <div class="user-info-row"><strong>Phone:</strong> ${info.attrs.tel}</div>
            <div class="user-info-row"><strong>Cohort:</strong> ${info.labels[0].labelName}</div>
            <div class="user-info-row"><strong>XP:</strong> ${Math.round(Number(xp.xp.aggregate.sum.amount)/1000)} KB</div>
            <div class="user-info-row"><strong>Level:</strong> ${xp.level[0].amount}</div>
        </div>
        <img src="${info.attrs.avatarUrl}" class="avatar-circle" alt="User Avatar">
        <button id="logout" title="Logout"></button>
    </div>
    <div class="header-section"><div class="user-info-row"><strong>XP:</strong> ${Math.round(Number(xp.xp.aggregate.sum.amount)/1000)} KB</div></div>
    <div class="header-section"><div class="user-info-row"><strong>Level:</strong> ${xp.level[0].amount}</div></div> 
`
}


export function skillsInfo(info) {
   let skills =  info.transactions.filter(elm => elm.type.startsWith("skill") )
   let skillso = []
   for (let i = 0; i < skills.length; i++) {
       const elm = skills[i];
       skillso[i] = `${elm.type.slice(6)} = ${elm.amount}`
    }
    document.body.innerHTML += `<div class="graph-container">
    <div class="graph-title">Skills %</div>
    <div class="chart-wrapper"><svg id="chart" width="1000" height="350" viewBox="0 0 1000 350" preserveAspectRatio="xMidYMid meet"></svg></div>
    </div>`
    
// parse data
const data = skillso.map(item => {
  const [name, value] = item.split('=');
  return {
    name: name.trim(),
    value: Number(value.trim())
  };
});

const svg = document.getElementById("chart");

const width = 1000;
const height = 350;
const padding = 40;

const barWidth = (width - padding * 2) / data.length;

// max value
const max = Math.max(...data.map(d => d.value));

data.forEach((d, i) => {
  const barHeight = (d.value / max) * (height - padding * 2);

  const x = padding + i * barWidth;
  const y = height - padding - barHeight;

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
const ty = height - padding + 20;

text.setAttribute("x", tx);
text.setAttribute("y", ty);
text.setAttribute("text-anchor", "middle");
text.setAttribute("class", "label");

text.textContent = d.name;

svg.appendChild(text);

  // value
  const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  valueText.setAttribute("x", x + barWidth / 2);
  valueText.setAttribute("y", y - 10);
  valueText.setAttribute("class", "value");
  valueText.textContent = d.value;

  svg.appendChild(valueText);
});

  
}


export function progress(info) {
  let arr = info.data.transaction.map(elm => ({
    name : elm.object.name ,
    amount : elm.amount
  }))
  arr = arr.filter((elm)=>{
    return !elm.name.startsWith("quest")
  })
   
 
  createBarChart(arr)
}




function createBarChart(data) {
   document.body.innerHTML += `<div class="graph-container"><div class="graph-title">Projects Progress</div><div class="chart-wrapper"><svg id="progress-chart" class="sparkline-chart" width="1000" height="280" viewBox="0 0 1000 280" preserveAspectRatio="xMidYMid meet"></svg></div></div>`
  const svg = document.getElementById("progress-chart");

  // reset svg
  svg.innerHTML = "";

   const width = 1000;
   const height = 280;
   const padding = { top: 30, right: 40, bottom: 80, left: 40 };
   const plotWidth = width - padding.left - padding.right;
   const plotHeight = height - padding.top - padding.bottom;

   const maxAmount = Math.max(...data.map(d => d.amount));
   const minAmount = 0;
   const sparklineSpacing = plotWidth / (data.length - 1 || 1);

  // ====== CREATE GRADIENT ======
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  gradient.setAttribute("id", "sparklineGradient");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "0%");
  gradient.setAttribute("y2", "100%");
  
  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "rgba(0, 255, 0, 0.4)");
  
  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "rgba(0, 255, 0, 0.05)");
  
  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);

  // ====== BUILD SPARKLINE PATH ======
  let pathData = `M ${padding.left} ${padding.top + plotHeight - ((data[0]?.amount || 0 - minAmount) / (maxAmount - minAmount || 1)) * plotHeight}`;
  
  data.forEach((item, index) => {
    const x = padding.left + index * sparklineSpacing;
    const y = padding.top + plotHeight - ((item.amount - minAmount) / (maxAmount - minAmount || 1)) * plotHeight;
    pathData += ` L ${x} ${y}`;
  });

  // ====== DRAW AREA UNDER SPARKLINE ======
  let areaPath = pathData + ` L ${padding.left + (data.length - 1) * sparklineSpacing} ${padding.top + plotHeight} L ${padding.left} ${padding.top + plotHeight} Z`;
  
  const area = document.createElementNS("http://www.w3.org/2000/svg", "path");
  area.setAttribute("d", areaPath);
  area.setAttribute("fill", "url(#sparklineGradient)");
  area.setAttribute("class", "sparkline-area");
  svg.appendChild(area);

  // ====== DRAW SPARKLINE ======
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  line.setAttribute("d", pathData);
  line.setAttribute("stroke", "var(--accent)");
  line.setAttribute("stroke-width", "2.5");
  line.setAttribute("fill", "none");
  line.setAttribute("stroke-linecap", "round");
  line.setAttribute("stroke-linejoin", "round");
  line.setAttribute("class", "sparkline");
  svg.appendChild(line);

  // ====== DRAW DATA POINTS ======
  data.forEach((item, index) => {
    const x = padding.left + index * sparklineSpacing;
    const y = padding.top + plotHeight - ((item.amount - minAmount) / (maxAmount - minAmount || 1)) * plotHeight;

    // Point circle
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "3.5");
    circle.setAttribute("fill", "var(--accent)");
    circle.setAttribute("class", "sparkline-point");
    circle.setAttribute("data-value", (item.amount));
    circle.setAttribute("data-name", item.name);
    circle.style.cursor = "pointer";
    svg.appendChild(circle);

    // ====== VALUE LABEL ======
    const valueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueLabel.setAttribute("x", x);
    valueLabel.setAttribute("y", y - 12);
    valueLabel.setAttribute("text-anchor", "middle");
    valueLabel.setAttribute("class", "sparkline-value");
    valueLabel.textContent = (Math.round(Number(item.amount)/1000)) + "KB";
    svg.appendChild(valueLabel);

    // Tooltip on hover
    circle.addEventListener("mouseenter", function() {
      circle.setAttribute("r", "5");
      
      const tooltip = document.createElementNS("http://www.w3.org/2000/svg", "text");
      tooltip.setAttribute("x", x);
      tooltip.setAttribute("y", y - 15);
      tooltip.setAttribute("text-anchor", "middle");
      tooltip.setAttribute("class", "sparkline-tooltip");
      tooltip.setAttribute("id", `tooltip-${index}`);
      tooltip.textContent = Math.round(item.amount);
      svg.appendChild(tooltip);
    });

    circle.addEventListener("mouseleave", function() {
      circle.setAttribute("r", "3.5");
      const tooltip = document.getElementById(`tooltip-${index}`);
      if (tooltip) tooltip.remove();
    });

    // ====== VERTICAL PROJECT NAMES ======
    const nameText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    nameText.setAttribute("x", x);
    nameText.setAttribute("y", padding.top + plotHeight + 25);
    nameText.setAttribute("text-anchor", "middle");
    nameText.setAttribute("class", "sparkline-name");
    nameText.setAttribute("transform", `rotate(90, ${x}, ${padding.top + plotHeight + 25})`);
    nameText.textContent = item.name;
    svg.appendChild(nameText);
  });

  // ====== GRID LINES (SUBTLE) ======
  const gridColor = "rgba(0, 255, 0, 0.08)";
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (plotHeight / 4) * i;
    const gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    gridLine.setAttribute("x1", padding.left);
    gridLine.setAttribute("y1", y);
    gridLine.setAttribute("x2", width - padding.right);
    gridLine.setAttribute("y2", y);
    gridLine.setAttribute("stroke", gridColor);
    gridLine.setAttribute("stroke-width", "1");
    gridLine.setAttribute("stroke-dasharray", "4,4");
    svg.insertBefore(gridLine, svg.firstChild.nextSibling);
  }
}


