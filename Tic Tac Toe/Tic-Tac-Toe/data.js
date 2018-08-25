//Start
var stage=document.getElementById("game");
stage.width=1000;
stage.height=660;
var mod=stage.getContext("2d");
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

//Listeners
document.addEventListener("click",clk,false);

//Declarations
var clicked=false;
var mouseX;
var mouseY;
var player=1;
var p1=false;
var p2=false;
var p3=false;
var p4=false;
var p5=false;
var p6=false;
var p7=false;
var p8=false;
var p9=false;
var v1=1;
var v2=1;
var v3=1;
var v4=1;
var v5=1;
var v6=1;
var v7=1;
var v8=1;
var v9=1;
var c1=true;
var c2=true;
var c3=true;
var c4=true;
var c5=true;
var c6=true;
var c7=true;
var c8=true;
var c9=true;
var winner=false;
var loop=setInterval(func,33);

//Preload

//Gameloop
function func()
{
mod.fillStyle="white";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="silver";
mod.fillRect(15,15,50,50);
mod.fillStyle="silver";
mod.fillRect(70,15,50,50);
mod.fillStyle="silver";
mod.fillRect(125,15,50,50);
mod.fillStyle="silver";
mod.fillRect(15,70,50,50);
mod.fillStyle="silver";
mod.fillRect(70,70,50,50);
mod.fillStyle="silver";
mod.fillRect(125,70,50,50);
mod.fillStyle="silver";
mod.fillRect(15,125,50,50);
mod.fillStyle="silver";
mod.fillRect(70,125,50,50);
mod.fillStyle="silver";
mod.fillRect(125,125,50,50);
if(clicked)
{

if(hit(mouseX,mouseY,15,15,50,50))
{
if(c1)
{
p1=true;
v1=player;
if(player==1)
player=2;
else
player=1;
c1=false;
}
}
if(hit(mouseX,mouseY,70,15,50,50))
{
if(c2)
{
p2=true;
v2=player;
if(player==1)
player=2;
else
player=1;
c2=false;
}
}
if(hit(mouseX,mouseY,125,15,50,50))
{
if(c3)
{
p3=true;
v3=player;
if(player==1)
player=2;
else
player=1;
c3=false;
}
}
if(hit(mouseX,mouseY,15,70,50,50))
{
if(c4)
{
p4=true;
v4=player;
if(player==1)
player=2;
else
player=1;
c4=false;
}
}
if(hit(mouseX,mouseY,70,70,50,50))
{
if(c5)
{
p5=true;
v5=player;
if(player==1)
player=2;
else
player=1;
c5=false;
}
}
if(hit(mouseX,mouseY,125,70,50,50))
{
if(c6)
{
p6=true;
v6=player;
if(player==1)
player=2;
else
player=1;
c6=false;
}
}
if(hit(mouseX,mouseY,15,125,50,50))
{
if(c7)
{
p7=true;
v7=player;
if(player==1)
player=2;
else
player=1;
c7=false;
}
}
if(hit(mouseX,mouseY,70,125,50,50))
{
if(c8)
{
p8=true;
v8=player;
if(player==1)
player=2;
else
player=1;
c8=false;
}
}
if(hit(mouseX,mouseY,125,125,50,50))
{
if(c9)
{
p9=true;
v9=player;
if(player==1)
player=2;
else
player=1;
c9=false;
}
}

clicked=false;
}

//Render function call

drawsign(v1,p1,35,45);
drawsign(v2,p2,90,45);
drawsign(v3,p3,145,45);
drawsign(v4,p4,35,100);
drawsign(v5,p5,90,100);
drawsign(v6,p6,145,100);
drawsign(v7,p7,35,155);
drawsign(v8,p8,90,155);
drawsign(v9,p9,145,155);

//Win Condition Check

//Player one

if(v1==1 && v2==1 && v3==1 && p1==true && p2==true && p3==true)
{
winner=true;
win1();
}
if(v1==1 && v4==1 && v7==1 && p1==true && p4==true && p7==true)
{
winner=true;
win1();
}
if(v4==1 && v5==1 && v6==1 && p4==true && p5==true && p6==true)
{
winner=true;
win1();
}
if(v7==1 && v8==1 && v9==1 && p7==true && p8==true && p9==true)
{
winner=true;
win1();
}
if(v2==1 && v5==1 && v8==1 && p2==true && p5==true && p8==true)
{
winner=true;
win1();
}
if(v3==1 && v6==1 && v9==1 && p3==true && p6==true && p9==true)
{
winner=true;
win1();
}
if(v1==1 && v5==1 && v9==1 && p1==true && p5==true && p9==true)
{
winner=true;
win1();
}
if(v3==1 && v5==1 && v7==1 && p3==true && p5==true && p7==true)
{
winner=true;
win1();
}


//Player two 

if(v1==2 && v2==2 && v3==2 && p1==true && p2==true && p3==true)
{
winner=true;
win2();
}
if(v1==2 && v4==2 && v7==2 && p1==true && p4==true && p7==true)
{
winner=true;
win2();
}
if(v4==2 && v5==2 && v6==2 && p4==true && p5==true && p6==true)
{
winner=true;
win2();
}
if(v7==2 && v8==2 && v9==2 && p7==true && p8==true && p9==true)
{
winner=true;
win2();
}
if(v2==2 && v5==2 && v8==2 && p2==true && p5==true && p8==true)
{
winner=true;
win2();
}
if(v3==2 && v6==2 && v9==2 && p3==true && p6==true && p9==true)
{
winner=true;
win2();
}
if(v1==2 && v5==2 && v9==2 && p1==true && p5==true && p9==true)
{
winner=true;
win2();
}
if(v3==2 && v5==2 && v7==2 && p3==true && p5==true && p7==true)
{
winner=true;
win2();
}

//Draw
if(p1==true && p2==true && p3==true && p4==true && p5==true && p6==true && p7==true && p8==true && p9==true && winner==false)
draw();

//GameLoop ends

}

