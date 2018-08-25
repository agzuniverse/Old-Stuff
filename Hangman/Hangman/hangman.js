//HANGMAN

//Start Game
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

//Declarations
var loop;
var restart;
var clicked=false;
var typed=false;
var key;
var display= new Array();
var indray= new Array();
var c=0;
var mouseX;
var mouseY;
var one;
var oned;
var kick="BECKENBAUR";
var kicked="He won the FIFA World Cup as a player captain and coach";
var two="MESSI";
var twod="Scored the most goals in a calender year";
var three="NEYMAR";
var threed="________  Santos Da Silva Junior";
var four="SHAKESPERE";
var fourd="The Bard of Avon";
var five="GEORGERRMARTIN";
var fived="Author of the Song of Ice and Fire series";
var six="JUSTINBIEBER";
var sixd="Canadian pop phenomeon";
var seven="BEATLES";
var sevend="The most successful musical act of all time";
var eight="STEVEJOBS";
var eightd="Founder of Apple Inc.";
var nine="GOOGLE";
var nined="Larry and Sergey started this";
var ten="KOCHI";
var tend="The queen of the Arabian sea";
var eleven="DELHI";
var elevend="Captal of India";
var twelve="NICOLATESLA";
var twelved="discovered alternative current";
var thirteen="DAVINCI";
var thirteend="Famous renaissance artist";
var fourteen="MICHELANGELO";
var fourteend="Famous renaissance sculptor";
var fifteen="LINUX";
var fifteend="Tux, the penguin, is it's logo";
var sixteen="ARGENTINA";
var sixteend="Buenos Aires is the capital";
var seventeen="BATMAN";
var seventeend="Created by Bob Kane";
var eighteen="SHERLOCK";
var eighteend="Created by Arthur Conan Doyle";
var nineteen="JAMESBOND";
var nineteend="007";
var twenty="EINSTEIN";
var twentyd="E=mc^2";
var twentyone="SKYRIM";
var twentyoned="Made by Betheseda Game Studios";
var twentytwo="NINTENDO";
var twentytwod="Largest game company";
var twentythree="BULLY";
var twentythreed="Made by Rockstar Studios";
var twentyfour="CALLOFDUTY";
var twentyfourd="Made by Activision";
var twentyfive="WINDOWS";
var twentyfived="Microsoft makes this";
var twentysix="JAVASCRIPT";
var twentysixd="Most used programming language";
var twentyseven="WESTEROS";
var twentysevend="______ and Essos";
var twentyeight="ALEXANDER";
var twentyeightd="_______v/s Poros";
var twentynine="TRANSFORMERS";
var twentynined="DIrected by Micheal Bay";
var thirty="HARRYPOTTER";
var thirtyd="Made by J K Rowling";
var thirtyone="LORDOFTHERINGS";
var thirtyoned="Made by Tolkien";
var thirtytwo="JOHNWATSON";
var thirtytwod="He was shot in Afghanistan";
var thirtythree="ASPIRIN";
var thirtythreed="Acetylsalicyclic acid";
var thirtyfour="POLIO";
var thirtyfourd="Albert Sabin discovered a cure for this";
var thirtyfive="JOKER";
var thirtyfived="Batman's greatest nemesis";
var thirtysix="ROBIN";
var thirtysixd="Batman's sidekick";
var thirtyseven="CHUCKNORRIS";
var thirtysevend="He is invincible";
var thirtyeight="MARYPOLLOCK";
var thirtyeightd="Real name of Enid Blyton";
var thirtynine="STATUEOFLIBERTY";
var thirtynined="A gift from france";
var fourty="RUBIKSCUBE";
var fourtyd="The Hungarian horror";
var fourtyone="NASA";
var fourtyoned="Launched the Apollo missions";
var fourtytwo="NOTFOUND";
var fourtytwod="Error 404";
var fourtythree="ARISTOTLE";
var fourtythreed="Father of biology";
var fourtyfour="MENDELEEV";
var fourtyfourd="Father of modern periodic table";
var fourtyfive="RUTHERFORD";
var fourtyfived="DIscovered atomic nucleus";
var fourtysix="ENZO";
var fourtysixd="Founder of Ferrari";
var fourtyseven="WEASLY";
var fourtysevend="Ron,Fred,George,Ginny";
var fourtyeight="PYTHON";
var fourtyeightd="A snake, or a coding language?";
var fourtynine="PINOCCHIO";
var fourtynined="Made by Geppetto";
var fifty="EMINEM";
var fiftyd="Marshal Mathers";
var fiftyone="SPEAKER";
var fiftyoned="Hear songs from this";
var fiftytwo="INTERNET";
var fiftytwod="Greatest information pool";
var fiftythree="MICKEY";
var fiftythreed="Disney's most famous creation";
var fiftyfour="ARCHIPELAGO";
var fiftyfourd="A group of islands";
var fiftyfive="INDONESIA";
var fiftyfived="Largest archipelago";
var fiftysix="ANGELFALLS";
var fiftysixd="Highest waterfall";
var fiftyseven="BRAZOOKA";
var fiftysevend="2014 fifa world cup official ball";
var fiftyeight="JARVIS";
var fiftyeightd="Iron Man's companion";
var fiftynine="TAJMAHAL";
var fiftynined="A teardrop on the cheek of the world";
var sixty="MONGOL";
var sixtyd="Largest empire in known history";
var sixtyone="MAXPLANCK";
var sixtyoned="Quantum Theory";
var sixtytwo="MCDONALDS";
var sixtytwod="I'm loving it!";
var sixtythree="MAGNET";
var sixtythreed="Loadstone is a _____";
var sixtyfour="CANCER";
var sixtyfourd="A sign of the Zodiac, and a disease";
var sixtyfive="BLUETOOTH";
var sixtyfived="Short range wireless communication";
var sixtysix="MANGO";
var sixtysixd="Mandifera Indica";
var sixtyseven="LION";
var sixtysevend="Panthera Leo";
var sixtyeight="DWAYNEJOHNSON";
var sixtyeightd="The Rock";
var sixtynine="EGYPT";
var sixtynined="Land of the Pharahoes";
var seventy="ELDORADO";
var seventyd="Lengendary city of gold";
var seventyone="DRAGON";
var seventyoned="Mythical beast";
var seventytwo="PHOENIX";
var seventytwod="Mythical bird";
var seventythree="WEREWOLF";
var seventythreed="Half human, half wolf";
var seventyfour="CENTAUR";
var seventyfourd="Half human, half horse";
var seventyfive="MADAGASCAR";
var seventyfived="The island of cloves";
var seventysix="FOURTYTWO";
var seventysixd="The meaning of life";
var seventyseven="HINDUISM";
var seventysevend="The oldest religion in the world";
var seventyeight="KEVLAR";
var seventyeightd="Material in bulletproof vests";
var seventynine="CAMEL";
var seventynined="Ship of the desert";
var eighty="PHOTOSYNTHESIS";
var eightyd="Autotrophic food production";
var eightyone="PYROMANIAC";
var eightyoned="Obsessed with fire";
var eightytwo="KLEPTOMANIAC";
var eightytwod="Obsessed with precious materials";
var eightythree="PHOTOGRAPHY";
var eightythreed="Taking Pictures";
var eightyfour="PHOTOTROPHISM";
var eightyfourd="Moving towards sunlight";
var eightyfive="FELINE";
var eightyfived="Relating to cats";
var eightysix="CANINE";
var eightysixd="Relating to dogs";
var eightyseven="BOVINE";
var eightysevend="Relating to cows";
var eightyeight="EQUESTRIAN";
var eightyeightd="Sports with horses";
var eightynine="TWITTER";
var eightynined="Found by Jack Dorsey";
var ninety="PITBULL";
var ninetyd="Latin Rapper";
var ninetyone="AKCENT";
var ninetyoned="Romanian band";
var ninetytwo="NEWYORK";
var ninetytwod="The big apple";
var ninetythree="CALIFORNIA";
var ninetythreed="Home of the Silicon Valley";
var ninetyfour="EAGLE";
var ninetyfourd="Landing unit of Apollo 11";
var ninetyfive="REDBULL";
var ninetyfived="Gives you wings";
var ninetysix="ADIDAS";
var ninetysixd="All in";
var ninetyseven="NIKE";
var ninetysevend="Just do it";
var ninetyeight="POSITRON";
var ninetyeightd="Subatomic particle";
var ninetynine="JIMMYWALES";
var ninetynined="Founder of Wikipedia";
var hundred="MARTINLUTHERKINGJR";
var hundredd="'I have a dream'"
var x_gap=50;
var winner=-1;
var checker= new Array();
var w=1;
var guess=true;
var attempts=0;
var negative;
var random;
var randompicker=true;
var aclr="green";
var highscore=localStorage.getItem("score");
var newscore=0;
var tried_words=new Array();
var word_count=0;
var enterpress=false;

