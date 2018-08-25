//Chain Reaction
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
var mouseX=0;
var mouseY=0;
var clicked=false;
var restart;
var grid=new Array();
var beginner=true;
var player=1;
var p1active=0;
var p2active=0;
var firstturn=0;
var check=true;
var xincr=0;
var ccopy1=0;
var pcopy1=0;
var ccopy2=0;
var pcopy2=0;
var ccopy3=0;
var pcopy3=0;
var ccopy4=0;
var pcopy4=0;
var ccopy5=0;
var pcopy5=0;
var ccopy6=0;
var pcopy6=0;
var ccopy7=0;
var pcopy7=0;
var ccopy8=0;
var pcopy8=0;
var ccopy9=0;
var pcopy9=0;


//Gameloop
function func()
{
//Draw Background
//mod.fillStyle="silver";
//mod.fillRect(0,0,stage.width,stage.height);
mod.drawImage(bg,0,0,1001,660,0,0,1000,660);

//Object creation
if(beginner)
{
for(var t=1;t<=6;t++)
{

for(var i=1;i<=9;i++)
{
var box=new Object();
box.x=(i-1)*100+40;
box.y=(t-1)*100+30;
box.num=0;
box.player=0;
box.count=0;
grid.push(box);
}

}

beginner=false;
}

//Grid count defining
for(var x=0;x<=53;x++)
{
grid[x].count=x+1;
}

//Array processing
for(var z=0;z<=53;z++)
{

//Algorithm

if(clicked)
{

//Click collision checking
if(hit(grid[z].x,grid[z].y,100,100,mouseX,mouseY))
{
clicked=false;
mouseX=0;
mouseY=0;

//Player Setting
if(player==1 && (grid[z].player==0 || grid[z].player==1) )
{
grid[z].player=1;
grid[z].num+=1;
}

if(player==2 && (grid[z].player==0 || grid[z].player==2) )
{
grid[z].player=2;
grid[z].num+=1;
firstturn=1;
}

if(grid[z].player==player)
playerswitch();
}

//End of algorithm
}

}
//End of array processing

for(var a=0;a<=53;a++)
{
//Updating grid

//Corner Boxes

if(grid[a].count==1 && grid[a].num>=2)
{
play();
check=false;
pcopy1=grid[a].player;
ccopy1=a;
grid[a].num=0;
grid[a].player=0;
splitcor1(pcopy1,grid[ccopy1].x,grid[ccopy1].y);
setTimeout(function(){
grid[ccopy1+1].num++;
grid[ccopy1+9].num++;
grid[ccopy1+1].player=pcopy1;
grid[ccopy1+9].player=pcopy1;
},300);

}
if(grid[a].count==9 && grid[a].num>=2)
{
play();
check=false;
pcopy2=grid[a].player;
ccopy2=a;
grid[a].num=0;
grid[a].player=0;
splitcor2(pcopy2,grid[ccopy2].x,grid[ccopy2].y);
setTimeout(function(){
grid[ccopy2-1].num++;
grid[ccopy2+9].num++;
grid[ccopy2-1].player=pcopy2;
grid[ccopy2+9].player=pcopy2;
},300);
}
if(grid[a].count==54 && grid[a].num>=2)
{
play();
check=false;
pcopy3=grid[a].player;
ccopy3=a;
grid[a].num=0;
grid[a].player=0;
splitcor3(pcopy3,grid[ccopy3].x,grid[ccopy3].y);
setTimeout(function(){
grid[ccopy3-1].num++;
grid[ccopy3-9].num++;
grid[ccopy3-1].player=pcopy3;
grid[ccopy3-9].player=pcopy3;
},300);
}
if(grid[a].count==46 && grid[a].num>=2)
{
play();
check=false;
pcopy4=grid[a].player;
ccopy4=a;
grid[a].num=0;
grid[a].player=0;
splitcor4(pcopy4,grid[ccopy4].x,grid[ccopy4].y);
setTimeout(function(){
grid[ccopy4+1].num++;
grid[ccopy4-9].num++;
grid[ccopy4+1].player=pcopy4;
grid[ccopy4-9].player=pcopy4;
},300);
}

//Edge boxes

if( (grid[a].count==2 || grid[a].count==3 || grid[a].count==4 || grid[a].count==5 || grid[a].count==6 || grid[a].count==7 || grid[a].count==8) && (grid[a].num>=3) )
{
play();
check=false;
pcopy5=grid[a].player;
ccopy5=a;
grid[a].num=0;
grid[a].player=0;
splitedg1(pcopy5,grid[ccopy5].x,grid[ccopy5].y);
setTimeout(function(){
grid[ccopy5+1].num++;
grid[ccopy5+9].num++;
grid[ccopy5-1].num++;
grid[ccopy5+1].player=pcopy5;
grid[ccopy5+9].player=pcopy5;
grid[ccopy5-1].player=pcopy5;
},300);
}
if( (grid[a].count==18 || grid[a].count==27 || grid[a].count==36 || grid[a].count==45) && (grid[a].num>=3) )
{
play();
check=false;
pcopy6=grid[a].player;
ccopy6=a;
grid[a].num=0;
grid[a].player=0;
splitedg2(pcopy6,grid[ccopy6].x,grid[ccopy6].y);
setTimeout(function(){
grid[ccopy6-9].num++;
grid[ccopy6+9].num++;
grid[ccopy6-1].num++;
grid[ccopy6-9].player=pcopy6;
grid[ccopy6+9].player=pcopy6;
grid[ccopy6-1].player=pcopy6;
},300);
}
if( (grid[a].count==47 || grid[a].count==48 || grid[a].count==49 || grid[a].count==50 || grid[a].count==51 || grid[a].count==52 || grid[a].count==53) && (grid[a].num>=3) )
{
play();
check=false;
pcopy7=grid[a].player;
ccopy7=a;
grid[a].num=0;
grid[a].player=0;
splitedg3(pcopy7,grid[ccopy7].x,grid[ccopy7].y);
setTimeout(function(){
grid[ccopy7+1].num++;
grid[ccopy7-9].num++;
grid[ccopy7-1].num++;
grid[ccopy7+1].player=pcopy7;
grid[ccopy7-9].player=pcopy7;
grid[ccopy7-1].player=pcopy7;
},300);
}
if( (grid[a].count==10 || grid[a].count==19 || grid[a].count==28 || grid[a].count==37) && (grid[a].num>=3) )
{
play();
check=false;
pcopy8=grid[a].player;
ccopy8=a;
grid[a].num=0;
grid[a].player=0;
splitedg4(pcopy8,grid[ccopy8].x,grid[ccopy8].y);
setTimeout(function(){
grid[ccopy8+1].num++;
grid[ccopy8+9].num++;
grid[ccopy8-9].num++;
grid[ccopy8+1].player=pcopy8;
grid[ccopy8+9].player=pcopy8;
grid[ccopy8-9].player=pcopy8;
},300);
}

//Main Boxes
if( (grid[a].count==11 || grid[a].count==12 || grid[a].count==13 || grid[a].count==14 || grid[a].count==15 || grid[a].count==16 || grid[a].count==17 || grid[a].count==20 || grid[a].count==21 || grid[a].count==22 || grid[a].count==23 || grid[a].count==24 || grid[a].count==25 || grid[a].count==26 || grid[a].count==29 || grid[a].count==30 || grid[a].count==31 || grid[a].count==32 || grid[a].count==33 || grid[a].count==34 || grid[a].count==35 || grid[a].count==38 || grid[a].count==39 || grid[a].count==40 || grid[a].count==41 || grid[a].count==42 || grid[a].count==43 || grid[a].count==44) && (grid[a].num>=4) )
{
play();
check=false;
pcopy9=grid[a].player;
ccopy9=a;
grid[a].num=0;
grid[a].player=0;
splitmain(pcopy9,grid[ccopy9].x,grid[ccopy9].y);
setTimeout(function(){
grid[ccopy9+1].num++;
grid[ccopy9+9].num++;
grid[ccopy9-9].num++;
grid[ccopy9-1].num++;
grid[ccopy9+1].player=pcopy9;
grid[ccopy9+9].player=pcopy9;
grid[ccopy9-9].player=pcopy9;
grid[ccopy9-1].player=pcopy9;
},300);
}

//End of updating
}

//Drawing the grid

for(var k=0;k<=53;k++)
{
//Draw grid
//drawbox(grid[k].x,grid[k].y,100,100);
drawimg(grid[k].x,grid[k].y,grid[k].num,grid[k].player);
}

//End of drawing

//Win condition check
if(check)
winner();

//End of Gameloop
}

