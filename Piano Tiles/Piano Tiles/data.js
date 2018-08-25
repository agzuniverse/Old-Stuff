//Piano Tiles
//Start
var stage=document.getElementById("game");
stage.width=1000;
stage.height=660;
var mod=stage.getContext("2d");
mod.font="20px Comic Sans MS";

//Listeners
document.addEventListener("click",clicker,false);

//Browser detection
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

//Variables
var high=localStorage.getItem("HS");
var clicked=false;
var mouseX=0;
var mouseY=0;
var toggler=0;
var tiles=new Array();
var framecount=0;
var xIncr=300;
var rand=-1;
var score=0;
var incr=30;
var frmcnt=25;
var loop;
loop=setInterval(func,30);

//Gameloop
function func()
{
//Filler
mod.fillStyle="silver";
mod.fillRect(0,0,stage.width,stage.height)

//Game on!
if(GREENFLAG)
{

//Coordinate clearing
if(toggler==0)
{
clicked=false;
mouseX=0;
mouseY=0;
toggler=1;
}

framecount++;
mod.fillStyle="cyan";
mod.fillText("Score : "+score,50,50);
mod.fillText("©AGZ Game Studios",50,100);

//Object creation
if(framecount==frmcnt)
{
framecount=0;
xIncr=300;
rand=Math.floor(Math.random()*4);
for(var z=0;z<=3;z++)
{
var tile=new Object();
tile.x=xIncr;
tile.y=-125;
tile.clr=0;
if(rand==0 && z==0)
tile.clr=1;
if(rand==1 && z==1)
tile.clr=1;
if(rand==2 && z==2)
tile.clr=1;
if(rand==3 && z==3)
tile.clr=1;

xIncr+=80
tiles.push(tile);
}
}

//Reverse loop
for(var i=tiles.length-1; i>=0; i--)
{
tiles[i].y+=5;

//Splicing
if(tiles[i].y>stage.height+55)
{
tiles.splice(i,1);
}
else
{

//Rendering
drawbox(tiles[i].x,tiles[i].y,tiles[i].clr)
if(clicked)
{

if(hit(tiles[i].x,tiles[i].y,mouseX,mouseY) && tiles[i].clr==1)
{
clicked=false;
mouseX=0;
mouseY=0;
score++;
incr-=0.5;
tiles[i].clr=0;
speed();
}

if(hit(tiles[i].x,tiles[i].y,mouseX,mouseY) && tiles[i].clr==0)
{
clicked=false;
mouseX=0;
mouseY=0;
tiles[i].clr=2;
}

}

if(tiles[i].y>=600 && tiles[i].clr==1)
{
tiles[i].clr=2;
}

}

//End of reverse loop
}

}
//End of GameLoop
}

//Functions

//Click Handler
function clicker(event)
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

function speed()
{
clearInterval(loop);
loop=setInterval(func,incr);
}

//Hit checker
function hit(x1,y1,mX,mY)
{
if((mX>x1 && mX<x1+80) && (mY>y1 && mY<y1+125))
return true;
else
return false;
}

//Tile Drawer
function drawbox(cX,cY,clr)
{
mod.beginPath();
mod.rect(cX,cY,80,125)
if(clr==1)
mod.fillStyle="black";
if(clr==2)
mod.fillStyle="red";
if(clr==0)
mod.fillStyle="white";
mod.fill();
mod.strokeStyle="black";
mod.stroke();
if(clr==2)
{
clearInterval(loop);
gameover();
}
}

//Game over handler
function gameover()
{
//Score null value check
if(high==null)
{
localStorage.setItem("HS",0);
high=localStorage.getItem("HS");
}

//New highscore setting
if(score>high)
{
localStorage.setItem("HS",score);
}

REDLIGHT=true;
}

//End