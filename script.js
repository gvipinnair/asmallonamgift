const scenes=[...document.querySelectorAll('.scene')];
const voice=document.getElementById('voice');
let current=0;
function show(i){scenes.forEach((s,n)=>s.classList.toggle('active',n===i));current=i;window.scrollTo(0,0)}
function playVoice(){voice.currentTime=0;voice.play().catch(()=>{});}
document.getElementById('enterHome').onclick=()=>show(1);
document.getElementById('next1').onclick=()=>show(2);
document.getElementById('next2').onclick=()=>show(3);
document.getElementById('next3').onclick=()=>show(4);
document.getElementById('enterHall').onclick=()=>{show(5);setTimeout(playVoice,900)};
document.getElementById('postcardBtn').onclick=()=>show(6);
document.getElementById('restart').onclick=()=>{voice.pause();voice.currentTime=0;show(0)};
voice.addEventListener('ended',()=>show(6));
show(0);
