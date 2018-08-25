//Pong
//Start
var stage=document.getElementById("game");
stage.width="1000";
stage.height="660";
var mod=stage.getContext("2d");
mod.fillStyle="silver";
mod.font="20px Algerian";

//Listeners
document.addEventListener("keydown",pdl,false);
document.addEventListener("keyup",stop,false);
document.addEventListener("click",starter,false);

//Delcarations
var loop;
var restart;
var onex=425;
var twox=425;
var moveone=false;
var movetwo=false;
var dirone=0;
var dirtwo=0;
var cirx=460;
var ciry=290;
var cir2x=400;
var cir2y=350;
var xincr=5;
var yincr=5;
var x2incr=-5;
var y2incr=-5;
var lifeone=5;
var lifetwo=5;
var mouseX;
var mouseY;
var gstart=false;

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

//Preload
var ball= new Image();
ball.ready=false;
ball.onload=ballready();
ball.src="Assets/img/ball.png";
function ballready()
{
ball.ready=true;
}

var paddle= new Image();
paddle.ready=false;
paddle.onload=pdlready();
paddle.src="Assets/img/bluepaddle.png";
function pdlready()
{
paddle.ready=true;
}

var bounce= new Audio();
bounce.ready=false;
bounce.onload=bcready();
bounce.src="Assets/audio/bounce.mp3";
function bcready()
{
bounce.ready=true;
}

mod.fillStyle="grey";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="black";
mod.fillText("Loading.Please Wait.",330,330);
var preloader=setInterval(loader,100);
function loader()
{
if(ball.ready==true && paddle.ready==true && bounce.ready==true)
{
mod.fillStyle="white";
mod.fillRect(150,600,660,50);
mod.fillStyle="black";
mod.fillText("Use Z and X for first paddle and N and M for second paddle!",160,635);
mod.fillStyle="gold";
mod.fillRect(300,300,250,50);
mod.fillStyle="green";
mod.fillText("Play Game!",365,330);
gstart=true;
}
if(mouseX>300 && mouseX<550 && mouseY>300 && mouseY<350 && gstart==true)
{
clearInterval(preloader);
loop=setInterval(func,33);
}
}

//GameLoop
function func()
{
mod.fillStyle="silver";
mod.fillRect(0,0,stage.width,stage.height);
mod.beginPath();
mod.rect(5,15,stage.width-10,stage.height-35);
mod.fillStyle="silver";
mod.fill();
mod.strokeStyle="black";
mod.stroke();
if(onex<=5 && dirone==1)
moveone=false;
if(onex+150>=stage.width-5 && dirone==2)
moveone=false;
if(twox<=5 && dirtwo==1)
movetwo=false;
if(twox+150>=stage.width-5 && dirtwo==2)
movetwo=false;
if(moveone)
{
//Paddles
if(dirone==2)
onex+=10;
else if(dirone==1)
onex-=10;
}
if(movetwo)
{
if(dirtwo==2)
twox+=10;
else if(dirtwo==1)
twox-=10;
}
draw(onex,twox);

//Ball 1
if(cirx+20==990)
{
xincr=-5;
bounce.play();
}
if(cirx==10)
{
xincr=5;
bounce.play();
}
if(cirx>twox && cirx<twox+150 && ciry+20==620)
{
yincr=-5;
bounce.play();
}
if(cirx>onex && cirx<onex+150 && ciry==40)
{
yincr=5;
bounce.play();
}
if(ciry==15)
{
lifeone--;
cirx=500;
ciry=575;
}
if(ciry+20==645)
{
lifetwo--;
cirx=500;
ciry=75;
}

//Ball 2
if(cir2x+20==990)
{
x2incr=-5;
bounce.play();
}
if(cir2x==10)
{
x2incr=5;
bounce.play();
}
if(cir2x>twox && cir2x<twox+150 && cir2y+20==620)
{
y2incr=-5;
bounce.play();
}
if(cir2x>onex && cir2x<onex+150 && cir2y==40)
{
y2incr=5;
bounce.play();
}
if(cir2y==15)
{
lifeone--;
cir2x=300;
cir2y=375;
}
if(cir2y+20==645)
{
lifetwo--;
cir2x=500;
cir2y=75;
}
if(lifeone==0)
{
clearInterval(loop);
mod.fillStyle="gold";
mod.fillRect(350,250,300,200);
mod.font="20px Algerian";
mod.strokeStyle="red";
mod.strokeText("Player Two Wins!",415,350);
mod.fillStyle="cyan";
mod.fillRect(350,375,300,75);
mod.fillStyle="brown";
mod.fillText("Click here to restart",380,417);
mouseX=0;
mouseY=0;
restart=setInterval(goAgain,100);
}
if(lifetwo==0)
{
clearInterval(loop);
mod.fillStyle="gold";
mod.fillRect(350,250,300,200);
mod.font="20px Algerian";
mod.strokeStyle="red";
mod.strokeText("Player One Wins!",415,350);
mod.fillStyle="cyan";
mod.fillRect(350,375,300,75);
mod.fillStyle="brown";
mod.fillText("Click here to restart",380,417);
mouseX=0;
mouseY=0;
restart=setInterval(goAgain,100);
}
cirx+=xincr;
ciry+=yincr;
drawcircle(cirx,ciry);
cir2x+=x2incr;
cir2y+=y2incr;
drawcircle(cir2x,cir2y);

mod.font="15px Impact";
mod.fillStyle="red";
mod.fillText("Lives Left: " + lifeone, 700,14);
mod.fillStyle="red";
mod.fillText("Lives Left: " + lifetwo, 700,654);
mod.fillText("©AGZ Game Studios",5,14);
}

//Resetting loop

function goAgain()
{
if(hit(mouseX,mouseY,350,375,300,75))
{
clearInterval(restart);
onex=425;
twox=425;
moveone=false;
movetwo=false;
dirone=0;
dirtwo=0;
cirx=460;
ciry=290;
cir2x=400;
cir2y=350;
xincr=5;
yincr=5;
x2incr=-5;
y2incr=-5;
lifeone=5;
lifetwo=5;
gstart=false;
loop=setInterval(func,33);
}
}
//Functions

function hit(mX,mY,x,y,w,h)
{
if(((x<=mX) && (x+w>=mX)) && ((y<=mY) && (y+h>=mY)))
return true;
else
return false;
}

function drawcircle(cirX,cirY)
{
mod.drawImage(ball,0,0,125,125,cirX,cirY,20,20);
}

function draw(oneX,twoX)
{
mod.drawImage(paddle,2,0,105,23,oneX,15,150,25);
mod.drawImage(paddle,2,0,105,23,twoX,stage.height-45,150,25);
}

function pdl(event)
{
var key=String.fromCharCode(event.keyCode);
if(key=="Z")
{
moveone=true;
dirone=1;
}
else if(key=="X")
{
moveone=true;
dirone=2;
}
else if(key=="N")
{
movetwo=true;
dirtwo=1;
}
else if(key=="M")
{
movetwo=true;
dirtwo=2;
}
}

function stop(event)
{
var key=String.fromCharCode(event.keyCode);
if(key=="Z" || key=="X")
moveone=false;
else if(key=="N" || key=="M")
movetwo=false;
}

function starter(event)
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
}
//The End