var stage=document.getElementById("game");
stage.width=750;
stage.height=600;
var mod=stage.getContext("2d");
mod.fillStyle="white";
mod.font="20px Algerian";
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


var clicked=false;
var score=0;
var lives=10;
var core=0.02;
var rect=new Array();
var mouseX;
var mouseY;
var loop=setInterval(func,33);
stage.addEventListener("click",clk,false);

function clk(event)
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
function func()
{
mod.fillStyle="silver";
mod.fillRect(0,0,stage.width,stage.height);
if(Math.random()<0.005)
{
core+=0.01;
}
if(Math.random()<core)
{
var box=new Object();
box.x=Math.floor(Math.random()*(stage.width-55));
box.y=-50;
rect.push(box);
}
for(var i=rect.length-1; i>=0; i--)
{
rect[i].y++;
if(rect[i].y>stage.height)
{
rect.splice(i,1);
lives--;
}
else
{
drawbox(rect[i].x,rect[i].y);
if(clicked)
{
if(hit(rect[i].x,rect[i].y,50,50,mouseX,mouseY))
{
score++;
rect.splice(i,1);
}
}
}
}
clicked=false;
mod.fillStyle="gold";
mod.fillText("©AGZ game studios 2014",2,20);
mod.fillStyle="red";
mod.fillText("Score : " + score,50,50);
mod.fillStyle="red";
mod.fillText("Lives : " + lives, 550,50);
if(lives==0)
{
clearInterval(loop);
mod.fillStyle="red";
mod.fillText("Game Over! Your Score: " + score,250,250);
mod.fillStyle="red";
mod.fillText("Reload to play again.",250,300);
}
}
function drawbox(cX,cY)
{
mod.beginPath();
mod.rect(cX,cY,50,50);
mod.fillStyle="blue";
mod.fill();
mod.strokeStyle="black";
mod.stroke();
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