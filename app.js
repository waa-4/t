(() => {
"use strict";
const $=s=>document.querySelector(s);
const state={
  projectName:"my-visual-project",
  websiteTitle:"My Website",
  responsive:true,
  assets:[],
  blocks:[],
  code:{html:"",css:"",js:""},
  manual:{html:false,css:false,js:false}
};

const groups={
  "Page":["heading","hgroup","paragraph","button","image","link","input","textArea","list","divider","container","card","spacer","audio","video"],
  "Layout & Shapes":["positionedBox","positionedCircle","positionStyle"],
  "Style":["pageStyle","classStyle","idStyle","hoverStyle","animation","customCss"],
  "Game Assets":["startMenu","gameStage","playerController","mobileJoystick","healthSystem","playerAttack","enemySpawner","cameraFollow","responsiveGame","cubeBlasterStarter"],
  "Wiring":["whenClickedSetImage","whenClickedPlaySound","whenClickedToggle","randomFromList"],
  "Effects":["matrixRain","starsEffect","snowEffect","firefliesEffect","floatingSquaresEffect","gridEffect","scanlinesEffect","noiseEffect","crtEffect","animatedGradientEffect","circuitEffect","hexagonEffect","bubblesEffect"],
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


 startMenu:{title:"Start Menu Template",desc:"Adds a title screen with a Start button that hides the menu and shows a game area.",f:[["title","Game title","text","My Arcade Game"],["subtitle","Subtitle","text","Press Start to play"],["buttonText","Button text","text","START"],["menuId","Menu ID","text","startMenu"],["gameId","Game area ID","text","gameArea"]]},
 playerController:{title:"WASD Player",desc:"Creates a movable player inside a game stage. Connect other systems using the same Player ID.",f:[["stageId","Stage ID","text","gameStage"],["playerId","Player ID","text","player"],["size","Size","number","42"],["color","Color","color","#38bdf8"],["speed","Speed","number","4"]]},
 mobileJoystick:{title:"Mobile Joystick",desc:"Adds a touch joystick connected to a WASD Player by Player ID.",f:[["playerId","Player ID","text","player"],["joystickId","Joystick ID","text","joystick"],["size","Joystick size","number","120"]]},
 healthSystem:{title:"Health System",desc:"Adds health data, a bar, damage and healing events for an element ID.",f:[["targetId","Player or enemy ID","text","player"],["maxHealth","Maximum health","number","100"],["barId","Health bar ID","text","healthBar"],["showBar","Show health bar","select","yes",["yes","no"]]]},
 playerAttack:{title:"Player Attack",desc:"Lets a player aim with the mouse/touch and shoot projectiles. Uses the Player ID and Stage ID.",f:[["stageId","Stage ID","text","gameStage"],["playerId","Player ID","text","player"],["damage","Damage","number","25"],["speed","Projectile speed","number","10"],["cooldown","Cooldown milliseconds","number","220"]]},
 enemySpawner:{title:"Enemy Spawner",desc:"Spawns enemies in a stage and makes them chase a player.",f:[["stageId","Stage ID","text","gameStage"],["playerId","Player ID","text","player"],["enemyClass","Enemy class","text","enemy"],["spawnMs","Spawn every milliseconds","number","1200"],["enemyHealth","Enemy health","number","50"],["enemySpeed","Enemy speed","number","1.4"],["enemyColor","Enemy color","color","#ef4444"]]},
 cameraFollow:{title:"Camera Follow",desc:"Smoothly follows an element inside a larger world.",f:[["stageId","Stage ID","text","gameStage"],["worldId","World ID","text","gameWorld"],["targetId","Target ID","text","player"],["ease","Camera easing 0-1","number","0.08"]]},
 responsiveGame:{title:"Responsive Game Scaling",desc:"Scales a fixed-size game to fit mobile and PC while keeping its proportions.",f:[["stageId","Stage ID","text","gameStage"],["baseWidth","Base width","number","800"],["baseHeight","Base height","number","450"]]},
 whenClickedSetImage:{title:"When Clicked → Random Image",desc:"When an ID is clicked, sets an image to a random item from a list of asset names or URLs.",f:[["buttonId","Clicked ID","text","pigeonButton"],["imageId","Image ID","text","pigeonImage"],["items","Images, one per line","textarea","pigeon1.png\npigeon2.png\npigeon3.png"],["avoidRepeat","Avoid immediate repeat","select","yes",["yes","no"]]]},
 whenClickedPlaySound:{title:"When Clicked → Play Sound",desc:"Plays a sound asset or URL when an element is clicked.",f:[["buttonId","Clicked ID","text","soundButton"],["source","Sound asset name or URL","text","click.mp3"],["volume","Volume 0-1","number","1"],["restart","Restart on every click","select","yes",["yes","no"]]]},
 whenClickedToggle:{title:"When Clicked → Toggle",desc:"Shows and hides another ID when clicked.",f:[["buttonId","Clicked ID","text","toggleButton"],["targetId","Target ID","text","panel"]]},
 randomFromList:{title:"Random From List",desc:"Creates a reusable named list for random actions.",f:[["name","List name","text","pigeons"],["items","Items, one per line","textarea","pigeon1.png\npigeon2.png"]]},
 matrixRain:{title:"Matrix Rain",desc:"Adds configurable falling characters behind the page.",f:[["characters","Characters","text","01ABCDEFGHIJKLMNOPQRSTUVWXYZ"],["color","Color","color","#00ffff"],["fontSize","Font size","number","16"],["speed","Speed","number","1.2"],["density","Density 0.1-2","number","0.8"],["opacity","Opacity 0-1","number","0.28"],["glow","Glow","select","yes",["yes","no"]]]},
 starsEffect:{title:"Stars",desc:"Adds drifting stars to the page background.",f:[["amount","Amount","number","100"],["speed","Speed","number","0.25"],["opacity","Opacity","number","0.6"]]},
 snowEffect:{title:"Snow",desc:"Adds falling snow particles.",f:[["amount","Amount","number","80"],["speed","Speed","number","1"],["size","Maximum size","number","5"]]},
 firefliesEffect:{title:"Fireflies",desc:"Adds softly moving glowing dots.",f:[["amount","Amount","number","35"],["speed","Speed","number","0.4"]]},
 floatingSquaresEffect:{title:"Floating Squares",desc:"Adds floating outlined squares.",f:[["amount","Amount","number","25"],["speed","Speed","number","0.35"],["color","Color","color","#38bdf8"]]},
 gridEffect:{title:"Grid",desc:"Adds a configurable background grid.",f:[["size","Grid size","number","40"],["color","Line color","color","#123c55"],["opacity","Opacity","number","0.45"]]},
 scanlinesEffect:{title:"Scanlines",desc:"Adds retro horizontal scanlines.",f:[["spacing","Spacing","number","4"],["opacity","Opacity","number","0.12"]]},
 noiseEffect:{title:"Noise",desc:"Adds animated screen noise.",f:[["opacity","Opacity","number","0.08"],["speed","Speed milliseconds","number","90"]]},
 crtEffect:{title:"CRT Screen",desc:"Adds curved-screen shading and a subtle flicker.",f:[["strength","Strength 0-1","number","0.35"],["flicker","Flicker","select","yes",["yes","no"]]]},
 animatedGradientEffect:{title:"Animated Gradient",desc:"Adds a slowly moving gradient background.",f:[["color1","Color 1","color","#020617"],["color2","Color 2","color","#0f3d5e"],["speed","Seconds","number","12"]]},
 circuitEffect:{title:"Circuit Board",desc:"Adds a circuit-like line pattern.",f:[["color","Color","color","#0ea5e9"],["size","Pattern size","number","80"],["opacity","Opacity","number","0.18"]]},
 hexagonEffect:{title:"Hexagon Network",desc:"Adds a hex-like technical background pattern.",f:[["color","Color","color","#22d3ee"],["size","Size","number","46"],["opacity","Opacity","number","0.16"]]},
 bubblesEffect:{title:"Bubbles",desc:"Adds rising translucent bubbles.",f:[["amount","Amount","number","30"],["speed","Speed","number","0.5"]]},
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
   case"startMenu":H.push(`<section id="${esc(v.menuId)}" class="twb-start-menu"><h1>${v.title}</h1><p>${v.subtitle}</p><button id="${esc(v.menuId)}Button">${v.buttonText}</button></section><main id="${esc(v.gameId)}" hidden></main>`);C.push(`.twb-start-menu{min-height:70vh;display:grid;place-content:center;text-align:center;gap:12px}.twb-start-menu button{font:inherit;padding:12px 28px;cursor:pointer}`);J.push(`document.getElementById(${JSON.stringify(v.menuId+'Button')})?.addEventListener('click',()=>{document.getElementById(${JSON.stringify(v.menuId)})?.setAttribute('hidden','');document.getElementById(${JSON.stringify(v.gameId)})?.removeAttribute('hidden');window.dispatchEvent(new Event('resize'));});`);break;
   case"playerController":H.push(`<div id="${esc(v.playerId)}" class="twb-player" data-x="80" data-y="80"></div>`);C.push(`#${v.playerId}{position:absolute;width:${Number(v.size)||42}px;height:${Number(v.size)||42}px;background:${v.color};left:0;top:0;z-index:20}`);J.push(`(()=>{const p=document.getElementById(${JSON.stringify(v.playerId)}),s=document.getElementById(${JSON.stringify(v.stageId)});if(!p||!s)return;const keys=new Set();let x=80,y=80;window.__twbPlayers??={};const data=window.__twbPlayers[${JSON.stringify(v.playerId)}]={el:p,stage:s,x,y,inputX:0,inputY:0};addEventListener('keydown',e=>keys.add(e.key.toLowerCase()));addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));function tick(){let dx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+data.inputX,dy=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0)+data.inputY;const m=Math.hypot(dx,dy)||1;dx/=m;dy/=m;x=Math.max(0,Math.min(s.scrollWidth-p.offsetWidth,x+dx*${Number(v.speed)||4}));y=Math.max(0,Math.min(s.scrollHeight-p.offsetHeight,y+dy*${Number(v.speed)||4}));data.x=x;data.y=y;p.style.transform='translate('+x+'px,'+y+'px)';requestAnimationFrame(tick)}tick()})();`);break;
   case"mobileJoystick":H.push(`<div id="${esc(v.joystickId)}" class="twb-joystick"><div></div></div>`);C.push(`#${v.joystickId}{position:fixed;left:18px;bottom:18px;width:${Number(v.size)||120}px;height:${Number(v.size)||120}px;border:2px solid currentColor;border-radius:50%;opacity:.7;z-index:999;touch-action:none}#${v.joystickId}>div{position:absolute;width:42%;height:42%;left:29%;top:29%;border-radius:50%;background:currentColor}`);J.push(`(()=>{const j=document.getElementById(${JSON.stringify(v.joystickId)});if(!j)return;const knob=j.firstElementChild;function move(e){const p=window.__twbPlayers?.[${JSON.stringify(v.playerId)}];if(!p)return;const r=j.getBoundingClientRect(),t=e.touches?.[0]||e,cx=r.left+r.width/2,cy=r.top+r.height/2,dx=t.clientX-cx,dy=t.clientY-cy,m=Math.min(r.width*.36,Math.hypot(dx,dy)),a=Math.atan2(dy,dx);p.inputX=Math.cos(a)*(m/(r.width*.36));p.inputY=Math.sin(a)*(m/(r.width*.36));knob.style.transform='translate('+Math.cos(a)*m+'px,'+Math.sin(a)*m+'px)'}function end(){const p=window.__twbPlayers?.[${JSON.stringify(v.playerId)}];if(p){p.inputX=p.inputY=0}knob.style.transform=''}j.addEventListener('pointerdown',e=>{j.setPointerCapture(e.pointerId);move(e)});j.addEventListener('pointermove',e=>{if(j.hasPointerCapture(e.pointerId))move(e)});j.addEventListener('pointerup',end);j.addEventListener('pointercancel',end)})();`);break;
   case"healthSystem":{if(v.showBar==='yes')H.push(`<div id="${esc(v.barId)}" class="twb-health"><div></div></div>`);C.push(`#${v.barId}{width:min(320px,90vw);height:18px;border:1px solid currentColor}.twb-health>div{height:100%;width:100%;background:#22c55e;transition:width .15s}`);J.push(`(()=>{const id=${JSON.stringify(v.targetId)},max=${Number(v.maxHealth)||100};window.__twbHealth??={};const h=window.__twbHealth[id]={value:max,max,damage(n){this.value=Math.max(0,this.value-n);this.draw();document.dispatchEvent(new CustomEvent('twb-health',{detail:{id,value:this.value,max}}))},heal(n){this.value=Math.min(max,this.value+n);this.draw()},draw(){const b=document.querySelector('#${esc(v.barId)} > div');if(b)b.style.width=(this.value/max*100)+'%'}};h.draw()})();`);break;}
   case"playerAttack":J.push(`(()=>{const s=document.getElementById(${JSON.stringify(v.stageId)});if(!s)return;let last=0;window.__twbBullets??=[];function fire(clientX,clientY){const now=performance.now();if(now-last<${Number(v.cooldown)||220})return;last=now;const p=window.__twbPlayers?.[${JSON.stringify(v.playerId)}];if(!p)return;const r=s.getBoundingClientRect(),tx=(clientX-r.left)+s.scrollLeft,ty=(clientY-r.top)+s.scrollTop,a=Math.atan2(ty-p.y,tx-p.x),el=document.createElement('div'),b={x:p.x+p.el.offsetWidth/2,y:p.y+p.el.offsetHeight/2,vx:Math.cos(a)*${Number(v.speed)||10},vy:Math.sin(a)*${Number(v.speed)||10},damage:${Number(v.damage)||25},el};el.className='twb-projectile';el.style.cssText='position:absolute;width:10px;height:10px;border-radius:50%;background:white;z-index:18';s.append(el);window.__twbBullets.push(b)}s.addEventListener('pointerdown',e=>fire(e.clientX,e.clientY));function tick(){for(let i=window.__twbBullets.length-1;i>=0;i--){const b=window.__twbBullets[i];b.x+=b.vx;b.y+=b.vy;b.el.style.transform='translate('+b.x+'px,'+b.y+'px)';if(b.x<0||b.y<0||b.x>s.scrollWidth||b.y>s.scrollHeight){b.el.remove();window.__twbBullets.splice(i,1)}}requestAnimationFrame(tick)}tick()})();`);break;
   case"enemySpawner":C.push(`.${v.enemyClass}{position:absolute;width:36px;height:36px;background:${v.enemyColor};z-index:15}`);J.push(`(()=>{const s=document.getElementById(${JSON.stringify(v.stageId)});if(!s)return;window.__twbEnemies??=[];function spawn(){const p=window.__twbPlayers?.[${JSON.stringify(v.playerId)}];if(!p)return;const el=document.createElement('div'),edge=Math.floor(Math.random()*4),e={x:0,y:0,hp:${Number(v.enemyHealth)||50},el};el.className=${JSON.stringify(v.enemyClass)};if(edge<2){e.x=edge?Math.max(0,s.scrollWidth-40):0;e.y=Math.random()*Math.max(1,s.scrollHeight-40)}else{e.x=Math.random()*Math.max(1,s.scrollWidth-40);e.y=edge===3?Math.max(0,s.scrollHeight-40):0}s.append(el);window.__twbEnemies.push(e)}setInterval(spawn,${Number(v.spawnMs)||1200});function hit(a,b,aw=10,ah=10,bw=36,bh=36){return a.x<b.x+bw&&a.x+aw>b.x&&a.y<b.y+bh&&a.y+ah>b.y}function tick(){const p=window.__twbPlayers?.[${JSON.stringify(v.playerId)}];if(p)for(let i=window.__twbEnemies.length-1;i>=0;i--){const e=window.__twbEnemies[i],a=Math.atan2(p.y-e.y,p.x-e.x);e.x+=Math.cos(a)*${Number(v.enemySpeed)||1.4};e.y+=Math.sin(a)*${Number(v.enemySpeed)||1.4};e.el.style.transform='translate('+e.x+'px,'+e.y+'px)';for(let j=(window.__twbBullets?.length||0)-1;j>=0;j--){const b=window.__twbBullets[j];if(hit(b,e)){e.hp-=b.damage;b.el.remove();window.__twbBullets.splice(j,1);if(e.hp<=0){e.el.remove();window.__twbEnemies.splice(i,1)}break}}if(hit({x:p.x,y:p.y},e,p.el.offsetWidth,p.el.offsetHeight)){window.__twbHealth?.[${JSON.stringify(v.playerId)}]?.damage(10);e.el.remove();window.__twbEnemies.splice(i,1)}}requestAnimationFrame(tick)}tick()})();`);break;
   case"cameraFollow":J.push(`(()=>{const s=document.getElementById(${JSON.stringify(v.stageId)}),w=document.getElementById(${JSON.stringify(v.worldId)}),t=document.getElementById(${JSON.stringify(v.targetId)});if(!s||!w||!t)return;let cx=0,cy=0;function tick(){const p=window.__twbPlayers?.[${JSON.stringify(v.targetId)}];if(p){cx+=(p.x-s.clientWidth/2-cx)*${Number(v.ease)||.08};cy+=(p.y-s.clientHeight/2-cy)*${Number(v.ease)||.08};w.style.transform='translate('+-Math.max(0,cx)+'px,'+-Math.max(0,cy)+'px)'}requestAnimationFrame(tick)}tick()})();`);break;
   case"responsiveGame":C.push(`#${v.stageId}{width:${Number(v.baseWidth)||800}px;height:${Number(v.baseHeight)||450}px;max-width:none;transform-origin:top left}`);J.push(`(()=>{const s=document.getElementById(${JSON.stringify(v.stageId)});if(!s)return;function fit(){const scale=Math.min(1,(s.parentElement?.clientWidth||innerWidth)/${Number(v.baseWidth)||800});s.style.transform='scale('+scale+')';s.parentElement.style.height=(${Number(v.baseHeight)||450}*scale)+'px'}addEventListener('resize',fit);fit()})();`);break;
   case"randomFromList":J.push(`window.__twbLists??={};window.__twbLists[${JSON.stringify(v.name)}]=${JSON.stringify(v.items.split('\n').map(x=>x.trim()).filter(Boolean))};`);break;
   case"whenClickedSetImage":J.push(`(()=>{let previous=-1;document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener('click',()=>{const img=document.getElementById(${JSON.stringify(v.imageId)}),items=${JSON.stringify(v.items.split('\n').map(x=>x.trim()).filter(Boolean))};if(!img||!items.length)return;let n=Math.floor(Math.random()*items.length);if(${JSON.stringify(v.avoidRepeat)}==='yes'&&items.length>1)while(n===previous)n=Math.floor(Math.random()*items.length);previous=n;img.src=(window.__twbAssets?.[items[n]]||items[n])})})();`);break;
   case"whenClickedPlaySound":J.push(`document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener('click',()=>{const src=window.__twbAssets?.[${JSON.stringify(v.source)}]||${JSON.stringify(v.source)};window.__twbAudio??={};let a=window.__twbAudio[src]||(window.__twbAudio[src]=new Audio(src));a.volume=Math.max(0,Math.min(1,${Number(v.volume)||1}));if(${JSON.stringify(v.restart)}==='yes')a.currentTime=0;a.play().catch(()=>{})});`);break;
   case"whenClickedToggle":J.push(`document.getElementById(${JSON.stringify(v.buttonId)})?.addEventListener('click',()=>{const t=document.getElementById(${JSON.stringify(v.targetId)});if(t)t.hidden=!t.hidden});`);break;
   case"matrixRain":H.unshift(`<canvas id="twb-matrix-bg" class="twb-bg-effect"></canvas>`);C.push(`.twb-bg-effect{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:-2;opacity:${Number(v.opacity)||.28}}`);J.push(`(()=>{const c=document.getElementById('twb-matrix-bg'),x=c?.getContext('2d');if(!x)return;let w,h,cols,drops;const chars=${JSON.stringify(v.characters)};function size(){w=c.width=innerWidth;h=c.height=innerHeight;cols=Math.ceil(w/${Number(v.fontSize)||16}*${Number(v.density)||.8});drops=Array(cols).fill(1)}addEventListener('resize',size);size();function draw(){x.fillStyle='rgba(0,0,0,.08)';x.fillRect(0,0,w,h);x.fillStyle=${JSON.stringify(v.color)};x.font='${Number(v.fontSize)||16}px monospace';x.shadowBlur=${v.glow==='yes'?8:0};x.shadowColor=${JSON.stringify(v.color)};drops.forEach((y,i)=>{x.fillText(chars[Math.floor(Math.random()*chars.length)]||'0',i*w/cols,y*${Number(v.fontSize)||16});if(y*${Number(v.fontSize)||16}>h&&Math.random()>.975)drops[i]=0;drops[i]+=${Number(v.speed)||1.2}});requestAnimationFrame(draw)}draw()})();`);break;
   case"gridEffect":C.push(`body{background-image:linear-gradient(${v.color}55 1px,transparent 1px),linear-gradient(90deg,${v.color}55 1px,transparent 1px);background-size:${Number(v.size)||40}px ${Number(v.size)||40}px;background-attachment:fixed}`);break;
   case"scanlinesEffect":C.push(`body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:9998;background:repeating-linear-gradient(to bottom,rgba(0,0,0,${Number(v.opacity)||.12}) 0 1px,transparent 1px ${Number(v.spacing)||4}px)}`);break;
   case"animatedGradientEffect":C.push(`body{background:linear-gradient(120deg,${v.color1},${v.color2},${v.color1});background-size:300% 300%;animation:twbGradient ${Number(v.speed)||12}s ease infinite}@keyframes twbGradient{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}`);break;
   case"crtEffect":C.push(`body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:9997;box-shadow:inset 0 0 ${40+(Number(v.strength)||.35)*100}px rgba(0,0,0,${Number(v.strength)||.35});${v.flicker==='yes'?'animation:twbFlicker .12s infinite alternate':''}}@keyframes twbFlicker{from{opacity:.96}to{opacity:1}}`);break;
   case"starsEffect":case"snowEffect":case"firefliesEffect":case"floatingSquaresEffect":case"bubblesEffect":{const type=b.type,amount=Number(v.amount)||40;H.unshift(`<div class="twb-particles twb-${type}"></div>`);C.push(`.twb-particles{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:-1}.twb-particle{position:absolute;border-radius:50%;background:currentColor;animation:twbFloat linear infinite}@keyframes twbFloat{from{transform:translateY(110vh)}to{transform:translateY(-20vh)}}`);J.push(`(()=>{const root=document.querySelector('.twb-${type}');if(!root)return;for(let i=0;i<${amount};i++){const p=document.createElement('i');p.className='twb-particle';const z=2+Math.random()*${type==='snowEffect'?(Number(v.size)||5):8};p.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;opacity:'+(0.2+Math.random()*.7)+';animation-duration:'+(5+Math.random()*15)+'s;animation-delay:'+-Math.random()*15+'s';${type==='floatingSquaresEffect'?`p.style.borderRadius='0';p.style.background='transparent';p.style.border='1px solid ${v.color}'`:''}root.append(p)}})();`);break;}
   case"noiseEffect":C.push(`body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:9996;opacity:${Number(v.opacity)||.08};background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");animation:twbNoise ${Number(v.speed)||90}ms steps(2) infinite}@keyframes twbNoise{to{transform:translate(1%,-1%)}}`);break;
   case"circuitEffect":C.push(`body{background-image:linear-gradient(90deg,transparent 48%,${v.color} 49% 51%,transparent 52%),linear-gradient(transparent 48%,${v.color} 49% 51%,transparent 52%);background-size:${Number(v.size)||80}px ${Number(v.size)||80}px}`);break;
   case"hexagonEffect":C.push(`body{background-image:radial-gradient(circle at 50% 0,transparent 30%,${v.color}33 31% 33%,transparent 34%);background-size:${Number(v.size)||46}px ${Number(v.size)||46}px}`);break;
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
<title>${esc(state.websiteTitle||state.projectName)}</title><style>${state.responsive!==false?"html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}img,video,canvas{max-width:100%;height:auto}@media(max-width:700px){body{padding:12px!important}}":""}${state.code.css}</style></head><body>
${state.code.html}
<script>window.__twbAssets=${JSON.stringify(Object.fromEntries((state.assets||[]).map(a=>[a.name,a.data])))};<\/script>
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
function saveLocal(){localStorage.setItem("twb.v4",JSON.stringify(state))}
function load(p){if(!p||!Array.isArray(p.blocks))throw Error("Invalid project");Object.assign(state,p);state.assets||=[];state.websiteTitle||=state.projectName;state.code||=(generated());state.manual||={html:false,css:false,js:false};render();$("#websiteTitle").value=state.websiteTitle||state.projectName;$("#responsiveToggle").checked=state.responsive!==false;for(const l of["html","css","js"])$("#"+l+"Code").value=state.code[l]||"";preview();updateModeLabel()}
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
 {name:"index.html",content:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(state.websiteTitle||state.projectName)}</title><link rel="stylesheet" href="style.css"></head><body>\n${state.code.html}\n<script src="assets.js"><\/script><script src="script.js"><\/script></body></html>`},
 {name:"style.css",content:state.code.css},{name:"assets.js",content:`window.__twbAssets=${JSON.stringify(Object.fromEntries((state.assets||[]).map(a=>[a.name,a.data])))};`},{name:"script.js",content:`document.addEventListener("DOMContentLoaded",()=>{\n${state.code.js}\n});`},
 {name:"README.md",content:`# ${state.projectName}\n\nExported from T Web Builder v4.`}
]));
$(".tabs").onclick=e=>{const t=e.target.closest(".tab");if(!t)return;document.querySelectorAll(".tab,.editor").forEach(x=>x.classList.remove("active"));t.classList.add("active");$("#"+t.dataset.lang+"Code").classList.add("active");updateModeLabel()};
for(const l of["html","css","js"])$("#"+l+"Code").oninput=e=>{state.code[l]=e.target.value;state.manual[l]=true;preview();saveLocal();updateModeLabel()};
$("#useGeneratedBtn").onclick=()=>{const l=activeLang();state.manual[l]=false;generate()};
$("#copyBtn").onclick=async()=>{await navigator.clipboard.writeText($(".editor.active").value);$("#copyBtn").textContent="Copied";setTimeout(()=>$("#copyBtn").textContent="Copy",800)};