//Listeners
document.addEventListener("click",clk,false);
document.addEventListener("keydown",press,false);

//Preload

var head=new Image();
head.ready=false;
head.onload=head_ready();
head.src="img/head.png";
function head_ready()
{
head.ready=true;
}

var body=new Image();
body.ready=false;
body.onload=body_ready()
body.src="img/body.png";
function body_ready()
{
body.ready=true;
}

var hand_left=new Image();
hand_left.ready=false;
hand_left.onload=hand_left_ready();
hand_left.src="img/hand_left.png";
function hand_left_ready()
{
hand_left.ready=true;
}

var hand_right=new Image();
hand_right.ready=false;
hand_right.onload=hand_right_ready();
hand_right.src="img/hand_right.png";
function hand_right_ready()
{
hand_right.ready=true;
}

var leg_left=new Image();
leg_left.ready=false;
leg_left.onload=leg_left_ready();
leg_left.src="img/leg_left.png";
function leg_left_ready()
{
leg_left.ready=true;
}

var leg_right=new Image();
leg_right.ready=false;
leg_right.onload=leg_right_ready();
leg_right.src="img/leg_right.png";
function leg_right_ready()
{
leg_right.ready=true;
}

var rope=new Image();
rope.ready=false;
rope.onload=rope_ready();
rope.src="img/rope.png";
function rope_ready()
{
rope.ready=true;
}

