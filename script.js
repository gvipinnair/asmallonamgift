const scenes=[...document.querySelectorAll(".scene")];
let current=0;
const voice=document.getElementById("voice");

function show(n){
  scenes[current].classList.remove("active");
  current=n;
  scenes[current].classList.add("active");

  if(current===7){
    voice.currentTime=0;
    voice.play().catch(()=>{});
  }else{
    voice.pause();
  }
}

document.getElementById("go1").onclick=()=>show(1);
document.getElementById("go2").onclick=()=>show(2);
document.getElementById("go3").onclick=()=>show(3);
document.getElementById("go4").onclick=()=>show(4);
document.getElementById("go5").onclick=()=>show(5);
document.getElementById("go6").onclick=()=>show(6);
document.getElementById("go7").onclick=()=>show(7);
document.getElementById("go8").onclick=()=>show(8);

document.getElementById("restart").onclick=()=>{
  voice.pause();
  voice.currentTime=0;
  show(0);
};
