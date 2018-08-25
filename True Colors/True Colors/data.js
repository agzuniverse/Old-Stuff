//True Color
//Start
var stage=document.getElementById("game");
stage.width=1000;
stage.height=660;
var mod=stage.getContext("2d");
mod.font="20px Comic Sans MS";

//Listeners
stage.addEventListener("click",clk,false);

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
var run;
var loop;
var loop2;
var winloop;
var hs=localStorage.getItem("scoreK");
if(hs==null)
hs=0;
var hs2=localStorage.getItem("scoreC");
if(hs2==null)
hs2=0;
newhigh=false;;
var mouseX=0;
var mouseY=0;
var clicked=false;
var incr=0;
var yrand=true;
var correct=false;
var score=0;
var score2=0;
var rand1=0;
var rand2=0;
var rand3=0;
var clr="black";
var txt="black";
var c0="RED"
var c1="BLUE";
var c2="BLACK";
var c3="PINK";
var c4="VIOLET";
var c5="ORANGE";
var c6="YELLOW";
var c7="BROWN";
var c8="GREY";


//Gameloop
//loop=setInterval(func,30);

function func()
{
run=1;
//Draw background and buttons
mod.fillStyle="white";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="red";
mod.textAlign="center";
mod.font="40px Algerian";
mod.fillText("Score : "+score, 500,175);
mod.drawImage(btn,0,0,300,284,300,500,100,100);
mod.drawImage(btn,300,0,600,284,600,500,200,100);

//Circle increment updating
if(incr<2)
incr+=0.002
if(incr>=2)
winlink();

//Randomiser
if(yrand)
{
randomise();
yrand=false;
}

//Click checking
if(clicked)
{
if(hit(600,500,100,100,mouseX,mouseY) && correct==true)
{
yrand=true;
if(score>0)
score--;
}
if(hit(600,500,100,100,mouseX,mouseY) && correct==false)
{
yrand=true;
score++;
}
if(hit(300,500,100,100,mouseX,mouseY) && correct==true)
{
yrand=true;
score++;
}
if(hit(300,500,100,100,mouseX,mouseY) && correct==false)
{
yrand=true;
if(score>0)
score--;
}
clicked=false;
}

//Draw everything
draw(clr,txt);
//end of gameloop
}

//2nd gameloop
function func2()
{
run=2;
//Draw background and buttons
mod.fillStyle="white";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="red";
mod.textAlign="center";
mod.font="40px Algerian";
mod.fillText("Score : "+score2, 500,175);
mod.drawImage(btn,0,0,300,284,300,500,100,100);
mod.drawImage(btn,300,0,600,284,600,500,200,100);

//Circle increment updating
if(incr<2)
incr+=0.015;
if(incr>=2)
winlink2();

//Randomiser
if(yrand)
{
incr=0;
randomise();
yrand=false;
}

//Click checking
if(clicked)
{
if(hit(600,500,100,100,mouseX,mouseY)==true && correct==true)
winlink2();
if(hit(600,500,100,100,mouseX,mouseY)==true && correct==false)
{
yrand=true;
score2++;
}
if(hit(300,500,100,100,mouseX,mouseY)==true && correct==true)
{
yrand=true;
score2++;
}
if(hit(300,500,100,100,mouseX,mouseY)==true && correct==false)
{
//document.write("BEEE");
winlink2();
}
clicked=false;
}

//Draw everything
draw(clr,txt);
//end of gameloop2
}

//Functions

function winlink2()
{
clearInterval(loop2);
if(score2>hs2)
{
localStorage.setItem("scoreC",score2);
hs2=score2;
newhigh=true;
}
winloop=setInterval(ender,50);
}

function winlink()
{
clearInterval(loop);
if(score>hs)
{
localStorage.setItem("scoreK",score);
hs=score;
newhigh=true;
}
winloop=setInterval(ender,50);
}