const templateDefs=[
 {name:'Arcade Hub',desc:'A clean home page with buttons for multiple game pages.',blocks:['pageStyle','matrixRain','hgroup','card','button','button','button']},
 {name:'Top-Down Shooter',desc:'A playable cube game with movement, health, shooting, enemies, joystick, and responsive scaling.',custom(){state.blocks=[make('pageStyle'),make('startMenu'),make('gameStage'),make('playerController'),make('healthSystem'),make('playerAttack'),make('enemySpawner'),make('mobileJoystick'),make('responsiveGame'),make('scanlinesEffect')];state.blocks[2].values.id='gameStage';}},
 {name:'Pigeon Randomizer',desc:'A button that displays a random picture from your Asset Manager.',custom(){state.blocks=[make('pageStyle'),make('heading'),make('button'),make('image'),make('whenClickedSetImage')];state.blocks[1].values.text='Random Pigeon';state.blocks[2].values.text='SHOW PIGEON';state.blocks[2].values.id='pigeonButton';state.blocks[3].values.id='pigeonImage';state.blocks[3].values.src='';}},
 {name:'Start Menu',desc:'A title screen ready to connect to your own game area.',blocks:['pageStyle','startMenu','animatedGradientEffect']},
 {name:'Blank Game',desc:'A stage, player controls, mobile joystick, and responsive scaling.',blocks:['pageStyle','gameStage','playerController','mobileJoystick','responsiveGame']}
];
function renderTemplates(){const g=$('#templateGrid');g.innerHTML='';templateDefs.forEach(t=>{const n=document.createElement('button');n.className='template-card';n.innerHTML='<strong>'+t.name+'</strong><span>'+t.desc+'</span>';n.onclick=()=>{if(state.blocks.length&&!confirm('Replace the current blocks with this template?'))return;if(t.custom)t.custom();else state.blocks=t.blocks.map(make);render();generate();$('#templatesDialog').close()};g.append(n)})}
function renderAssets(){const root=$('#assetList'),q=$('#assetSearch').value.toLowerCase();root.innerHTML='';const items=(state.assets||[]).filter(a=>(a.name+' '+a.folder).toLowerCase().includes(q));if(!items.length){root.innerHTML='<div class="empty">No matching assets yet.</div>';return}items.forEach((a,i)=>{const realIndex=state.assets.indexOf(a),row=document.createElement('article');row.className='asset-row';const preview=a.type.startsWith('image/')?`<img src="${a.data}" alt="">`:a.type.startsWith('audio/')?'🔊':'📄';row.innerHTML=`<div class="asset-preview">${preview}</div><div class="asset-info"><strong>${a.name}</strong><span>${a.folder||'/'}</span></div><button data-copy>Copy name</button><button data-move>Move</button><button data-duplicate>Duplicate</button><button data-delete class="danger">Delete</button>`;row.querySelector('[data-copy]').onclick=()=>navigator.clipboard.writeText(a.name);row.querySelector('[data-move]').onclick=()=>{a.folder=prompt('Folder:',a.folder||'/')||'/';renderAssets();saveLocal()};row.querySelector('[data-duplicate]').onclick=()=>{state.assets.push({...a,name:'copy-'+a.name});renderAssets();saveLocal()};row.querySelector('[data-delete]').onclick=()=>{if(confirm('Delete '+a.name+'?')){state.assets.splice(realIndex,1);renderAssets();saveLocal()}};root.append(row)})}
$('#templatesBtn').onclick=()=>{renderTemplates();$('#templatesDialog').showModal()};$('#assetsBtn').onclick=()=>{renderAssets();$('#assetsDialog').showModal()};document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.close).close());$('#assetSearch').oninput=renderAssets;$('#newFolderBtn').onclick=()=>{const f=prompt('Folder name:','images');if(f)alert('Folder created. Use Move on an asset to place it in '+f+'.')};$('#assetInput').onchange=async e=>{for(const file of e.target.files){const data=await new Promise((ok,no)=>{const r=new FileReader;r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(file)});state.assets.push({name:file.name,type:file.type||'application/octet-stream',folder:'/',data})}e.target.value='';renderAssets();saveLocal()};
$('#websiteTitle').oninput=e=>{state.websiteTitle=e.target.value;preview();saveLocal()};$('#responsiveToggle').onchange=e=>{state.responsive=e.target.checked;preview();saveLocal()};

buildLibrary();
try{const s=localStorage.getItem("twb.v4")||localStorage.getItem("vcs.v3")||localStorage.getItem("vcs.v2");if(s)load(JSON.parse(s))}catch(error){console.warn("Could not load saved project",error)}
if(!state.blocks.length&&!state.code.html){
 state.blocks=[make("pageStyle"),make("heading"),make("paragraph"),make("button"),make("alertEvent")];
 state.blocks[1].values.text="My first visual website";state.blocks[3].values.id="buns";state.blocks[4].values.targetId="buns";
 render();generate();
}else{render();for(const l of["html","css","js"])$("#"+l+"Code").value=state.code[l]||"";preview()}
})();