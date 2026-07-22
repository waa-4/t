(() => {
"use strict";
const $=s=>document.querySelector(s);
const state={
  projectName:"my-visual-project",
  blocks:[],
  code:{html:"",css:"",js:""},
  manual:{html:false,css:false,js:false}
};

const groups={
  "Page":["heading","hgroup","paragraph","button","image","link","input","textArea","list","divider","container","card","spacer","audio","video"],
  "Layout & Shapes":["positionedBox","positionedCircle","positionStyle"],
  "Style":["pageStyle","classStyle","idStyle","hoverStyle","animation","customCss"],
  "Game Maker":["gameStage","cubeBlasterStarter"],
  "JavaScript":["alertEvent","changeTextEvent","toggleEvent","changeStyleEvent","counter","randomNumber","timer","keyboardEvent","consoleLog","variable","condition","loop","functionBlock","customJs"],
  "Advanced":["customHtml","comment"]
};

const defs={
 heading:{title:"Heading",desc:"Creates an h1–h6 heading.",f:[["text","Text","text","Hello world"],["level","Level","select","1",["1","2","3","4","5","6"]],["id","ID","text",""],["className","Class","text",""]]},
 hgroup:{title:"Heading Group",desc:"Groups a heading and subtitle using the HTML hgroup element.",f:[["title","Title","text","Game title"],["subtitle","Subtitle","text","A short subtitle"],["level","Heading level","select","1",["1","2","3","4","5","6"]],["id","ID","text",""]]},
 paragraph:{title:"Paragraph",desc:"Creates normal paragraph text.",f:[["text","Text","textarea","This is a paragraph."],["id","ID","text",""],["className","Class","text",""]]},
 button:{title:"Button",desc:"Creates a clickable button.",f:[["text","Text","text","Click me"],["id","ID","text","myButton"],["className","Class","text",""]]},
 image:{title:"Image",desc:"Shows an image.",f:[["src","URL or path","text","https://placehold.co/400x220"],["alt","Description","text","Image"],["width","Width","number","400"],["className","Class","text",""]]},
 link:{title:"Link",desc:"Creates a clickable link.",f:[["text","Text","text","Open website"],["href","Address","text","https://example.com"],["newTab","New tab","select","yes",["yes","no"]],["className","Class","text",""]]},
 input:{title:"Input",desc:"Creates a text, number, password, or color input.",f:[["type","Type","select","text",["text","number","password","color","date","checkbox"]],["id","ID","text","myInput"],["placeholder","Placeholder","text","Type here"],["className","Class","text",""]]},
 textArea:{title:"Text Area",desc:"Creates a multi-line input box.",f:[["id","ID","text","myTextArea"],["placeholder","Placeholder","text","Write something"],["rows","Rows","number","4"],["className","Class","text",""]]},
 list:{title:"List",desc:"Creates a bullet or numbered list. Put one item per line.",f:[["items","Items","textarea","Pigeon\nTung\nToe fungus"],["kind","Kind","select","ul",["ul","ol"]],["className","Class","text",""]]},
 divider:{title:"Divider",desc:"Creates a horizontal line.",f:[["className","Class","text",""]]},
 container:{title:"Container",desc:"Creates a section with custom inner HTML.",f:[["content","Inner HTML","textarea","<p>Inside a container.</p>"],["tag","Tag","select","section",["div","section","main","article","header","footer"]],["id","ID","text",""],["className","Class","text","card"]]},
 card:{title:"Card",desc:"Creates a ready-made card with a title and text.",f:[["title","Title","text","Card title"],["text","Text","textarea","Card content"],["className","Class","text","card"]]},
 spacer:{title:"Spacer",desc:"Adds vertical empty space.",f:[["height","Height","number","30"]]},
 audio:{title:"Audio",desc:"Adds an HTML audio player.",f:[["src","Audio path or URL","text","song.mp3"],["controls","Controls","select","yes",["yes","no"]],["loop","Loop","select","no",["yes","no"]]]},
 video:{title:"Video",desc:"Adds an HTML video player.",f:[["src","Video path or URL","text","video.mp4"],["width","Width","number","500"],["controls","Controls","select","yes",["yes","no"]]]},

 positionedBox:{title:"Positioned Cube / Box",desc:"Creates a resizable, recolorable box at an exact X and Y position.",f:[["id","ID","text","cube"],["x","X","number","100"],["y","Y","number","100"],["width","Width","number","64"],["height","Height","number","64"],["color","Fill color","color","#38bdf8"],["outline","Outline color","color","#ffffff"],["outlineWidth","Outline width","number","0"],["radius","Corner radius","number","0"],["rotation","Rotation","number","0"],["opacity","Opacity 0-1","number","1"],["layer","Layer / z-index","number","1"]]},
 positionedCircle:{title:"Positioned Circle",desc:"Creates a circle or oval with exact X/Y, size, color, and layer.",f:[["id","ID","text","circle"],["x","X","number","200"],["y","Y","number","120"],["width","Width","number","48"],["height","Height","number","48"],["color","Fill color","color","#f97316"],["outline","Outline color","color","#ffffff"],["outlineWidth","Outline width","number","0"],["opacity","Opacity 0-1","number","1"],["layer","Layer / z-index","number","2"]]},
 positionStyle:{title:"Position Existing Element",desc:"Gives any element exact X/Y positioning, size, rotation, and layer.",f:[["selector","CSS selector","text","#myButton"],["position","Position type","select","absolute",["absolute","fixed","relative"]],["x","X","number","100"],["y","Y","number","100"],["width","Width (blank = unchanged)","text",""] ,["height","Height (blank = unchanged)","text",""] ,["rotation","Rotation","number","0"],["layer","Layer / z-index","number","1"]]},

 gameStage:{title:"Game Stage",desc:"Creates a clipped game area for positioned objects.",f:[["id","ID","text","gameStage"],["width","Width","number","800"],["height","Height","number","450"],["background","Background","color","#071426"],["outline","Outline","color","#ffffff"]]},
 cubeBlasterStarter:{title:"Cube Blaster Starter",desc:"Adds a complete playable cube shooter with easing movement, smooth camera, bullets, enemies, health, and score.",f:[["stageId","Stage ID","text","cubeBlaster"],["width","Width","number","800"],["height","Height","number","450"],["playerColor","Player color","color","#38bdf8"],["enemyColor","Enemy color","color","#ef4444"],["background","Background","color","#071426"],["moveSpeed","Movement acceleration","number","0.7"],["friction","Friction 0-1","number","0.86"],["cameraEase","Camera easing 0-1","number","0.08"],["spawnMs","Enemy spawn milliseconds","number","1100"]]},

 pageStyle:{title:"Page Style",desc:"Styles the whole body.",f:[["background","Background","color","#101820"],["color","Text color","color","#ffffff"],["font","Font","text","Arial, sans-serif"],["padding","Padding","text","24px"]]},
 classStyle:{title:"Class Style",desc:"Styles every element using a class.",f:[["selector","Class name","text","card"],["background","Background","text","#1b2a34"],["color","Text color","text","#ffffff"],["padding","Padding","text","16px"],["radius","Radius","text","12px"],["extra","Extra CSS","textarea","margin: 12px 0;"]]},
 idStyle:{title:"ID Style",desc:"Styles one element by ID.",f:[["selector","ID","text","myButton"],["code","CSS properties","textarea","background: cyan;\ncolor: black;"]]},
 hoverStyle:{title:"Hover Style",desc:"Changes an element while the mouse is over it.",f:[["selector","CSS selector","text","#myButton"],["code","Hover CSS","textarea","transform: scale(1.1);\nfilter: brightness(1.2);"]]},
 animation:{title:"Animation",desc:"Creates a simple repeating animation.",f:[["name","Name","text","wobble"],["selector","CSS selector","text",".card"],["from","Start CSS","textarea","transform: rotate(-2deg);"],["to","End CSS","textarea","transform: rotate(2deg);"],["duration","Duration","text","1s"]]},
 customCss:{title:"Custom CSS",desc:"Write any CSS.",f:[["code","CSS","textarea",".special {\n  border: 2px solid cyan;\n}"]]},

 alertEvent:{title:"Button Alert",desc:"Shows an alert when an element is clicked.",f:[["targetId","Clicked element ID","text","myButton"],["message","Message","text","It works!"]]},
 changeTextEvent:{title:"Change Text",desc:"Changes text after a click.",f:[["buttonId","Button ID","text","myButton"],["targetId","Target ID","text","result"],["newText","New text","text","Changed!"]]},
 toggleEvent:{title:"Toggle Visibility",desc:"Shows and hides an element when a button is clicked.",f:[["buttonId","Button ID","text","myButton"],["targetId","Target ID","text","secret"]]},
 changeStyleEvent:{title:"Change Style",desc:"Changes one CSS property after a click.",f:[["buttonId","Button ID","text","myButton"],["targetId","Target ID","text","result"],["property","CSS property","text","color"],["value","New value","text","red"]]},
 counter:{title:"Click Counter",desc:"Counts button clicks and displays the total.",f:[["buttonId","Button ID","text","myButton"],["targetId","Display ID","text","count"],["start","Starting number","number","0"]]},
 randomNumber:{title:"Random Number",desc:"Writes a random whole number after a click.",f:[["buttonId","Button ID","text","myButton"],["targetId","Display ID","text","result"],["min","Minimum","number","1"],["max","Maximum","number","100"]]},
 timer:{title:"Repeating Timer",desc:"Runs JavaScript repeatedly.",f:[["milliseconds","Every milliseconds","number","1000"],["code","Code","textarea","console.log('tick');"]]},
 keyboardEvent:{title:"Keyboard Event",desc:"Runs code when a chosen key is pressed.",f:[["key","Key","text","e"],["code","Code","textarea","alert('You pressed E');"]]},
 consoleLog:{title:"Console Log",desc:"Prints a message to the browser console.",f:[["message","Message or expression","text","'Hello console'"]]},
 variable:{title:"Variable",desc:"Stores a reusable value.",f:[["kind","Kind","select","let",["let","const","var"]],["name","Name","text","score"],["value","Value","text","0"]]},
 condition:{title:"Condition",desc:"Runs code only if a condition is true.",f:[["condition","Condition","text","score >= 10"],["code","Code","textarea","console.log('You win!');"]]},
 loop:{title:"Loop",desc:"Repeats code several times.",f:[["count","Count","number","5"],["code","Code","textarea","console.log(i);"]]},
 functionBlock:{title:"Function",desc:"Creates a reusable named function.",f:[["name","Name","text","doThing"],["parameters","Parameters","text",""],["code","Code","textarea","console.log('Thing done');"],["callNow","Call immediately","select","no",["yes","no"]]]},
 customJs:{title:"Custom JavaScript",desc:"Write any JavaScript.",f:[["code","JavaScript","textarea","console.log('Custom code running');"]]},

 customHtml:{title:"Custom HTML",desc:"Write any HTML.",f:[["code","HTML","textarea","<div class=\"special\">Custom HTML</div>"]]},
 comment:{title:"Comment",desc:"Adds an invisible code note.",f:[["text","Comment","text","Explain this section"]]}
};

const uid=()=>crypto.randomUUID?.()||Date.now()+"-"+Math.random();
function make(type){return{id:uid(),type,values:Object.fromEntries(defs[type].f.map(([k,,,d])=>[k,d]))}}
function attr(v){return`${v.id?` id="${esc(v.id)}"`:""}${v.className?` class="${esc(v.className)}"`:""}`}
function esc(s){return String(s??"").replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;")}

function buildLibrary(filter=""){
  const box=$("#blockLibrary");box.innerHTML="";
  for(const [group,types] of Object.entries(groups)){
    const matches=types.filter(t=>defs[t]&&(defs[t].title+" "+defs[t].desc).toLowerCase().includes(filter.toLowerCase()));
    if(!matches.length)continue;
    const section=document.createElement("section");section.className="category";
    section.innerHTML=`<h3>${group}</h3>`;
    matches.forEach(type=>{const b=document.createElement("button");b.textContent=defs[type].title;b.title=defs[type].desc;b.onclick=()=>{state.blocks.push(make(type));render();generate()};section.append(b)});
    box.append(section);
  }
}

function field(block,spec){
  const[k,label,type,,options]=spec,w=document.createElement("div");w.className="field"+(type==="textarea"?" full":"");
  const l=document.createElement("label");l.textContent=label;let i;
  if(type==="textarea")i=document.createElement("textarea");
  else if(type==="select"){i=document.createElement("select");options.forEach(o=>{const op=document.createElement("option");op.value=o;op.textContent=o;i.append(op)})}
  else{i=document.createElement("input");i.type=type}
  i.value=block.values[k]??"";i.oninput=()=>{block.values[k]=i.value;generate()};w.append(l,i);return w
}
function render(){
  const list=$("#blockList");list.innerHTML="";$("#emptyState").hidden=state.blocks.length>0;
  state.blocks.forEach((block,index)=>{
    const n=$("#blockTemplate").content.firstElementChild.cloneNode(true),d=defs[block.type];
    n.querySelector(".block-title").textContent=d.title;n.querySelector(".explanation").textContent=d.desc;
    d.f.forEach(s=>n.querySelector(".fields").append(field(block,s)));
    n.querySelector("[data-action=delete]").onclick=()=>{state.blocks.splice(index,1);render();generate()};
    n.querySelector("[data-action=copy]").onclick=()=>{const c=structuredClone(block);c.id=uid();state.blocks.splice(index+1,0,c);render();generate()};
    n.querySelector("[data-action=up]").onclick=()=>move(index,-1);
    n.querySelector("[data-action=down]").onclick=()=>move(index,1);
    list.append(n);
  })
}
function move(i,d){const j=i+d;if(j<0||j>=state.blocks.length)return;[state.blocks[i],state.blocks[j]]=[state.blocks[j],state.blocks[i]];render();generate()}

function generated(){
 const H=[],C=[],J=[];
 for(const b of state.blocks){const v=b.values;
  switch(b.type){
   case"heading":H.push(`<h${v.level}${attr(v)}>${v.text}</h${v.level}>`);break;
   case"hgroup":H.push(`<hgroup${v.id?` id="${esc(v.id)}"`:""}>\n  <h${v.level}>${v.title}</h${v.level}>\n  <p>${v.subtitle}</p>\n</hgroup>`);break;
   case"paragraph":H.push(`<p${attr(v)}>${v.text}</p>`);break;
   case"button":H.push(`<button${attr(v)}>${v.text}</button>`);break;
   case"image":H.push(`<img src="${esc(v.src)}" alt="${esc(v.alt)}" width="${Number(v.width)||400}"${v.className?` class="${esc(v.className)}"`:""}>`);break;
   case"link":H.push(`<a href="${esc(v.href)}"${v.newTab==="yes"?' target="_blank" rel="noopener"':""}${v.className?` class="${esc(v.className)}"`:""}>${v.text}</a>`);break;
   case"input":H.push(`<input type="${esc(v.type)}" id="${esc(v.id)}" placeholder="${esc(v.placeholder)}"${v.className?` class="${esc(v.className)}"`:""}>`);break;
   case"textArea":H.push(`<textarea id="${esc(v.id)}" rows="${Number(v.rows)||4}" placeholder="${esc(v.placeholder)}"${v.className?` class="${esc(v.className)}"`:""}></textarea>`);break;
   case"list":H.push(`<${v.kind}${v.className?` class="${esc(v.className)}"`:""}>\n${v.items.split("\n").filter(Boolean).map(x=>`  <li>${x}</li>`).join("\n")}\n</${v.kind}>`);break;
   case"divider":H.push(`<hr${v.className?` class="${esc(v.className)}"`:""}>`);break;
   case"container":H.push(`<${v.tag}${attr(v)}>\n  ${v.content}\n</${v.tag}>`);break;
   case"card":H.push(`<section class="${esc(v.className)}">\n  <h2>${v.title}</h2>\n  <p>${v.text}</p>\n</section>`);break;
   case"spacer":H.push(`<div style="height:${Number(v.height)||0}px" aria-hidden="true"></div>`);break;
   case"audio":H.push(`<audio src="${esc(v.src)}"${v.controls==="yes"?" controls":""}${v.loop==="yes"?" loop":""}></audio>`);break;
   case"video":H.push(`<video src="${esc(v.src)}" width="${Number(v.width)||500}"${v.controls==="yes"?" controls":""}></video>`);break;
   case"positionedBox":H.push(`<div id="${esc(v.id)}" aria-label="Positioned box"></div>`);C.push(`#${v.id} { position:absolute; left:${Number(v.x)||0}px; top:${Number(v.y)||0}px; width:${Number(v.width)||0}px; height:${Number(v.height)||0}px; background:${v.color}; border:${Number(v.outlineWidth)||0}px solid ${v.outline}; border-radius:${Number(v.radius)||0}px; transform:rotate(${Number(v.rotation)||0}deg); opacity:${Math.max(0,Math.min(1,Number(v.opacity)||0))}; z-index:${Number(v.layer)||0}; box-sizing:border-box; }`);break;
   case"positionedCircle":H.push(`<div id="${esc(v.id)}" aria-label="Positioned circle"></div>`);C.push(`#${v.id} { position:absolute; left:${Number(v.x)||0}px; top:${Number(v.y)||0}px; width:${Number(v.width)||0}px; height:${Number(v.height)||0}px; background:${v.color}; border:${Number(v.outlineWidth)||0}px solid ${v.outline}; border-radius:50%; opacity:${v.opacity}; z-index:${Number(v.layer)||0}; box-sizing:border-box; }`);break;
   case"positionStyle":C.push(`${v.selector} { position:${v.position}; left:${Number(v.x)||0}px; top:${Number(v.y)||0}px; ${v.width?`width:${v.width}px;`:""} ${v.height?`height:${v.height}px;`:""} transform:rotate(${Number(v.rotation)||0}deg); z-index:${Number(v.layer)||0}; }`);break;
   case"gameStage":H.push(`<div id="${esc(v.id)}" class="vcs-game-stage"></div>`);C.push(`#${v.id} { position:relative; width:${Number(v.width)||800}px; height:${Number(v.height)||450}px; max-width:100%; overflow:hidden; background:${v.background}; border:1px solid ${v.outline}; box-sizing:border-box; }`);break;
   case"cubeBlasterStarter":{const sid=esc(v.stageId);H.push(`<section class="vcs-cube-game-wrap"><div class="vcs-game-hud"><span>Health: <b id="${sid}Health">100</b></span><span>Score: <b id="${sid}Score">0</b></span></div><div id="${sid}" class="vcs-cube-blaster" tabindex="0"><div id="${sid}World" class="vcs-cube-world"><div id="${sid}Player" class="vcs-cube-player"></div></div></div><p class="vcs-game-help">WASD / arrow keys to move. Aim with the mouse and click to shoot.</p></section>`);C.push(`#${sid}{position:relative;width:${Number(v.width)||800}px;height:${Number(v.height)||450}px;max-width:100%;overflow:hidden;background:${v.background};border:1px solid currentColor;box-sizing:border-box;cursor:crosshair;outline:none}.vcs-cube-game-wrap{width:max-content;max-width:100%}.vcs-game-hud{display:flex;justify-content:space-between;margin-bottom:6px}.vcs-cube-world{position:absolute;left:0;top:0;width:2400px;height:1600px;transform-origin:0 0}.vcs-cube-player{position:absolute;width:42px;height:42px;background:${v.playerColor};left:1180px;top:780px}.vcs-enemy{position:absolute;width:36px;height:36px;background:${v.enemyColor}}.vcs-bullet{position:absolute;width:10px;height:10px;border-radius:50%;background:#fff}.vcs-game-help{margin-top:6px;font-size:14px}`);J.push(`(()=>{const stage=document.getElementById(${JSON.stringify(v.stageId)}),world=document.getElementById(${JSON.stringify(v.stageId+'World')}),playerEl=document.getElementById(${JSON.stringify(v.stageId+'Player')}),healthEl=document.getElementById(${JSON.stringify(v.stageId+'Health')}),scoreEl=document.getElementById(${JSON.stringify(v.stageId+'Score')});if(!stage||!world||!playerEl)return;const keys=new Set(),bullets=[],enemies=[];let mouse={x:0,y:0},player={x:1180,y:780,vx:0,vy:0,hp:100},camera={x:0,y:0},score=0,last=performance.now(),spawnClock=0;stage.focus();addEventListener('keydown',e=>keys.add(e.key.toLowerCase()));addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));stage.addEventListener('mousemove',e=>{const r=stage.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});stage.addEventListener('click',()=>{stage.focus();const px=player.x+21,py=player.y+21,wx=mouse.x+camera.x,wy=mouse.y+camera.y,a=Math.atan2(wy-py,wx-px),b={x:px,y:py,vx:Math.cos(a)*10,vy:Math.sin(a)*10,el:document.createElement('div')};b.el.className='vcs-bullet';world.append(b.el);bullets.push(b)});function spawn(){const edge=Math.floor(Math.random()*4),e={x:0,y:0,hp:2,el:document.createElement('div')};if(edge===0){e.x=camera.x-50;e.y=camera.y+Math.random()*stage.clientHeight}else if(edge===1){e.x=camera.x+stage.clientWidth+50;e.y=camera.y+Math.random()*stage.clientHeight}else if(edge===2){e.x=camera.x+Math.random()*stage.clientWidth;e.y=camera.y-50}else{e.x=camera.x+Math.random()*stage.clientWidth;e.y=camera.y+stage.clientHeight+50}e.el.className='vcs-enemy';world.append(e.el);enemies.push(e)}function hit(a,b,aw,ah,bw,bh){return a.x<b.x+bw&&a.x+aw>b.x&&a.y<b.y+bh&&a.y+ah>b.y}function frame(now){const dt=Math.min(2,(now-last)/16.67);last=now;let ix=0,iy=0;if(keys.has('a')||keys.has('arrowleft'))ix--;if(keys.has('d')||keys.has('arrowright'))ix++;if(keys.has('w')||keys.has('arrowup'))iy--;if(keys.has('s')||keys.has('arrowdown'))iy++;player.vx+=ix*${Number(v.moveSpeed)||0.7}*dt;player.vy+=iy*${Number(v.moveSpeed)||0.7}*dt;player.vx*=${Number(v.friction)||0.86};player.vy*=${Number(v.friction)||0.86};player.x=Math.max(0,Math.min(2358,player.x+player.vx*dt));player.y=Math.max(0,Math.min(1558,player.y+player.vy*dt));camera.x+=(player.x-stage.clientWidth/2-camera.x)*${Number(v.cameraEase)||0.08};camera.y+=(player.y-stage.clientHeight/2-camera.y)*${Number(v.cameraEase)||0.08};camera.x=Math.max(0,Math.min(2400-stage.clientWidth,camera.x));camera.y=Math.max(0,Math.min(1600-stage.clientHeight,camera.y));world.style.transform='translate('+-camera.x+'px,'+-camera.y+'px)';playerEl.style.transform='translate('+player.x+'px,'+player.y+'px)';spawnClock+=dt*16.67;if(spawnClock>${Number(v.spawnMs)||1100}){spawnClock=0;spawn()}for(let i=bullets.length-1;i>=0;i--){const b=bullets[i];b.x+=b.vx*dt;b.y+=b.vy*dt;b.el.style.transform='translate('+b.x+'px,'+b.y+'px)';if(b.x<0||b.y<0||b.x>2400||b.y>1600){b.el.remove();bullets.splice(i,1);continue}for(let j=enemies.length-1;j>=0;j--){const e=enemies[j];if(hit(b,e,10,10,36,36)){e.hp--;b.el.remove();bullets.splice(i,1);if(e.hp<=0){e.el.remove();enemies.splice(j,1);score++;scoreEl.textContent=score}break}}}for(let i=enemies.length-1;i>=0;i--){const e=enemies[i],a=Math.atan2(player.y-e.y,player.x-e.x);e.x+=Math.cos(a)*1.45*dt;e.y+=Math.sin(a)*1.45*dt;e.el.style.transform='translate('+e.x+'px,'+e.y+'px)';if(hit(player,e,42,42,36,36)){player.hp-=12;e.el.remove();enemies.splice(i,1);healthEl.textContent=Math.max(0,player.hp);if(player.hp<=0){healthEl.textContent='0 — refresh to retry';return}}}requestAnimationFrame(frame)}requestAnimationFrame(frame)})();`);break;}
   case"pageStyle":C.push(`body {\n  background:${v.background};\n  color:${v.color};\n  font-family:${v.font};\n  padding:${v.padding};\n}`);break;
   case"classStyle":C.push(`.${v.selector.replace(/^\./,"")} {\n  background:${v.background};\n  color:${v.color};\n  padding:${v.padding};\n  border-radius:${v.radius};\n  ${v.extra}\n}`);break;
   case"idStyle":C.push(`#${v.selector.replace(/^#/,"")} {\n  ${v.code}\n}`);break;
   case"hoverStyle":C.push(`${v.selector}:hover {\n  ${v.code}\n}`);break;
   case"animation":C.push(`@keyframes ${v.name} {\n  from { ${v.from} }\n  to { ${v.to} }\n}\n${v.selector} { animation:${v.name} ${v.duration} ease-in-out infinite alternate; }`);break;
   case"customCss":C.push(v.code);break;
   case"alertEvent":J.push(`document.getElementById(${JSON.stringify(v.targetId)})?.addEventListener("click",()=>{\n  alert(${JSON.stringify(v.message)});\n});`);break;
   case"changeTextEvent":J.push(`document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener("click",()=>{\n  const target=document.getElementById(${JSON.stringify(v.targetId)});\n  if(target) target.textContent=${JSON.stringify(v.newText)};\n});`);break;
   case"toggleEvent":J.push(`document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener("click",()=>{\n  const target=document.getElementById(${JSON.stringify(v.targetId)});\n  if(target) target.hidden=!target.hidden;\n});`);break;
   case"changeStyleEvent":J.push(`document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener("click",()=>{\n  const target=document.getElementById(${JSON.stringify(v.targetId)});\n  if(target) target.style[${JSON.stringify(v.property)}]=${JSON.stringify(v.value)};\n});`);break;
   case"counter":J.push(`let clickCount=${Number(v.start)||0};\ndocument.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener("click",()=>{\n  clickCount++;\n  const target=document.getElementById(${JSON.stringify(v.targetId)});\n  if(target) target.textContent=clickCount;\n});`);break;
   case"randomNumber":J.push(`document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener("click",()=>{\n  const n=Math.floor(Math.random()*(${Number(v.max)||100}-${Number(v.min)||1}+1))+${Number(v.min)||1};\n  const target=document.getElementById(${JSON.stringify(v.targetId)});\n  if(target) target.textContent=n;\n});`);break;
   case"timer":J.push(`setInterval(()=>{\n  ${v.code}\n},${Number(v.milliseconds)||1000});`);break;
   case"keyboardEvent":J.push(`document.addEventListener("keydown",event=>{\n  if(event.key.toLowerCase()===${JSON.stringify(v.key.toLowerCase())}) {\n    ${v.code}\n  }\n});`);break;
   case"consoleLog":J.push(`console.log(${v.message});`);break;
   case"variable":J.push(`${v.kind} ${v.name}=${v.value};`);break;
   case"condition":J.push(`if(${v.condition}) {\n  ${v.code}\n}`);break;
   case"loop":J.push(`for(let i=0;i<${Number(v.count)||0};i++) {\n  ${v.code}\n}`);break;
   case"functionBlock":J.push(`function ${v.name}(${v.parameters}) {\n  ${v.code}\n}\n${v.callNow==="yes"?`${v.name}();`:""}`);break;
   case"customJs":J.push(v.code);break;
   case"customHtml":H.push(v.code);break;
   case"comment":H.push(`<!-- ${v.text} -->`);break;
  }
 }
 return{html:H.join("\n\n"),css:C.join("\n\n"),js:J.join("\n\n")}
}
function generate(){
 const g=generated();
 for(const lang of["html","css","js"]){
   if(!state.manual[lang]){state.code[lang]=g[lang];$("#"+lang+"Code").value=g[lang]}
 }
 preview();saveLocal();updateModeLabel();
}
function doc(){return`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${state.code.css}</style></head><body>
${state.code.html}
<script>
document.addEventListener("DOMContentLoaded",()=> {
try {
${state.code.js}
} catch(error) {
  document.body.insertAdjacentHTML("beforeend","<pre style='background:#300;color:#fff;padding:12px'>JavaScript error: "+error.message.replaceAll("<","&lt;")+"</pre>");
}
});
<\/script></body></html>`}
function preview(){$("#previewStatus").textContent="Updating…";$("#previewFrame").srcdoc=doc();setTimeout(()=>$("#previewStatus").textContent="Live",100)}
function activeLang(){return $(".tab.active").dataset.lang}
function updateModeLabel(){const l=activeLang();$("#modeLabel").textContent=`${l==="js"?"JavaScript":l.toUpperCase()} — ${state.manual[l]?"manual edits preserved":"generated from blocks"}`}
function saveLocal(){localStorage.setItem("vcs.v3",JSON.stringify(state))}
function load(p){if(!p||!Array.isArray(p.blocks))throw Error("Invalid project");Object.assign(state,p);state.code||=(generated());state.manual||={html:false,css:false,js:false};render();for(const l of["html","css","js"])$("#"+l+"Code").value=state.code[l]||"";preview();updateModeLabel()}
function download(name,blob){const a=document.createElement("a"),u=URL.createObjectURL(blob);a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
function crcTable(){const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t}const CT=crcTable();
function crc(bytes){let c=0xffffffff;for(const b of bytes)c=CT[(c^b)&255]^(c>>>8);return(c^0xffffffff)>>>0}
const u16=n=>[n&255,n>>>8&255],u32=n=>[n&255,n>>>8&255,n>>>16&255,n>>>24&255];
function zip(files){const e=new TextEncoder(),locals=[],centrals=[];let off=0;for(const f of files){const n=e.encode(f.name),d=e.encode(f.content),c=crc(d);
 const l=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0),...u16(0),...u16(0),...u16(0),...u32(c),...u32(d.length),...u32(d.length),...u16(n.length),...u16(0),...n,...d]);locals.push(l);
 const ce=new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0),...u16(0),...u16(0),...u16(0),...u32(c),...u32(d.length),...u32(d.length),...u16(n.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(off),...n]);centrals.push(ce);off+=l.length}
 const cs=centrals.reduce((a,b)=>a+b.length,0),end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(cs),...u32(off),...u16(0)]);
 return new Blob([...locals,...centrals,end],{type:"application/zip"})}

