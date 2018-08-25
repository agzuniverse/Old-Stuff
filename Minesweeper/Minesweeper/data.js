//Start
var stage=document.getElementById("game");
stage.width=1000;
stage.height=660;
var mod=stage.getContext("2d");
mod.font="20px Verdana";

navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!== null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
 
    return M;
})();
 
var browser;
if (navigator.sayswho[0] == "Firefox")
	browser="f";
else if (navigator.sayswho[0] == "Chrome")
	browser="c";
else if (navigator.sayswho[0] == "Safari")
	browser="s";
else  if (navigator.sayswho[0] == "Microsoft")
	browser="m";
else
	browser="f";

//Listeners
document.addEventListener("click",clk,false);

//Declarations
var loop;
var clicked=false;
var mouseX;
var mouseY;
var toscan=true;
var mcount=10;
var grid=64;
var minecount=0;
var wincheck=true;
var block= new Array();
var eight=0;
var b_count=grid;
var massign= new Array();

//Preload
var boom= new Audio();
boom.ready=false;
boom.onload=getboomready();
boom.src="assets/audio/boom.mp3";
function getboomready()
{
boom.ready=true;
}

var snap= new Audio();
snap.ready=false;
snap.onload=getsnapready()
snap.src="assets/audio/snap.mp3";
function getsnapready()
{
snap.ready=true;
}

var sqr= new Image;
sqr.ready=false;
sqr.onload=getsqrready();
sqr.src="assets/img/block.png";
function getsqrready()
{
sqr.ready=true;
}

var sharp= new Image();
sharp.ready=false;
sharp.onload=getsharpready();
sharp.src="assets/img/mine.jpg";
function getsharpready()
{
sharp.ready=true;
}

mod.fillStyle="white";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="black";
mod.fillText("Loading.....",175,215);
var load=setInterval(loading,100);
function loading()
{
if(boom.ready==true && snap.ready==true && sqr.ready==true && sharp.ready==true)
{
clearInterval(load);
loop=setInterval(func,33);
}
}

