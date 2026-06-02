const regionData={
"동구":5,
"서구":10,
"유성구":15,
"대덕구":20,
"중구":25
};

const mapId={
"동구":"dong",
"서구":"seo",
"유성구":"yuseong",
"대덕구":"daedeok",
"중구":"jung"
};

function clearMap(){
document.querySelectorAll(".district").forEach(d=>{
d.classList.remove("active");
});
}

function playBeep(){
const ctx=new(window.AudioContext||window.webkitAudioContext)();
const osc=ctx.createOscillator();
osc.frequency.value=1200;
osc.connect(ctx.destination);
osc.start();
setTimeout(()=>osc.stop(),1000);
}

function startAlarm(){
const region=document.getElementById("region").value;

if(!region){
alert("지역을 선택하세요.");
return;
}

clearMap();

let timeLeft=regionData[region];

document.getElementById("result").innerHTML=`선택 지역 : ${region}`;
document.getElementById("timer").innerHTML=`${timeLeft}초`;

const countdown=setInterval(()=>{
timeLeft--;
document.getElementById("timer").innerHTML=`${timeLeft}초`;

if(timeLeft<=0){
clearInterval(countdown);
document.getElementById("timer").innerHTML="🔔 알림 발생!";
playBeep();

document.getElementById(mapId[region]).classList.add("active");
}
},1000);
}