$("#blockSearch").oninput=e=>buildLibrary(e.target.value);
$("#clearBtn").onclick=()=>{if(confirm("Remove all visual blocks?")){state.blocks=[];render();generate()}};
$("#refreshBtn").onclick=preview;
$("#openPreviewBtn").onclick=()=>{const u=URL.createObjectURL(new Blob([doc()],{type:"text/html"}));window.open(u,"_blank");setTimeout(()=>URL.revokeObjectURL(u),10000)};
$("#newBtn").onclick=()=>{if(!confirm("Start a new project?"))return;state.projectName=prompt("Project name:","my-project")||"my-project";state.blocks=[];state.code={html:"",css:"",js:""};state.manual={html:false,css:false,js:false};render();generate()};
$("#saveBtn").onclick=()=>download(state.projectName+".visual.json",new Blob([JSON.stringify(state,null,2)],{type:"application/json"}));
$("#openInput").onchange=async e=>{try{load(JSON.parse(await e.target.files[0].text()))}catch(err){alert(err.message)}e.target.value=""};
$("#exportBtn").onclick=()=>download(state.projectName+"-github.zip",zip([
 {name:"index.html",content:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${state.projectName}</title><link rel="stylesheet" href="style.css"></head><body>\n${state.code.html}\n<script src="script.js"><\/script></body></html>`},
 {name:"style.css",content:state.code.css},{name:"script.js",content:`document.addEventListener("DOMContentLoaded",()=>{\n${state.code.js}\n});`},
 {name:"README.md",content:`# ${state.projectName}\n\nExported from Visual Code Studio v3.`}
]));
$(".tabs").onclick=e=>{const t=e.target.closest(".tab");if(!t)return;document.querySelectorAll(".tab,.editor").forEach(x=>x.classList.remove("active"));t.classList.add("active");$("#"+t.dataset.lang+"Code").classList.add("active");updateModeLabel()};
for(const l of["html","css","js"])$("#"+l+"Code").oninput=e=>{state.code[l]=e.target.value;state.manual[l]=true;preview();saveLocal();updateModeLabel()};
$("#useGeneratedBtn").onclick=()=>{const l=activeLang();state.manual[l]=false;generate()};
$("#copyBtn").onclick=async()=>{await navigator.clipboard.writeText($(".editor.active").value);$("#copyBtn").textContent="Copied";setTimeout(()=>$("#copyBtn").textContent="Copy",800)};

buildLibrary();
try{const s=localStorage.getItem("vcs.v3")||localStorage.getItem("vcs.v2");if(s)load(JSON.parse(s))}catch(error){console.warn("Could not load saved project",error)}
if(!state.blocks.length&&!state.code.html){
 state.blocks=[make("pageStyle"),make("heading"),make("paragraph"),make("button"),make("alertEvent")];
 state.blocks[1].values.text="My first visual website";state.blocks[3].values.id="buns";state.blocks[4].values.targetId="buns";
 render();generate();
}else{render();for(const l of["html","css","js"])$("#"+l+"Code").value=state.code[l]||"";preview()}
})();