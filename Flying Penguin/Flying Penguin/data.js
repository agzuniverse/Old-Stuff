//Agent Pengu
//Start
var stage=document.getElementById("game");
stage.width=1000;
stage.height=660;
var mod=stage.getContext("2d");
mod.fillStyle="silver";
mod.font="20px Impact";

//Listeners
document.addEventListener("click",go,false);

//Declarations
var loop;
var corX=330;
var corY=450;
var gravity=25;
var move=false;
var frm=0;
var ray=new Array();
var score=0;
var high=localStorage.getItem("rk");
var pswitch=1;
var efrm=0;
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
var img=new Image();
img.ready=false;
img.onload=getready();
img.src="Assets/img/penguin.png";
function getready()
{
img.ready=true;
}

var bgp=new Image();
bgp.ready=false;
bgp.onload=getreadytwo();
bgp.src="Assets/img/bg.jpg";
function getreadytwo()
{
bgp.ready=true;
}

var ylpp=new Image();
ylpp.ready=false;
ylpp.onload=getreadyyl();
ylpp.src="Assets/img/yellow_pipes.png";
function getreadyyl()
{
ylpp.ready=true;
}

var rdpp=new Image();
rdpp.ready=false;
rdpp.onload=getreadyrd();
rdpp.src="Assets/img/red_pipes.png";
function getreadyrd()
{
rdpp.ready=true;
}

var grpp=new Image();
grpp.ready=false;
grpp.onload=getreadygr();
grpp.src="Assets/img/green_pipes.png";
function getreadygr()
{
grpp.ready=true;
}

var blpp=new Image();
blpp.ready=false;
blpp.onload=getreadybl();
blpp.src="Assets/img/blue_pipes.png";
function getreadybl()
{
blpp.ready=true;
}

var exp1=new Image();
exp1.ready=false;
exp1.onload=getreadyexp1();
exp1.src="Assets/img/exp1.png";
function getreadyexp1()
{
exp1.ready=true;
}

var exp2=new Image();
exp2.ready=false;
exp2.onload=getreadyexp2();
exp2.src="Assets/img/exp2.png";
function getreadyexp2()
{
exp2.ready=true;
}

var exp3=new Image();
exp3.ready=false;
exp3.onload=getreadyexp3();
exp3.src="Assets/img/exp3.png";
function getreadyexp3()
{
exp3.ready=true;
}

var exp4=new Image();
exp4.ready=false;
exp4.onload=getreadyexp4();
exp4.src="Assets/img/exp4.png";
function getreadyexp4()
{
exp4.ready=true;
}

var exp5=new Image();
exp5.ready=false;
exp5.onload=getreadyexp5();
exp5.src="Assets/img/exp5.png";
function getreadyexp5()
{
exp5.ready=true;
}

var exp6=new Image();
exp6.ready=false;
exp6.onload=getreadyexp6();
exp6.src="Assets/img/exp6.png";
function getreadyexp6()
{
exp6.ready=true;
}

var exp7=new Image();
exp7.ready=false;
exp7.onload=getreadyexp7();
exp7.src="Assets/img/exp7.png";
function getreadyexp7()
{
exp7.ready=true;
}

var csnd=new Audio();
csnd.ready=false;
csnd.onload=soundone();
csnd.src="Assets/audio/click.mp3";
function soundone()
{
csnd.ready=true;
}

var ksnd=new Audio();
ksnd.ready=false;
ksnd.onload=soundtwo();
ksnd.src="Assets/audio/end.mp3";
function soundtwo()
{
ksnd.ready=true;
}

mod.fillStyle="silver";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="black";
mod.fillText("Loading. Please Wait..........",330,330);
var loader=setInterval(loading,100);
function loading()
{
if(img.ready==true && bgp.ready==true && ylpp.ready==true && rdpp.ready==true && grpp.ready==true && blpp.ready==true && exp1.ready==true && exp2.ready==true && exp3.ready==true && exp4.ready==true && exp5.ready==true && exp6.ready==true && exp7.ready==true && csnd.ready==true && ksnd.ready==true)
{
mod.fillStyle="white";
mod.fillRect(275,600,300,50);
mod.fillStyle="black";
mod.fillText("Use mouse-click to play!",325,635);
mod.fillStyle="gold";
mod.fillRect(300,300,250,50);
mod.fillStyle="green";
mod.fillText("Play Game!",375,335);
}
if(mouseX>300 && mouseX<550 && mouseY>300 && mouseY<350 )
{
clearInterval(loader);
gstart=true;
loop=setInterval(func,33);
}
}

