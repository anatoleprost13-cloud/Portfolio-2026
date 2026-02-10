console.log('FLIES JS LOADED');

// =====================
// CURSEUR INVISIBLE
// =====================
const cursorStyle = document.createElement('style');
cursorStyle.innerHTML = `* { cursor: none !important; }`;
document.head.appendChild(cursorStyle);

// =====================
// PARAMÈTRES
// =====================
const MAX_FLIES = 6;
const SPAWN_MIN_DELAY = 1200;
const SPAWN_MAX_DELAY = 4500;
let flies = [];
let panic = false;

// =====================
// SOURIS
// =====================
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// =====================
// PANIC AU CLIC / DRAG
// =====================
function triggerPanic() {
  panic = true;
  flies.forEach(f => f.startPanic());
}
document.addEventListener('mousedown', triggerPanic);
document.addEventListener('mousemove', e => {
  if(e.buttons === 1) triggerPanic();
});

// =====================
// CLASSE FLY
// =====================
class Fly {
  constructor(isGhost=false){
    this.el = document.createElement('img');
    this.el.src = 'images/mouche.png';
    this.el.style.position = 'fixed';
    this.el.style.width = '120px';
    this.el.style.height = '120px';
    this.el.style.pointerEvents = 'none';
    this.el.style.zIndex = '3000';
    this.el.style.transform = 'translate(-50%, -50%)';
    this.el.style.opacity = '1';
    document.body.appendChild(this.el);

    // Première mouche visible au centre
    if(flies.length === 0){
      this.x = window.innerWidth/2;
      this.y = window.innerHeight/2;
    } else {
      const side = Math.floor(Math.random()*4);
      const w = window.innerWidth;
      const h = window.innerHeight;
      if(side===0){ this.x=-200; this.y=Math.random()*h; }
      if(side===1){ this.x=w+200; this.y=Math.random()*h; }
      if(side===2){ this.x=Math.random()*w; this.y=-200; }
      if(side===3){ this.x=Math.random()*w; this.y=h+200; }
    }

    // cible initiale
    this.tx = window.innerWidth/2 + (Math.random()-0.5)*150;
    this.ty = window.innerHeight/2 + (Math.random()-0.5)*150;

    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.state = 'wander';
    this.speed = isGhost ? 0.002 : 0.006 + Math.random()*0.01;
    this.pauseTime = 0;
  }

  update(){
    if(this.state==='panic'){
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 1.15;
      this.vy *= 1.15;
      if(this.x<-400 || this.x>window.innerWidth+400 || this.y<-400 || this.y>window.innerHeight+400){
        this.el.remove();
        flies = flies.filter(f => f!==this);
      }
      return;
    }

    // micro-pauses aléatoires
    if(this.pauseTime > 0){
      this.pauseTime--;
      return;
    }
    if(Math.random() < 0.002){
      this.pauseTime = 30 + Math.random()*80;
    }

    // micro dérives
    this.tx += (Math.random()-0.5)*40;
    this.ty += (Math.random()-0.5)*40;

    // répulsion douce du curseur
    const dxm = this.x - mouseX;
    const dym = this.y - mouseY;
    const dist = Math.hypot(dxm,dym);
    if(dist < 200){
      this.tx += dxm * 0.12;
      this.ty += dym * 0.12;
    }

    // mouvement vers cible
    this.vx += (this.tx - this.x) * this.speed;
    this.vy += (this.ty - this.y) * this.speed;
    this.vx *= 0.95;
    this.vy *= 0.95;

    this.x += this.vx;
    this.y += this.vy;

    const desiredAngle = Math.atan2(this.vy,this.vx)*180/Math.PI;
    this.angle += (desiredAngle - this.angle)*0.1;

    this.el.style.left = this.x+'px';
    this.el.style.top = this.y+'px';
    this.el.style.transform = `translate(-50%, -50%) rotate(${this.angle}deg)`;
  }

  startPanic(){
    this.state = 'panic';
    const a = Math.random()*Math.PI*2;
    const s = 8 + Math.random()*6;
    this.vx = Math.cos(a)*s;
    this.vy = Math.sin(a)*s;
  }
}

// =====================
// SPAWN PROGRESSIF
// =====================
function spawnFly(){
  if(flies.length < MAX_FLIES && !panic){
    flies.push(new Fly());
  }
  const delay = SPAWN_MIN_DELAY + Math.random()*(SPAWN_MAX_DELAY-SPAWN_MIN_DELAY);
  setTimeout(spawnFly, delay);
}
spawnFly();

// =====================
// LOOP
// =====================
function loop(){
  flies.forEach(f => f.update());
  requestAnimationFrame(loop);
}
loop();