//Functions

function splitcor1(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29+xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29+xincr,43,43);
}
if(xincr<=100)
splitcor1(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}

function splitcor2(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,(x+29)-xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29+xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,(x+29)-xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29+xincr,43,43);
}
if(xincr<=100)
splitcor2(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}

function splitcor3(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,(x+29)-xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,(y+29)-xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,(x+29)-xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,(y+29)-xincr,43,43);
}
if(xincr<=100)
splitcor3(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}

function splitcor4(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,(y+29)-xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,(y+29)-xincr,43,43);
}
if(xincr<=100)
splitcor4(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}

function splitedg1(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(red1,0,0,39,34,(x+29)-xincr,y+29,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(grn1,0,0,39,34,(x+29)-xincr,y+29,43,43);
}
if(xincr<=100)
splitedg1(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}
function splitedg2(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,(x+29)-xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(red1,0,0,39,34,x+29,(y+29)-xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,(x+29)-xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,(y+29)-xincr,43,43);
}
if(xincr<=100)
splitedg2(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}
function splitedg3(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29-xincr,43,43);
mod.drawImage(red1,0,0,39,34,(x+29)-xincr,y+29,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29-xincr,43,43);
mod.drawImage(grn1,0,0,39,34,(x+29)-xincr,y+29,43,43);
}
if(xincr<=100)
splitedg3(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}
function splitedg4(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29-xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29-xincr,43,43);
}
if(xincr<=100)
splitedg4(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}