var bar_horizontal=new Image();
bar_horizontal.ready=false;
bar_horizontal.onload=bar_horizontal_ready();
bar_horizontal.src="img/bar_horizontal.png";
function bar_horizontal_ready()
{
bar_horizontal.ready=true;
}

var bar_vertical=new Image();
bar_vertical.ready=false;
bar_vertical.onload=bar_vertical_ready();
bar_vertical.src="img/bar_vertical.png";
function bar_vertical_ready()
{
bar_vertical.ready=true;
}

mod.fillStyle="cyan";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="black";
mod.fillText("Loading.......",425,275);
var loaderloop=setInterval(preloader,500);
function preloader()
{
if(head.ready==true && body.ready==true && hand_left.ready==true && hand_right.ready==true && leg_left.ready==true && leg_right.ready==true && rope.ready==true && bar_horizontal.ready==true && bar_vertical.ready==true)
{
clearInterval(loaderloop);
loop=setInterval(func,33);
}
}


//GameLoop

function func()
{
mod.fillStyle="yellow";
mod.fillRect(0,0,stage.width,stage.height);
mod.fillStyle="blue";
mod.fillText("©AGZ Game Studios",15,15);

if(randompicker)
{
random=Math.floor(Math.random()*99);
if(random==0)
{
one=kick;
oned=kicked;
}
if(random==1)
{
one=two;
oned=twod;
}
if(random==2)
{
one=three;
oned=threed;
}
if(random==3)
{
one=four;
oned=fourd;
}
if(random==4)
{
one=five;
oned=fived;
}
if(random==5)
{
one=six;
oned=sixd;
}
if(random==6)
{
one=seven;
oned=sevend;
}
if(random==7)
{
one=eight;
oned=eightd;
}
if(random==8)
{
one=nine;
oned=nined;
}
if(random==9)
{
one=ten;
oned=tend;
}
if(random==10)
{
one=eleven;
oned=elevend;
}
if(random==11)
{
one=twelve;
oned=twelved;
}
if(random==12)
{
one=thirteen;
oned=thirteend;
}
if(random==13)
{
one=fourteen;
oned=fourteend;
}
if(random==14)
{
one=fifteen;
oned=fifteend;
}
if(random==15)
{
one=sixteen;
oned=sixteend;
}
if(random==16)
{
one=seventeen;
oned=seventeend;
}
if(random==17)
{
one=eighteen;
oned=eighteend;
}
if(random==18)
{
one=nineteen;
oned=nineteend;
}
if(random==19)
{
one=twenty;
oned=twentyd;
}
if(random==20)
{
one=twentyone;
oned=twentyoned;
}
if(random==21)
{
one=twentytwo;
oned=twentytwod;
}
if(random==22)
{
one=twentythree;
oned=twentythreed;
}
if(random==23)
{
one=twentyfour;
oned=twentyfourd;
}
if(random==24)
{
one=twentyfive;
oned=twentyfived;
}
if(random==25)
{
one=twentysix;
oned=twentysixd;
}
if(random==26)
{
one=twentyseven;
oned=twentysevend;
}
if(random==27)
{
one=twentyeight;
oned=twentyeightd;
}
if(random==28)
{
one=twentynine;
oned=twentynined;
}
if(random==29)
{
one=thirty;
oned=thirtyd;
}
if(random==30)
{
one=thirtyone;
oned=thirtyoned;
}
if(random==31)
{
one=thirtytwo;
oned=thirtytwod;
}
if(random==32)
{
one=thirtythree;
oned=thirtythreed;
}
if(random==33)
{
one=thirtyfour;
oned=thirtyfourd;
}
if(random==34)
{
one=thirtyfive;
oned=thirtyfived;
}
if(random==35)
{
one=thirtysix;
oned=thirtysixd;
}
if(random==36)
{
one=thirtyseven;
oned=thirtysevend;
}
if(random==37)
{
one=thirtyeight;
oned=thirtyeightd;
}
if(random==38)
{
one=thirtynine;
oned=thirtynined;
}
if(random==39)
{
one=fourty;
oned=fourtyd;
}
if(random==40)
{
one=fourtyone;
oned=fourtyoned;
}
if(random==41)
{
one=fourtytwo;
oned=fourtytwod;
}
if(random==42)
{
one=fourtythree;
oned=fourtythreed;
}
if(random==43)
{
one=fourtyfour;
oned=fourtyfourd;
}
if(random==44)
{
one=fourtyfive;
oned=fourtyfived;
}
if(random==45)
{
one=fourtysix;
oned=fourtysixd;
}
if(random==46)
{
one=fourtyseven;
oned=fourtysevend;
}
if(random==47)
{
one=fourtyeight;
oned=fourtyeightd;
}
if(random==48)
{
one=fourtynine;
oned=fourtynined;
}
if(random==49)
{
one=fifty;
oned=fiftyd;
}
if(random==50)
{
one=fiftyone;
oned=fiftyoned;
}
if(random==51)
{
one=fiftytwo;
oned=fiftytwod;
}
if(random==52)
{
one=fiftythree;
oned=fiftythreed;
}
if(random==53)
{
one=fiftyfour;
oned=fiftyfourd;
}
if(random==54)
{
one=fiftyfive;
oned=fiftyfived;
}
if(random==55)
{
one=fiftysix;
oned=fiftysixd;
}
if(random==56)
{
one=fiftyseven;
oned=fiftysevend;
}
if(random==57)
{
one=fiftyeight;
oned=fiftyeightd;
}
if(random==58)
{
one=fiftynine;
oned=fiftynined;
}
if(random==59)
{
one=sixty;
oned=sixtyd;
}
if(random==60)
{
one=sixtyone;
oned=sixtyoned;
}
if(random==61)
{
one=sixtytwo;
oned=sixtytwod;
}
if(random==62)
{
one=sixtythree;
oned=sixtythreed;
}
if(random==63)
{
one=sixtyfour;
oned=sixtyfourd;
}
if(random==64)
{
one=sixtyfive;
oned=sixtyfived;
}
if(random==65)
{
one=sixtysix;
oned=sixtysixd;
}
if(random==66)
{
one=sixtyseven;
oned=sixtysevend;
}
if(random==67)
{
one=sixtyeight;
oned=sixtyeightd;
}
if(random==68)
{
one=sixtynine;
oned=sixtynined;
}
if(random==69)
{
one=seventy;
oned=seventyd;
}
if(random==70)
{
one=seventyone;
oned=seventyoned;
}
if(random==71)
{
one=seventytwo;
oned=seventytwod;
}
if(random==72)
{
one=seventythree;
oned=seventythreed;
}
if(random==73)
{
one=seventyfour;
oned=seventyfourd;
}
if(random==74)
{
one=seventyfive;
oned=seventyfived;
}
if(random==75)
{
one=seventysix;
oned=seventysixd;
}
if(random==76)
{
one=seventyseven;
oned=seventysevend;
}
if(random==77)
{
one=seventyeight;
oned=seventyeightd;
}
if(random==78)
{
one=seventynine;
oned=seventynined;
}
if(random==79)
{
one=eighty;
oned=eightyd;
}
if(random==80)
{
one=eightyone;
oned=eightyoned;
}
if(random==81)
{
one=eightytwo;
oned=eightytwod;
}
if(random==82)
{
one=eightythree;
oned=eightythreed;
}
if(random==83)
{
one=eightyfour;
oned=eightyfourd;
}
if(random==84)
{
one=eightyfive;
oned=eightyfived;
}
if(random==85)
{
one=eightysix;
oned=eightysixd;
}
if(random==86)
{
one=eightyseven;
oned=eightysevend;
}
if(random==87)
{
one=eightyeight;
oned=eightyeightd;
}
if(random==88)
{
one=eightynine;
oned=eightynined;
}
if(random==89)
{
one=ninety;
oned=ninetyd;
}
if(random==90)
{
one=ninetyone;
oned=ninetyoned;
}
if(random==91)
{
one=ninetytwo;
oned=ninetytwod;
}
if(random==92)
{
one=ninetythree;
oned=ninetythreed;
}
if(random==93)
{
one=ninetyfour;
oned=ninetyfourd;
}
if(random==94)
{
one=ninetyfive;
oned=ninetyfived;
}
if(random==95)
{
one=ninetysix;
oned=ninetysixd;
}
if(random==96)
{
one=ninetyseven;
oned=ninetysevend;
}
if(random==97)
{
one=ninetyeight;
oned=ninetyeightd;
}
if(random==98)
{
one=ninetynine;
oned=ninetynined;
}
if(random==99)
{
one=hundred;
oned=hundredd;
}
if(localStorage.getItem("score")==null)
localStorage.setItem("score",0);
randompicker=false;
}


for(gaps=0; gaps<=one.length-1;gaps++)
{
mod.fillStyle="black";
mod.fillText("__",100+x_gap,100);
x_gap+=50;
}
x_gap=0;
mod.fillStyle="black";
mod.fillText(oned,75,150);

if(typed==true)
{
for(s=0; s<one.length; s++)
{
if(one.charAt(s)==key)
{
display[c]=key;
indray[c]=s;
c++;
guess=false;
}
}
if(guess)
{
attempts++;
tried_words[word_count]=key;
word_count++;
}
typed=false;
}
for(l=0; l<display.length;l++)
{
mod.fillStyle="black";
mod.fillText(display[l],100+indray[l]*50,100);
}

//Attempt calculations

highscore=localStorage.getItem("score");
if(newscore>highscore)
localStorage.setItem("score",newscore);
mod.fillStyle=aclr;
mod.fillText("Attempts left : "+(9-attempts),100,50);
if(9-attempts<7 && 9-attempts>4)
aclr="magenta";
if(9-attempts<4)
aclr="red";
mod.fillStyle="grey";
mod.fillText("Score : " + newscore,100,200);
mod.fillText("Highscore : " +highscore,100,225);
mod.fillStyle="black";
mod.fillText("Tried letters: "+tried_words,100,250);

//Hangman rendering

if(attempts>=1)
mod.drawImage(bar_vertical,0,0,82,222,100,300,82,222);
if(attempts>=2)
mod.drawImage(bar_horizontal,0,0,114,63,144,300,114,63);
if(attempts>=3)
mod.drawImage(rope,0,0,8,33,250,308,8,33);
if(attempts>=4)
mod.drawImage(head,0,0,50,46,228,337,50,46);
if(attempts>=5)
mod.drawImage(body,0,0,10,48,250,379,10,48);
if(attempts>=6)
mod.drawImage(hand_left,0,0,44,26,208,382,44,26);
if(attempts>=7)
mod.drawImage(hand_right,0,0,35,33,258,379,35,33);
if(attempts>=8)
mod.drawImage(leg_left,0,0,37,45,216,420,37,45);
if(attempts>=9)
mod.drawImage(leg_right,0,0,28,41,250,420,28,41);

if(display.length==one.length)
victory();

if(attempts==9)
failure();

//Gameloop Ends
}