//Functions

//Victory to none

function draw()
{
mod.fillStyle="cyan";
mod.fillRect(200,15,175,35);
mod.fillStyle="black";
mod.fillText("Draw!",275,40);
mod.fillStyle="gold";
mod.fillRect(200,65,175,35);
mod.fillStyle="black";
mod.fillText("Try Again!",230,90);
if(hit(mouseX,mouseY,200,65,175,35))
{
clearInterval(loop);
restart();
}
}

//Victory to 1

function win1()
{
mod.fillStyle="cyan";
mod.fillRect(200,15,175,35);
mod.fillStyle="black";
mod.fillText("Player 1 wins!",215,40);
mod.fillStyle="gold";
mod.fillRect(200,65,175,35);
mod.fillStyle="black";
mod.fillText("Try Again!",230,90);
if(hit(mouseX,mouseY,200,65,175,35))
{
clearInterval(loop);
restart();
}
}

//Victory to 2

function win2()
{
mod.fillStyle="cyan";
mod.fillRect(200,15,175,35);
mod.fillStyle="black";
mod.fillText("Player 2 wins!",215,40);
mod.fillStyle="gold";
mod.fillRect(200,65,175,35);
mod.fillStyle="black";
mod.fillText("Try Again!",230,90);
if(hit(mouseX,mouseY,200,65,175,35))
{
clearInterval(loop);
restart();
}
}

//Restart game

function restart()
{
clicked=false;
player=1;
p1=false;
p2=false;
p3=false;
p4=false;
p5=false;
p6=false;
p7=false;
p8=false;
p9=false;
v1=1;
v2=1;
v3=1;
v4=1;
v5=1;
v6=1;
v7=1;
v8=1;
v9=1;
c1=true;
c2=true;
c3=true;
c4=true;
c5=true;
c6=true;
c7=true;
c8=true;
c9=true;
winner=false;
loop=setInterval(func,33);
}

//Get Hit Point

function hit(mX,mY,x,y,w,h)
{
if(((x<=mX) && (x+w>=mX)) && ((y<=mY) && (y+h>=mY)))
return true;
else
return false;
}

//Drawing Function
function drawsign(pl,reveal,xcor,ycor)
{
if(pl==1)
{
if(reveal==true)
{
mod.fillStyle="red";
mod.fillText("X",xcor,ycor);
}
}

if(pl==2)
{
if(reveal==true)
{
mod.fillStyle="blue";
mod.fillText("0",xcor,ycor);
}
}

}

//Click event handler

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

//End