function ender()
{
mod.textAlign="center";
mod.fillStyle="black";
mod.fillRect(275,150,450,350);
mod.fillStyle="white";
mod.font="30px Comic Sans MS";
if(run==1)
{
mod.fillText("Game over! Your Score : "+score,500,200);
mod.fillText("High score : "+hs,500,250);
}
if(run==2)
{
mod.fillText("Game over! Your Score : "+score2,500,200);
mod.fillText("High score : "+hs2,500,250);
}
if(newhigh)
{
mod.font="20px Comic Sans MS";
mod.fillStyle="blue";
mod.fillText("New highscore!",500,290);
}
mod.fillStyle="cyan";
mod.fillRect(300,300,400,50);
mod.fillRect(300,400,400,50);
mod.fillStyle="black";
mod.fillText("Play arcade mode",500,335);
mod.fillText("Play classic mode",500,435);
if(clicked)
{
clicked=false;
if(hit(300,300,400,50,mouseX,mouseY))
{
clearInterval(winloop);
resetvars();
loop=setInterval(func,30);
}
if(hit(300,400,400,50,mouseX,mouseY))
{
clearInterval(winloop);
resetvars();
loop2=setInterval(func2,30);
}

}

}

function resetvars()
{
run=0;
hs=localStorage.getItem("scoreK");
if(hs==null)
hs=0;
hs2=localStorage.getItem("scoreC");
if(hs2==null)
hs2=0;
newhigh=false;
mouseX=0;
mouseY=0;
clicked=false;
incr=0;
yrand=true;
correct=false;
score=0;
score2=0;
rand1=0;
rand2=0;
rand3=0;
clr="black";
txt="black";
}

function hit(x,y,xi,yi,mx,my)
{
if(x<mx && x+xi>mx && y<my && y+yi>my)
return true;
}

function randomise()
{
rand1=Math.floor(Math.random()*2);

if(rand1==0)
{
correct=true;
rand2=Math.floor(Math.random()*9);

if(rand2==0)
{
clr=c0;
txt=c0;
}
if(rand2==1)
{
clr=c1;
txt=c1;
}
if(rand2==2)
{
clr=c2;
txt=c2;
}
if(rand2==3)
{
clr=c3;
txt=c3;
}
if(rand2==4)
{
clr=c4;
txt=c4;
}
if(rand2==5)
{
clr=c5;
txt=c5;
}
if(rand2==6)
{
clr=c6;
txt=c6;
}
if(rand2==7)
{
clr=c7;
txt=c7;
}
if(rand2==8)
{
clr=c8;
txt=c8;
}
}

if(rand1==1)
{
rand2=Math.floor(Math.random()*9);
rand3=Math.floor(Math.random()*9);
if(rand2!=rand3)
{
correct=false;
if(rand2==0)
clr=c0;
if(rand2==1)
clr=c1;
if(rand2==2)
clr=c2;
if(rand2==3)
clr=c3;
if(rand2==4)
clr=c4;
if(rand2==5)
clr=c5;
if(rand2==6)
clr=c6;
if(rand2==7)
clr=c7;
if(rand2==8)
clr=c8;
if(rand3==0)
txt=c0;
if(rand3==1)
txt=c1;
if(rand3==2)
txt=c2;
if(rand3==3)
txt=c3;
if(rand3==4)
txt=c4;
if(rand3==5)
txt=c5;
if(rand3==6)
txt=c6;
if(rand3==7)
txt=c7;
if(rand3==8)
txt=c8;
}
else if(rand2==rand3)
{
correct=true;
if(rand2==0)
{
clr=c0;
txt=c0;
}
if(rand2==1)
{
clr=c1;
txt=c1;
}
if(rand2==2)
{
clr=c2;
txt=c2;
}
if(rand2==3)
{
clr=c3;
txt=c3;
}
if(rand2==4)
{
clr=c4;
txt=c4;
}
if(rand2==5)
{
clr=c5;
txt=c5;
}
if(rand2==6)
{
clr=c6;
txt=c6;
}
if(rand2==7)
{
clr=c7;
txt=c7;
}
if(rand2==8)
{
clr=c8;
txt=c8;
}

}

}

//End of randomiser
}

function draw(clr,txt)
{
mod.beginPath();
mod.strokeStyle=clr;
mod.lineWidth=10;
mod.arc(500,330,100,1.5*Math.PI,(3.5-incr)*Math.PI);
mod.stroke();

mod.fillStyle=clr;
mod.font="20px Comic Sans MS";
mod.textAlign="center";
mod.fillText(txt,500,330);
}

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