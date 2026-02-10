// =====================
// VARIABLES GLOBALES
// =====================
const grid = document.getElementById('grid');
const TOTAL_CARDS = 30;
let zIndexCounter = 1000;
let mouseX = 0, mouseY = 0;

// =====================
// CURSEUR PRINCIPAL (mouche)
// =====================
const style = document.createElement('style');
style.innerHTML = `* { cursor: none !important; }`;
document.head.appendChild(style);

const cursor = document.createElement('img');
cursor.src = 'images/mouche.png';
cursor.style.position = 'fixed';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '3000';
cursor.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(cursor);

// Taille adaptative selon l'écran
if(window.innerWidth <= 768){
  cursor.style.width = '60px';
  cursor.style.height = '60px';
}

// Masquer sur tactile
if(window.matchMedia("(hover: none) and (pointer: coarse)").matches){
  cursor.style.display = 'none';
}

let currentX = 0, currentY = 0;
let angle = 0, targetAngle = 0;
let lastX = 0, lastY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const dx = mouseX - currentX;
  const dy = mouseY - currentY;
  currentX += dx * 0.12;
  currentY += dy * 0.12;

  const desiredAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  targetAngle += (desiredAngle - targetAngle) * 0.08;
  angle = targetAngle;

  const speed = Math.hypot(currentX - lastX, currentY - lastY);
  const shadowOpacity = Math.min(0.6, 0.1 + 0.5 * Math.max(0, 1 - speed / 20));
  const shadowBlur = 10 + 30 * Math.max(0, 1 - speed / 20);
  cursor.style.filter = `drop-shadow(0 ${shadowBlur}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}))`;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;
  cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  lastX = currentX;
  lastY = currentY;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// =====================
// CARTES
// =====================
const images = [
  "", "images/test images sites.jpg", "images/test images sites2.jpg", "images/test images sites3.jpg",
  "images/test images sites4.jpg", "images/test images sites5.jpg", "images/test images sites7.jpg",
  "images/test images sites8.jpg", "images/test images sites9.jpg", "images/test images sites10.jpg",
  "images/test images sites11.jpg", "images/test images sites38.jpg", "images/test images sites13.jpg",
  "images/test images sites14.jpg", "images/test images sites16.jpg", "images/test images sites17.jpg",
  "images/test images sites18.jpg", "images/test images sites20.jpg", "images/test images sites21.jpg",
  "images/test images sites22.jpg", "images/test images sites24.jpg", "images/test images sites25.jpg",
  "images/test images sites26.jpg", "images/test images sites27.jpg", "images/test images sites28.jpg",
  "images/test images sites29.jpg", "images/test images sites30.jpg", "images/test images sites35.jpg",
  "images/test images sites33.jpg", "images/test images sites36.jpg"
];