//Gameloop
function func()
{
mod.drawImage(bgp,0,0,1599,1199,0,0,1000,660);
//Bird
if((corY>stage.height) || (corY<0))
{
clearInterval(loop);
ksnd.play();
ending();
high=localStorage.getItem("rk");
mod.fillStyle="silver";
mod.fillRect(350,200,400,300);
mod.fillStyle="red";
mod.fillText("Game Over!",490,275);
mod.fillStyle="red";
mod.fillText("High Score : " + high,490,350);
mod.fillStyle="red";
mod.fillText("Your Score : " + score,490,425);
mod.fillStyle="black";
mod.fillText("Reload this page to play again.",430,300);
if(score>=high)
{
mod.fillStyle="blue";
mod.fillText("New Highscore!",490,450);
}
}
if(move)
{
gravity=25;
move=false;
}
gravity-=2;
corY-=gravity;
draw(corX,corY);
//Pipe
frm++;
if(frm==50)
{
var pipe=new Object();
pipe.onewhy=Math.floor(Math.random()*440);
pipe.twowhy=pipe.onewhy+200;
pipe.x=stage.width+100;
pipe.clr=pswitch;
ray.push(pipe);
pswitch++;
if(pswitch==5)
pswitch=1;
frm=0;
}
for(var i=ray.length-1;i>=0;i--)
{
ray[i].x-=5;	
if((ray[i].x+100)<0)
{
ray.splice(i,1);
}
else
{
obst(ray[i].onewhy,ray[i].twowhy,ray[i].x,ray[i].clr);
if(hit(corX,corY,ray[i].x,ray[i].onewhy))
{
clearInterval(loop);
ksnd.play();
ending()
high=localStorage.getItem("rk");
mod.fillStyle="silver";
mod.fillRect(350,200,400,300);
mod.fillStyle="red";
mod.fillText("Game Over!",490,275);
mod.fillStyle="red";
mod.fillText("High Score : " + high,490,350);
mod.fillStyle="red";
mod.fillText("Your Score : " + score,490,425);
mod.fillStyle="black";
mod.fillText("Reload this page to play again.",430,300);
if(score>=high)
{
mod.fillStyle="blue";
mod.fillText("New Highscore!",490,450);
}
}
}
if(ray[i].x==corX)
{
score++;
if(score>high)
localStorage.setItem("rk",score);
}
}
mod.fillStyle=("black");
mod.fillText("©AGZ Game Studios",5,25);
mod.fillStyle=("black");
mod.fillText("Score : " + score,5,50);
}



//Functions
function ending()
{
setTimeout(function(){
efrm++;
if(efrm==1)
mod.drawImage(exp1,0,0,40,40,corX,corY,50,50);
if(efrm==2)
mod.drawImage(exp2,0,0,40,40,corX,corY,50,50);
if(efrm==3)
mod.drawImage(exp3,0,0,40,40,corX,corY,50,50);
if(efrm==4)
mod.drawImage(exp4,0,0,40,40,corX,corY,50,50);
if(efrm==5)
mod.drawImage(exp5,0,0,40,40,corX,corY,50,50);
if(efrm==6)
mod.drawImage(exp6,0,0,40,40,corX,corY,50,50);
if(efrm==7)
mod.drawImage(exp7,0,0,40,40,corX,corY,50,50);
if(efrm<8)
ending();
},100)
}

function draw(cX,cY)
{
mod.drawImage(img,0,0,201,227,cX,cY,50,50);
}

function obst(oneY,twoY,X,CLR)
{
if(browser=="c")
{
if(CLR==1)
{
mod.drawImage(ylpp,65,0,128,432,X,0,150,oneY);
mod.drawImage(ylpp,0,0,64,430,X,twoY,75,660);
}
if(CLR==2)
{
mod.drawImage(rdpp,65,0,128,432,X,0,150,oneY);
mod.drawImage(rdpp,0,0,64,430,X,twoY,75,660);
}
if(CLR==3)
{
mod.drawImage(grpp,0,0,64,430,X,0,75,oneY);
mod.drawImage(grpp,65,0,128,432,X,twoY,150,660);
}
if(CLR==4)
{
mod.drawImage(blpp,0,0,64,430,X,0,75,oneY);
mod.drawImage(blpp,65,0,128,432,X,twoY,150,660);
}
}
if(browser=="f")
{
if(CLR==1)
{
mod.drawImage(ylpp,65,0,128,432,X,0,75,oneY);
mod.drawImage(ylpp,0,0,64,430,X,twoY,75,660);
}
if(CLR==2)
{
mod.drawImage(rdpp,65,0,128,432,X,0,75,oneY);
mod.drawImage(rdpp,0,0,64,430,X,twoY,75,660);
}
if(CLR==3)
{
mod.drawImage(grpp,0,0,64,430,X,0,75,oneY);
mod.drawImage(grpp,65,0,128,432,X,twoY,75,660);
}
if(CLR==4)
{
mod.drawImage(blpp,0,0,64,430,X,0,75,oneY);
mod.drawImage(blpp,65,0,128,432,X,twoY,75,660);
}
mod.fillStyle="red";
mod.fillText("This game works properly with Google Chrome!",5,630);
}
if(browser=="m" || browser=="s")
{
clearInterval(loop);
mod.fillStyle="silver";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="red";
mod.fillText("YOUR BROWSER DOES NOT SUPPORT THIS GAME.",400,300);
mod.fillStyle="red";
mod.fillText("Please use Google Chrome or Mozilla Firefox",400,330);
}
}

function hit(birdX,birdY,pipeX,oneY)
{
if((birdX+50>pipeX) && (birdX+50<pipeX+75) &&((birdY<oneY) || (birdY+50>oneY+200)))
return true;
else
return false;
}

function go(event)
{
if(gstart==false)
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
if(gstart)
{
csnd.play();
move=true;
}
}
//The End