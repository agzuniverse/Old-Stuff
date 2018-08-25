//Start Game
var stage=document.getElementById("game");
stage.height=660;
stage.width=1000;
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


//Declarations
var loader;
var loop;
var restarter;
var mouseX=0;
var mouseY=0;
var clicked=false;
var xcor=425;
var moveleft=false;
var moveright=false;
var countdown=20;
var checkrandom=true;
var eggtype=0;
var eggplace=0;
var ey=100;
var timer=60;
var score=0;
var timercount=0;

//Listeners
document.addEventListener("click",clk,false);
document.addEventListener("keydown",kdn,false);
document.addEventListener("keyup",kup,false);

//Preload

var chopper=new Image();
chopper.ready=false;
chopper.onload=chopper_ready();
chopper.src="img/helicopter.png";
function chopper_ready()
{
chopper.ready=true;
}

var missile=new Image();
missile.ready=false;
missile.onload=missile_ready();
missile.src="img/missile.png";
function missile_ready()
{
missile.ready=true;
}

var bomb=new Image();
bomb.ready=false;
bomb.onload=bomb_ready();
bomb.src="img/bomb.png";
function bomb_ready()
{
bomb.ready=true;
}

var coins=new Image();
coins.ready=false;
coins.onload=coins_ready();
coins.src="img/coins.png";
function coins_ready()
{
coins.ready=true;
}

var pouch=new Image();
pouch.ready=false;
pouch.onload=pouch_ready();
pouch.src="img/coins_pouch.png";
function pouch_ready()
{
pouch.ready=true;
}

var bag=new Image();
bag.ready=false;
bag.onload=bag_ready();
bag.src="img/coins_bag.png";
function bag_ready()
{
bag.ready=true;
}

var basket=new Image();
basket.ready=false;
basket.onload=basket_ready();
basket.src="img/basket.png";
function basket_ready()
{
basket.ready=true;
}

var sky=new Image();
sky.ready=false;
sky.onload=sky_ready();
sky.src="img/sky.png";
function sky_ready()
{
sky.ready=true;
}

var end=new Audio();
end.ready=false;
end.onload=end_ready();
end.src="img/explosion.mp3";
function end_ready()
{
end.ready=true;
}

var cash=new Audio();
cash.ready=false;
cash.onload=cash_ready();
cash.src="img/cash.mp3";
function cash_ready()
{
cash.ready=true;
}

loader=setInterval(preload,100);

function preload()
{
mod.fillStyle="black";
mod.fillText("Loading...........",350,300);
if(bag.ready==true && pouch.ready==true && coins.ready==true && bomb.ready==true && missile.ready==true && chopper.ready==true && sky.ready==true && cash.ready==true && end.ready==true)
{
mod.drawImage(sky,0,0,508,342,0,0,stage.width,stage.height);
mod.fillStyle="black";
mod.fillRect(425,200,200,75);
mod.fillRect(425,350,200,75);
mod.fillStyle="white";
mod.font="20px Algerian";
mod.fillText("Start Game",460,240);
mod.fillText("Instructions",460,390);
mod.font="50px Comic Sans MS";
mod.fillStyle="red";
mod.fillText("Chopper Dropper",330,100);
mod.font="30px Comic Sans MS";
mod.fillText("A G Z Game Studios",390,165);
if(mouseX>425 && mouseX<425+200 && mouseY>350 && mouseY<350+75)
alert("Use the left and right arrow keys or A and D keys to move the basket. Catch the coins. Avoid the explosives!");
if(mouseX>425 && mouseX<425+200 && mouseY>200 && mouseY<200+75)
{
clearInterval(loader);
loop=setInterval(func,33);
}
}
mouseX=0;
mouseY=0;
}

//Game Loop
function func()
{
mod.font="20px Algerian";
mod.drawImage(sky,0,0,508,342,0,0,stage.width,stage.height);
mod.fillStyle="red";
mod.fillText("A G Z Game Studios",375,25);

mod.drawImage(chopper,0,0,672,277,50,50,175,100);
mod.drawImage(chopper,0,0,672,277,225,50,175,100);
mod.drawImage(chopper,0,0,672,277,400,50,175,100);
mod.drawImage(chopper,0,0,672,277,575,50,175,100);
mod.drawImage(chopper,0,0,672,277,750,50,175,100);

mod.drawImage(basket,1,393,1993,1633,xcor,550,100,100);

//Movement Increment
if(xcor<=10)
moveleft=false;
if(xcor+80>=stage.width)
moveright=false;

if(moveleft==true)
xcor-=16;
if(moveright==true)
xcor+=16;

//Eggs
countdown--;
if(countdown<=0)
drawegg();

if(hit(eggtype,eggplace,ey,xcor))
{
countdown=20;
ey=100;
checkrandom=true;
}

timercount++
if(timercount==30)
{
timer--;
timercount=0;
}

mod.fillStyle="black";
mod.fillText("Timer : " + timer,25,25);
mod.fillText("Score : " +score,200,25);

if(timer<=0)
endgame();

//End of GameLoop
}

//Restarter loop
function restart()
{
mod.fillStyle="black";
mod.fillRect(250,100,465,180);
mod.fillStyle="cyan";
mod.fillRect(265,115,425,50);
mod.fillRect(265,200,425,50);
mod.fillStyle="black";
mod.font="30px Comic Sans MS";
mod.fillText("Game Over!   Your Score : " +score,270,150);
mod.fillText("Click here to restart",325,230);
if(mouseX>265 && mouseX<265+425 && mouseY>200 && mouseY<250)
{
mod.font="20px Algerian";
mouseX=0;
mouseY=0;
timer=60;
score=0;
timercount=0;
countdown=20;
eggtype=0;
eggplace=0;
xcor=425;
ey=100;
clearInterval(restarter);
loop=setInterval(func,33);
}
}