const texts = [
  "", 
  "Poster (120x176) and instagram post for Ravisius Textor's “Gallerie d'essais 2025”",
  "“École des légendes”, newpapper designed, written and drawn by the children of the Saint Saulge social center. (2025)",
  "Double-sided, hand-painted tunics exhibited at Ravisius Textor during my exhibition: “Retour vers le futur”. (2025)",
  "“Retour vers le futur”: The Book. A compilation of writings and images from the oral and folkloric heritage of the Morvan region. (2025)",
  "Double-sided, hand-painted tunics exhibited at Ravisius Textor during my exhibition: “Retour vers le futur”. (2025)",
  "“Retour vers le futur”: The Book. A compilation of writings and images from the oral and folkloric heritage of the Morvan region. (2025)",
  "“École des légendes”, newpapper designed, written and drawn by the children of the Saint Saulge social center. (2025)",
  "Poster (120x176) and instagram animations designed with Axelle Pannequin for the exhibition “Minibibliomanie” by l'Articho at Ravisius Textor. (2025)",
  "Poster (120x176) and instagram post designed with Samuel Papon and Paul Sallaud for “Voltolo”, an event by Alex Balgiu at Ravisius Textor. (2024)",
  "Poster (120x176) and instagram post for “Comme un ouragan, la tempête en moi”, an exhibition by Valentine Gardiennet at Ravisius Textor. (2023)",
  "“Carton Rouge”, installation for the Rietveld graphic design class exhibition “On the other hand...” with Ethan Park, Cassiani Kastoris and Anissa Ammann. (2025)",
  "Instagram communication for my exhibition: “Retour vers le futur” at Ravisius Textor. (2025)",
  "“Open Call for nothing”: communication and karaoke video for an event by Provisional School for Nothing at Systema (Marseille). With Sara Vaz and Marco Balesteros in 2025.",
  "“the BOOK aBOut BOOKs”: publication about writting and images experimetations inspired by my obsession of books. (2025)",
  "“T-shirt aBOut BOOKs”: screen-printed t-shirts with the “Shadok” typeface made by Manon Guichard. (2025)",
  "“Cattle-branding”, creation of metal tools, modular typography made by burning fabrics with Angel Zähner. (2025)", 
  "“A book about cap”: a book about the imagery of caps, pins and branding. (2025)", 
  "“Tudo, Nada”: riso poster made with Nuno Beijinho and Clara Amaral during “the End” by Provisional School for Nothing. (2024)", 
  "Paper plane designed with Sara e Tralha during “the End” by Provisional School for Nothing. (2024)",
  "“Un livre bien?” made with Samuel Papon. (2023)", 
  "“Au pays des âne.esse.s”: posters in screenprint made with images and text about the inhabitants of Saint-Saulge. (2024)", 
  "“Un autre livre bien??”: book made with Samuel Papon, Axelle Pannequin and Louis-Aris Ndokolo. (2024)", 
  "Communication for several concerts in the 2025 summer by RVEG. (2025)",
  "Communication for several concerts in the 2025 summer by RVEG. (2025)", 
  "“École des légendes”, newpapper designed, written and drawn by the children of the Saint Saulge social center. (2025)", 
  "Experimentations during “The End” by Provisional School for Nothing with prints by Marco Balesteros. (2024)", 
  "“Village du futur”: poster made by my father for my bachelor thesis cover. (2024)",
  "“Village du futur”: bachelor thesis about the differents folklores arround the village of Saint-Saulge and their possible new interpretations. (2024)", 
  "“Carton Rouge”, installation for the Rietveld graphic design class exhibition “On the other hand...” with Ethan Park, Cassiani Kastoris and Anissa Ammann. (2025)"
];

const cardsData = images.map((img,i)=>({img,text:texts[i]}));
for(let i=cardsData.length-1;i>1;i--){
  const j=Math.floor(Math.random()*(i-1))+1;
  [cardsData[i],cardsData[j]]=[cardsData[j],cardsData[i]];
}

let dragging = null;
let startX=0,startY=0,baseDX=0,baseDY=0,moved=false;

// =====================
// CRÉATION DES CARTES
// =====================
for(let i=0;i<TOTAL_CARDS;i++){
  const c=document.createElement('div');
  c.className='card';
  const r0=(Math.random()-0.5)*8;
  const x0=(Math.random()-0.5)*8;
  const y0=(Math.random()-0.5)*8;
  c.dataset.rot=r0;
  c.dataset.currentRot=r0;
  c.style.setProperty('--dx',`${x0}px`);
  c.style.setProperty('--dy',`${y0}px`);
  c.style.transform=`translate(var(--dx),var(--dy)) rotate(${r0}deg)`;

  if(i===0){
    c.innerHTML=`<div class="face front intro">
      Anatole Prost is a graphic design student particularly interested in rural culture and folklore.
    </div><div class="face back"></div>`;
    c.dataset.locked = "true";
    c.classList.remove('flip');
  } else {
    c.innerHTML=`
      <div class="face front"><img src="${cardsData[i].img||''}"></div>
      <div class="face back">${cardsData[i].text||''}</div>
    `;
    c.addEventListener('click',()=>{
      if(c.dataset.locked === "true") return;
      if(moved){moved=false;return;}
      c.classList.toggle('flip');
      const dx=parseFloat(c.style.getPropertyValue('--dx'))||0;
      const dy=parseFloat(c.style.getPropertyValue('--dy'))||0;
      if(c.classList.contains('flip')){
        const r=(Math.random()-0.5)*60;
        c.dataset.currentRot=r;
        c.style.transform=`translate(${dx}px,${dy}px) rotateY(180deg) rotate(${r}deg)`;
        c.classList.add('bazaar');
      } else {
        const r=c.dataset.rot;
        c.dataset.currentRot=r;
        c.style.transform=`translate(${dx}px,${dy}px) rotate(${r}deg)`;
        c.classList.remove('bazaar');
      }
    });
  }

  c.addEventListener('mousedown',(e)=>{
    dragging=c;moved=false;startX=e.clientX;startY=e.clientY;
    baseDX=parseFloat(getComputedStyle(c).getPropertyValue('--dx'))||0;
    baseDY=parseFloat(getComputedStyle(c).getPropertyValue('--dy'))||0;
    zIndexCounter++;
    c.style.zIndex=zIndexCounter;
    c.style.transition='none';
    e.preventDefault();
  });

  grid.appendChild(c);
}