//Restarter loop

function restarter()
{
if(negative==false)
{
mod.fillStyle="black";
mod.fillRect(175,150,450,300);
mod.fillStyle="white";
mod.font="60px Comic Sans MS";
mod.fillText("Correct!",275,250);
mod.fillStyle="cyan";
mod.fillRect(200,300,400,100);
mod.fillStyle="black";
mod.fillText("Next Word",240,375);
}
if(negative)
{
mod.fillStyle="black";
mod.fillRect(175,150,450,300);
mod.fillStyle="cyan";
mod.fillText("The word was: "+one,240,275);
mod.fillStyle="white";
mod.font="60px Comic Sans MS";
mod.fillText("Incorrect",240,250);
mod.fillStyle="cyan";
mod.fillRect(200,300,400,100);
mod.fillStyle="black";
mod.fillText("New Game",240,375);
mod.font="20px Comic Sans MS";
mod.fillStyle="red";
mod.fillText("Your Score : "+newscore,325,175);
}
if(clicked==true||enterpress==true)
{
if((hit(mouseX,mouseY,200,300,400,100))||enterpress==true)
{
clearInterval(restart);
game_on();
}
clicked=false;
enterpress==false;
}

//Restarter loop ends
}

//Functions

//Variable Reset

function game_on()
{
clicked=false;
typed=false;
mouseX=0;
mouseY=0;
mod.font="20px Algerian";
display.length=0;
indray.length=0;
tried_words.length=0;
word_count=0;
c=0;
winner=-1;
checker.length=0;
w=1;
guess=true;
attempts=0;
one="";
oned="";
randompicker=true;
aclr="green";
enterpress=false;
loop=setInterval(func,33);
}