//Functions
function endgame()
{
mouseX=0;
mouseY=0;
clearInterval(loop);
restarter=setInterval(restart,50);
}


function drawegg()
{
if(checkrandom)
{
eggplace=Math.floor(Math.random()*5);
eggtype=Math.floor(Math.random()*5);
checkrandom=false;
}
if(eggplace==0)
{
if(eggtype==0)
mod.drawImage(bag,0,0,1127,1275,50,ey,50,50);
if(eggtype==1)
mod.drawImage(pouch,109,73,1197,1201,50,ey,50,50);
if(eggtype==2)
mod.drawImage(coins,0,0,256,256,50,ey,50,50);
if(eggtype==3)
mod.drawImage(bomb,0,0,705,365,50,ey,100,50);
if(eggtype==4)
mod.drawImage(missile,0,0,207,400,50,ey,50,100);
}
if(eggplace==1)
{
if(eggtype==0)
mod.drawImage(bag,0,0,1127,1275,225,ey,50,50);
if(eggtype==1)
mod.drawImage(pouch,109,73,1197,1201,225,ey,50,50);
if(eggtype==2)
mod.drawImage(coins,0,0,256,256,225,ey,50,50);
if(eggtype==3)
mod.drawImage(bomb,0,0,705,365,225,ey,100,50);
if(eggtype==4)
mod.drawImage(missile,0,0,207,400,225,ey,50,100);
}
if(eggplace==2)
{
if(eggtype==0)
mod.drawImage(bag,0,0,1127,1275,400,ey,50,50);
if(eggtype==1)
mod.drawImage(pouch,109,73,1197,1201,400,ey,50,50);
if(eggtype==2)
mod.drawImage(coins,0,0,256,256,400,ey,50,50);
if(eggtype==3)
mod.drawImage(bomb,0,0,705,365,400,ey,100,50);
if(eggtype==4)
mod.drawImage(missile,0,0,207,400,400,ey,50,100);
}
if(eggplace==3)
{
if(eggtype==0)
mod.drawImage(bag,0,0,1127,1275,575,ey,50,50);
if(eggtype==1)
mod.drawImage(pouch,109,73,1197,1201,575,ey,50,50);
if(eggtype==2)
mod.drawImage(coins,0,0,256,256,575,ey,50,50);
if(eggtype==3)
mod.drawImage(bomb,0,0,705,365,575,ey,100,50);
if(eggtype==4)
mod.drawImage(missile,0,0,207,400,575,ey,50,100);
}
if(eggplace==4)
{
if(eggtype==0)
mod.drawImage(bag,0,0,1127,1275,750,ey,50,50);
if(eggtype==1)
mod.drawImage(pouch,109,73,1197,1201,750,ey,50,50);
if(eggtype==2)
mod.drawImage(coins,0,0,256,256,750,ey,50,50);
if(eggtype==3)
mod.drawImage(bomb,0,0,705,365,750,ey,100,50);
if(eggtype==4)
mod.drawImage(missile,0,0,207,400,750,ey,50,100);
}
ey+=10;
if(ey>=650)
{
countdown=20;
ey=100;
checkrandom=true;
}
}

function hit(type,place,y,x)
{

if(place==0)
{

if( (75>xcor && 75<xcor+75) && (y>550 && y<550+75) )
{
if(type==0)
{
score+=30;
cash.play();
}
if(type==1)
{
score+=20;
cash.play();
}
if(type==2)
{
score+=10;
cash.play();
}
if(type==3)
{
timer-=10;
end.play();
}
if(type==4)
{
timer-=20;
end.play();
}
return true;
}

}

if(place==1)
{
if( (250>xcor && 250<xcor+75) && (y>550 && y<550+75) )
{
if(type==0)
{
score+=30;
cash.play();
}
if(type==1)
{
score+=20;
cash.play();
}
if(type==2)
{
score+=10;
cash.play();
}
if(type==3)
{
timer-=10;
end.play();
}
if(type==4)
{
timer-=20;
end.play();
}
return true;
}
}

if(place==2)
{
if( (425>xcor && 425<xcor+75) && (y>550 && y<550+75) )
{
if(type==0)
{
score+=30;
cash.play();
}
if(type==1)
{
score+=20;
cash.play();
}
if(type==2)
{
score+=10;
cash.play();
}
if(type==3)
{
timer-=10;
end.play();
}
if(type==4)
{
timer-=20;
end.play();
}
return true;
}
}

if(place==3)
{
if( (600>xcor && 600<xcor+75) && (y>550 && y<550+75) )
{
if(type==0)
{
score+=30;
cash.play();
}
if(type==1)
{
score+=20;
cash.play();
}
if(type==2)
{
score+=10;
cash.play();
}
if(type==3)
{
timer-=10;
end.play();
}
if(type==4)
{
timer-=20;
end.play();
}
return true;
}
}

if(place==4)
{
if( (775>xcor && 775<xcor+75) && (y>550 && y<550+75) )
{
if(type==0)
{
score+=30;
cash.play();
}
if(type==1)
{
score+=20;
cash.play();
}
if(type==2)
{
score+=10;
cash.play();
}
if(type==3)
{
timer-=10;
end.play();
}
if(type==4)
{
timer-=20;
end.play();
}
return true;
}
}


}

function kdn(event)
{
var key=event.keyCode;
if(key==37 || key==65)
{
moveleft=true;
moveright=false;
}
if(key==39 || key==68)
{
moveright=true;
moveleft=false;
}
}

function kup(event)
{
var key=event.keyCode;
if(key==37|| key==65)
moveleft=false;
if(key==39 || key==68)
moveright=false;
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