// =====================
// DRAG & DROP
// =====================
document.addEventListener('mousemove',(e)=>{
  if(!dragging)return;
  moved=true;
  const dx=baseDX+(e.clientX-startX);
  const dy=baseDY+(e.clientY-startY);
  dragging.style.setProperty('--dx',`${dx}px`);
  dragging.style.setProperty('--dy',`${dy}px`);
  const ry=dragging.classList.contains('flip')?180:0;
  const r=dragging.dataset.currentRot;
  dragging.style.transform=`translate(${dx}px,${dy}px) rotateY(${ry}deg) rotate(${r}deg)`;
});

document.addEventListener('mouseup',()=>{
  if(!dragging)return;
  const dx=parseFloat(dragging.style.getPropertyValue('--dx'))||0;
  const dy=parseFloat(dragging.style.getPropertyValue('--dy'))||0;
  const ry=dragging.classList.contains('flip')?180:0;
  const r=dragging.dataset.currentRot;
  const deltaX=(Math.random()-0.5)*100;
  const deltaY=50+Math.random()*100;
  const deltaR=(Math.random()-0.5)*60;
  dragging.style.transition='transform 0.3s ease-out';
  dragging.style.transform=`translate(${dx+deltaX}px,${dy+deltaY}px) rotateY(${ry}deg) rotate(${r+deltaR}deg)`;
  setTimeout(()=>{
    dragging.style.transition='transform 0.5s ease';
    const settleX=dx+deltaX/2+(Math.random()-0.5)*20;
    const settleY=dy+deltaY/2+(Math.random()-0.5)*20;
    const settleR=r+deltaR/2+(Math.random()-0.5)*10;
    dragging.style.transform=`translate(${settleX}px,${settleY}px) rotateY(${ry}deg) rotate(${settleR}deg)`;
  },300);
  dragging=null;
});

// =====================
// MOUCHES
// =====================
const MAX_FLIES = 20;
const ESSAIM_CHANCE = 0.15;
let flies=[];

function triggerPanicAt(x,y){
  flies.forEach(f=>{
    const dx=f.x-x;
    const dy=f.y-y;
    const dist=Math.hypot(dx,dy);
    if(dist<200)f.startPanic();
  });
}

document.addEventListener('mousedown', e=> triggerPanicAt(e.pageX,e.pageY));
document.addEventListener('mousemove', e=> { if(e.buttons===1) triggerPanicAt(e.pageX,e.pageY); });

class Fly {
  constructor(x,y){
    this.el=document.createElement('img');
    this.el.src='images/mouche.png';
   this.el.style.position='fixed';this.el.style.top = this.y + 'px';

    this.el.style.width='120px';
    this.el.style.height='120px';
    this.el.style.pointerEvents='none';
    this.el.style.zIndex='9999';
    this.el.style.transform='translate(-50%,-50%)';

    const w=window.innerWidth;
    const h=window.innerHeight;
    this.x=x!==undefined?x:Math.random()*w;
    this.y=y!==undefined?y:Math.random()*h;
    this.vx=0; this.vy=0;
    this.angle=0;
    this.speed=0.002+Math.random()*0.008;
    this.state='wander';
    this.pauseTime=0;
    this.tx=this.x + (Math.random()-0.5)*150;
    this.ty=this.y + (Math.random()-0.5)*150;

    document.body.appendChild(this.el);
  }