//Winning condition

function victory()
{
clearInterval(loop);
mouseX=0;
mouseY=0;
newscore++;
enterpress=false;
restart=setInterval(restarter,33);
negative=false;
}

//Losing Condition

function failure()
{
clearInterval(loop);
mouseX=0;
mouseY=0;
newscore=0;
enterpress=false;
restart=setInterval(restarter,33);
negative=true;
}

//Get Hit Point function

function hit(mX,mY,x,y,w,h)
{
if(((x<=mX) && (x+w>=mX)) && ((y<=mY) && (y+h>=mY)))
return true;
else
return false;
}

//Click Event Handler

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

//Keyboard Event Handler

function press(event)
{
if(event.keyCode==13)
enterpress=true;
key=String.fromCharCode(event.keyCode);
if((key=="A" || key=="B" || key=="C" || key=="D" || key=="E"|| key=="F" || key=="G" || key=="H" || key=="I" || key=="J" || key=="K" || key=="L" || key=="M" || key=="N" || key=="O" || key=="P" || key=="Q" || key=="R" || key=="S" || key=="T" || key=="U" || key=="V" || key=="W" || key=="X" || key=="Y" || key=="Z") && (key!=checker[1] && key!=checker[2] && key!=checker[3] && key!=checker[4] && key!=checker[5] && key!=checker[6] && key!=checker[7] && key!=checker[8] && key!=checker[9] && key!=checker[10]))
{
typed=true;
guess=true;
checker[w]=key;
w++;
}
}

//End