//GameLoop
function func()
{
mod.fillStyle="white";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="red";

mod.font="20px Algerian";
mod.fillText("©AGZ Game Studios",25,20);
if(toscan)
{
while(minecount<=mcount)
{
for(z=0;z<=grid;z++)
{
if(minecount<=mcount)
{
if(Math.random()<0.015)
{
massign[z]=1;
minecount++;
}
}
}
}
toscan=false;
}
for(z=0; z<=grid; z++)
{
var box= new Object();
box.x=0;
box.y=0;
box.mine=false;
box.reveal=false;
box.number=0;
box.ver=true;
block.push(box);
}
for(var x=0;x<=grid;x++)
{
if(massign[x]==1)
block[x].mine=true;
}
for(var i=0; i<=grid; i++)
{
if(i==0)
{
block[i].x=25;
block[i].y=25;
}
if(i>0)
{
block[i].x=block[i-1].x+50;
block[i].y=block[i-1].y;
eight++;
if(eight==8)
{
block[i].x=block[i-8].x;
block[i].y=block[i-1].y+50;
eight=0;
}
}
if(clicked)
{
if(hit(block[i].x,block[i].y,50,50,mouseX,mouseY))
{
snap.play();
block[i].reveal=true;
clicked=false;
if(block[i].mine==true)
{
for(z=0;z<=grid;z++)
{
if(block[z].mine==true)
block[z].reveal=true;
}
clearInterval(loop);
boom.play();
mod.beginPath()
mod.fillStyle="silver";
mod.rect(150,450,150,50);
mod.fill();
mod.strokeStyle="black";
mod.stroke();
mod.fillStyle="red";
mod.fillText("You lose!",177,480);
}
}
}
if(block[i].mine==false && block[i].ver==true)
{
if(i!=7 && i!=15 && i!=23 && i!=31 && i!=39 && i!=47 && i!=55 && i!=63)
{
if(block[i+1].mine)
block[i].number++;
}
if(i!=56 && i!=57 && i!=58 && i!=59 && i!=60 && i!=61 && i!=62 && i!=63 && i!=64)
{
if(block[i+8].mine)
block[i].number++;
}
if(i!=0 && i!=8 && i!=16 && i!=24 && i!=32 && i!=40 && i!=48 && i!=56 && i!=57 && i!=58 && i!=59 && i!=60 && i!=61 && i!=62 && i!=63 && i!=64)
{
if(block[i+7].mine)
block[i].number++;
}
if(i!=7 && i!=15 && i!=23 && i!=31 && i!=39 && i!=47 && i!=55 && i!=56 && i!=57 && i!=58 && i!=59 && i!=60 && i!=61 && i!=62 && i!=63 && i!=64)
{
if(block[i+9].mine)
block[i].number++;
}
if(i!=0 && i!=8 && i!=16 && i!=24 && i!=32 && i!=40 && i!=48 && i!=56 && i!=64)
{
if(block[i-1].mine)
block[i].number++;
}
if(i!=0 && i!=1 && i!=2 && i!=3 && i!=4 && i!=5 && i!=6 && i!=7)
{
if(block[i-8].mine)
block[i].number++;
}
if(i!=0 && i!=1 && i!=2 && i!=3 && i!=4 && i!=5 && i!=6 && i!=7 && i!=15 && i!=23 && i!=31 && i!=39 && i!=47 && i!=55 && i!=63)
{
if(block[i-7].mine)
block[i].number++;
}
if(i!=0 && i!=1 && i!=2 && i!=3 && i!=4 && i!=5 && i!=6 && i!=7 && i!=8 && i!=16 && i!=24 && i!=32 && i!=40 && i!=48 && i!=56 && i!=64)
{
if(block[i-9].mine)
block[i].number++;
}
block[i].ver=false;
}
}
for(t=0; t<=grid; t++)
{
if(block[t].mine==false && block[t].reveal==true && block[t].number==0)
{
if(t!=7 && t!=15 && t!=23 && t!=31 && t!=39 && t!=47 && t!=55 && t!=63)
{
if(block[t+1].mine==false)
block[t+1].reveal=true;
}
if(t!=56 && t!=57 && t!=58 && t!=59 && t!=60 && t!=61 && t!=62 && t!=63 && t!=64)
{
if(block[t+8].mine==false)
block[t+8].reveal=true;
}
if(t!=0 && t!=8 && t!=16 && t!=24 && t!=32 && t!=40 && t!=48 && t!=56 && t!=57 && t!=58 && t!=59 && t!=60 && t!=61 && t!=62 && t!=63 && t!=64)
{
if(block[t+7].mine==false)
block[t+7].reveal=true;
}
if(t!=7 && t!=15 && t!=23 && t!=31 && t!=39 && t!=47 && t!=55 && t!=56 && t!=57 && t!=58 && t!=59 && t!=60 && t!=61 && t!=62 && t!=63 && t!=64)
{
if(block[t+9].mine==false)
block[t+9].reveal=true;
}
if(t!=0 && t!=8 && t!=16 && t!=24 && t!=32 && t!=40 && t!=48 && t!=56 && t!=64)
{
if(block[t-1].mine==false)
block[t-1].reveal=true;
}
if(t!=0 && t!=1 && t!=2 && t!=3 && t!=4 && t!=5 && t!=6 && t!=7)
{
if(block[t-8].mine==false)
block[t-8].reveal=true;
}
if(t!=0 && t!=1 && t!=2 && t!=3 && t!=4 && t!=5 && t!=6 && t!=7 && t!=15 && t!=23 && t!=31 && t!=39 && t!=47 && t!=55 && t!=63)
{
if(block[t-7].mine==false)
block[t-7].reveal=true;
}
if(t!=0 && t!=1 && t!=2 && t!=3 && t!=4 && t!=5 && t!=6 && t!=7 && t!=8 && t!=16 && t!=24 && t!=32 && t!=40 && t!=48 && t!=56 && t!=64)
{
if(block[t-9].mine==false)
block[t-9].reveal=true;
}
}
if(b_count<grid)
{
drawbox(block[t].x,block[t].y,block[t].mine,block[t].reveal,block[t].number);
b_count++;
}
}
b_count=0;
wincheck=true;
for(w=0; w<=grid-1; w++)
{
if(block[w].mine==false && block[w].reveal==false)
wincheck=false;
}
if(wincheck)
{
clearInterval(loop);
mod.beginPath();
mod.fillStyle="gold";
mod.rect(25,25,400,400);
mod.fill();
mod.strokeStyle="black";
mod.stroke();
mod.font="20px Verdana";
mod.fillStyle="blue";
mod.fillText("You win!",175,215);
}
//Game Loop End
}

//Functions
function drawbox(x,y,mine,reveal,no)
{
if(reveal==false)
mod.drawImage(sqr,0,0,71,71,x,y,50,50);
if(reveal)
{
if(mine==false)
{
mod.beginPath();
mod.rect(x,y,50,50);
mod.fillStyle="white";
mod.fill();
mod.strokeStyle="black";
mod.stroke;
mod.fillStyle="black";
mod.fillText(no,x+17,y+30);
}
if(mine)
mod.drawImage(sharp,0,0,204,204,x,y,50,50);
}
}

function hit(x1,y1,w,h,x2,y2)
{
if(((x1<=x2) && (x1+w >=x2) )&& ((y1<=y2) &&(y1+h>=y2)))
{
return true;
}
else
{
return false;
}
}

function clk()
{
if (browser == "f" || browser == "m")
	{
	mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
	mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
	mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}
clicked=true;
}

//End