  update(){
    const w=window.innerWidth;
    const h=window.innerHeight;

    if(this.state==='panic'){
      const angleChange=(Math.random()-0.5)*Math.PI;
      const speedMod=3.5+Math.random()*2.5;
      this.vx += Math.cos(angleChange)*speedMod*0.5;
      this.vy += Math.sin(angleChange)*speedMod*0.5;
      this.vx *=0.9; this.vy*=0.9;
      this.x+=this.vx; this.y+=this.vy;

      if(this.x<-400 || this.x>w+400 || this.y<-400 || this.y>h+400){
        this.el.remove();
        flies=flies.filter(f=>f!==this);
        return;
      }
    } else {
      if(this.pauseTime>0){this.pauseTime--; return;}
      if(Math.random()<0.002)this.pauseTime=30+Math.random()*100;

      this.tx += (Math.random()-0.5)*25;
      this.ty += (Math.random()-0.5)*25;

      const dxm=this.x-mouseX;
      const dym=this.y-mouseY;
      const dist=Math.hypot(dxm,dym);
      if(dist<200){ this.tx+=dxm*0.08; this.ty+=dym*0.08; }

      this.vx += (this.tx-this.x)*this.speed;
      this.vy += (this.ty-this.y)*this.speed;
      this.vx *=0.95; this.vy *=0.95;
      this.x+=this.vx; this.y+=this.vy;
    }

    const desiredAngle=Math.atan2(this.vy,this.vx)*180/Math.PI;
    this.angle+=(desiredAngle-this.angle)*0.1;

    this.el.style.left=this.x+'px';
    this.el.style.top=this.y+'px';
    this.el.style.transform=`translate(-50%,-50%) rotate(${this.angle}deg)`;
    this.el.style.zIndex='9999';
  }

  startPanic(){
    if(this.state!=='wander') return;
    this.state='panic';
    const a=Math.random()*Math.PI*2;
    const s=3.5+Math.random()*2.5;
    this.vx=Math.cos(a)*s;
    this.vy=Math.sin(a)*s;
  }
}

function spawnFly(){
  if(flies.length<MAX_FLIES){
    if(Math.random()<ESSAIM_CHANCE){
      const baseX=Math.random()*window.innerWidth;
      const baseY=Math.random()*window.innerHeight;
      const count=2+Math.floor(Math.random()*3);
      for(let i=0;i<count;i++) flies.push(new Fly(baseX+(Math.random()-0.5)*80,baseY+(Math.random()-0.5)*80));
    } else flies.push(new Fly());
  }
  setTimeout(spawnFly,2000+Math.random()*3000);
}

for(let i=0;i<3;i++) flies.push(new Fly());
spawnFly();

function loop(){
  flies.forEach(f=>f.update());
  requestAnimationFrame(loop);
}
loop();

// =====================
// EMAIL PANIC
// =====================
const email = document.getElementById('email');
const text = email.textContent;
email.innerHTML = '';

const letters = [];
[...text].forEach(char => {
  const span = document.createElement('span');
  span.textContent = char;
  email.appendChild(span);
  letters.push(span);
});

function panicLetters() {
  letters.forEach(l => {
    const dx = (Math.random() - 0.5) * 120;
    const dy = (Math.random() - 0.5) * 120;
    const r  = (Math.random() - 0.5) * 60;
    l.style.transform = `translate(${dx}px, ${dy}px) rotate(${r}deg)`;
  });
}

function calmLetters() {
  letters.forEach(l => {
    l.style.transform = `translate(0,0) rotate(0deg)`;
  });
}

email.addEventListener('mouseenter', panicLetters);
email.addEventListener('mouseleave', calmLetters);

// =====================
// CURSEUR SYSTÈME BLOQUÉ
// =====================
document.addEventListener('mouseleave', () => {
  document.documentElement.style.cursor = 'none';
});
document.addEventListener('mouseenter', () => {
  document.documentElement.style.cursor = 'none';
});