function splitmain(p,x,y)
{
setTimeout(function(){
xincr+=10;
if(p==1)
{
mod.drawImage(red1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29-xincr,y+29,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(red1,0,0,39,34,x+29,y+29-xincr,43,43);
}
if(p==2)
{
mod.drawImage(grn1,0,0,39,34,x+29+xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29-xincr,y+29,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29+xincr,43,43);
mod.drawImage(grn1,0,0,39,34,x+29,y+29-xincr,43,43);
}
if(xincr<=100)
splitmain(p,x,y);
if(xincr>100)
{
xincr=0;
check=true;
}
},30);
}


//Win Condition checking
function winner()
{
p1active=0;
p2active=0;

if(firstturn==1)
{

for(var t=0; t<=53; t++)
{
if(grid[t].player==1)
p1active=1;
if(grid[t].player==2)
p2active=1;
}
if(p1active==1 && p2active==0)
p1wins();
if(p1active==0 && p2active==1)
p2wins();
}
}

//Victory declaration
function p1wins()
{
clearInterval(loop);
mod.font="40px Impact";
mod.fillStyle="silver";
mod.fillRect(340,195,320,175);
mod.fillStyle="blue";
mod.fillText("Player one wins!",370,250);
mod.fillStyle="black";
mod.fillRect(357,280,290,50);
mod.fillStyle="cyan";
mod.fillText("Play again",420,320);
restarter=setInterval(restart_loop,30);
}

function p2wins()
{
clearInterval(loop);
mod.font="40px Impact";
mod.fillStyle="silver";
mod.fillRect(340,195,320,175);
mod.fillStyle="red";
mod.fillText("Player two wins!",370,250);
mod.fillStyle="black";
mod.fillRect(357,280,290,50);
mod.fillStyle="cyan";
mod.fillText("Play again",420,320);
mouseX=0;
mouseY=0;
restarter=setInterval(restart_loop,30);
}

//Restart Loop
function restart_loop()
{
if ( hit(357,280,290,50,mouseX,mouseY) )
{
reset();
}
}

//Variable resetting
function reset()
{
clearInterval(restarter);
mouseX=0;
mouseY=0;
clicked=false;
grid=new Array();
beginner=true;
player=1;
p1active=0;
p2active=0;
firstturn=0;
loop=setInterval(func,30);
}

//Click event
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

//Hit Function
function hit(xcor,ycor,xincr,yincr,mx,my)
{
if(mx>xcor && mx<xcor+xincr && my>ycor && my<ycor+yincr)
return true;
else
return false;
}

//Draws grid
//function drawbox(x,y,xp,yp,num,player)
//{
//mod.beginPath();
//mod.rect(x,y,xp,yp);
//mod.fillStyle="black";
//mod.fill();
//mod.strokeStyle="white";
//mod.stroke();
//}

function drawimg(x,y,num,player)
{

if(player==1)
{
if(num==1)
mod.drawImage(red1,0,0,39,34,x+29,y+29,43,43);
if(num==2)
mod.drawImage(red2,0,0,40,40,x+29,y+29,43,43);
if(num==3)
mod.drawImage(red3,0,0,48,44,x+29,y+29,43,43);
}

if(player==2)
{
if(num==1)
mod.drawImage(grn1,0,0,33,31,x+29,y+29,43,43);
if(num==2)
mod.drawImage(grn2,0,0,43,52,x+29,y+29,43,43);
if(num==3)
mod.drawImage(grn3,0,0,48,40,x+29,y+29,43,43);
}

}

//Switches players
function playerswitch()
{
if(player==1)
player=2;
else if(player==2)
player=1;
}

//Plays sound
function play()
{
var snd=new Audio();
snd.src="Assets/split.mp3";
snd.play();
}

//End of code