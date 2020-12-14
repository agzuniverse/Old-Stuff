import socket
import sys
import time
from random import randint

#Connection variables
server="irc.freenode.net"
channel="##JusticeArena"
botnick="WarHammer"

#Team class
class team:
    def __init__(self):
        self.mname='placeholder'
        self.tname='placeholder'
        self.tplayers=list()
        self.trating=0
        self.budget=10000

#Game variables
rand=0
text=""
teams=list()
gameon=False
bidon=False
activebid=0
players=["MESSI","RONALDO","SUAREZ","ROBBEN","HAZARD","ZLATAN","NEYMAR","DAVIDSILVA","THIAGOSILVA","INIESTA","JAMESRODRIGUEZ","LEWANDOWSKI","BOATENG","KROOS","MODRIC","OZIL","BALE","FABREGAS","RIBERY","RAMOS","AGUERO","CHIELLINI","LAHM","POGBA","DEBRUYNE","MULLER","BUSQUETS","REUS","SANCHEZ","VIDAL","COSTA","HUMMELS","BENZEMA","TEVEZ","BASTIAN","ROONEY","ALABA","DIMARIA","GODIN","CAVANI","NALDO","PIQUE","CAZORLA","KOMPANY","YAYA","TERRY","VERRATI","ISCO","JACKSON","LACAZETTE","OTAMENDI","GOTZE","MATIC","PASTORE","HULK","JORDIALBA","COUTINHO","OSCAR","PJANIC","MATA","JAVIMARTINEZ","BENATIA","MATUIDI","RAKITIC","MIRANDA","HIGUAIN","DANIALVES","SNEIJDER","BARZAGLI","PEPE","XABI","GERRARD","VANPERSIE","PIRLO","LAPORTE","BELLARABI","GRIEZMANN","KOKE","RICARDORODRIGUEZ","ERIKSEN","ALCANTARA","PEDRO","GUSTAVO","BONUCCI","GAITAN","MANDZUKIC","DAVIDLUIZ","KHEDIRA","HOWEDES","NAINGGOLAN","MARCELO","CANDREVA","SOKRATIS","HAMSIK","STURRIDGE","ARDA"]
playerRating=[94,93,90,90,89,89,88,88,88,88,87,87,87,87,87,87,87,87,87,87,87,87,87,86,86,86,86,86,86,86,86,86,86,86,86,86,85,85,85,85,85,85,85,85,85,85,84,84,80,82,84,84,84,84,82,84,84,84,84,84,82,83,82,82,84,80,79,84,79,80,83,84,82,81,82,82,78,83,83,80,83,83,83,80,80,77,80,83,81,80,79,84,80,80,84,83]
playerinput=""
sendname=""
sendrating=0
bidder=""
bidamount=0
index=""
playercount=0
isbidopen=False
skip=False
gamin=False
clock=0
frating=0
winc=False

#Game functions
def getname(text):
    return str(text.split("!")[0]).strip(":")

#Establish connection
irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
irc.connect((server,6667))
irc.setblocking(False)
time.sleep(1)
irc.send("USER "+botnick+" "+botnick+" "+botnick+" :I AM MIGHTY!\r\n")
time.sleep(1)
irc.send("NICK "+botnick+"\n")
time.sleep(1)
irc.send("JOIN "+channel+"\n")

#Gameloop
while 1:
    time.sleep(0.1)
    for y in teams:
        if(teams.index(y)==playercount-1):
            if(y.budget<=0 or len(y.tplayers)==11):
                winc=True
        elif(y.budget<=0 or len(y.tplayers)==11):
            continue
        else:
            break
    if winc:
         for g in teams:
             irc.send("PRIVMSG "+channel+" : "+str(g.mname)+"'s team "+str(g.tname)+" has a total rating of "+str(g.trating)+" \r\n")
             if g.trating>=frating:
                 frating=g.trating
                 windex=teams.index(g)
         irc.send("PRIVMSG "+channel+" : "+str(teams[windex].mname)+"'s team "+str(teams[windex].tname)+" has won with a rating of "+str(teams[windex].trating)+"!!\r\n")
         for p in teams:
             if p.trating==frating:
                 irc.send("PRIVMSG "+channel+" : "+str(p.mname)+"'s team "+str(p.tname)+" has also won with an equal rating of "+str(p.trating)+"!!\r\n")
         teams[:]=[]
         winc=False
         gameon=False
    try:
        text=irc.recv(2040)
        print (text)
    except Exception:
        pass
        if text.find("PING")!=-1:
            irc.send("PONG "+text.split()[1]+"\r\n")
        elif text.find(":@hi")!=-1 or text.find("hi warhammer")!=-1:
            rand=randint(0,4)
            if rand!=4:
                irc.send("PRIVMSG "+channel+" :Hi there "+getname(text)+"!!\r\n")
            else:
                irc.send("PRIVMSG "+channel+" :KNEEL BEFORE YOU MERE MORTAL "+getname(text)+"!! WHEN ALL IS SAID AND DONE, THE ONLY THING LEFT IN THIS WORLD, WILL BE METAL!!!\r\n")
        elif text.find(":@bro")!=-1:
            irc.send("PRIVMSG "+channel+" :What "+getname(text)+"bro?\r\n")
        elif text.lower().find("goodnight")!=-1 or text.lower().find("good night")!=-1 or text.lower().find(":gn")!=-1:
            irc.send("PRIVMSG "+channel+" : Night "+getname(text)+"!\r\n")   
        elif text.find(":@hi")!=-1 or text.find("hi warhammer")!=-1:
            rand=randint(0,4)
            if rand!=4:
                irc.send("PRIVMSG "+channel+" :Hi there "+getname(text)+"!!\r\n")
        elif text.find("JOIN")!=-1 and getname(text)!="WarHammer":
            irc.send("PRIVMSG "+channel+" :Welcome "+getname(text)+"!\r\n")
        elif text.lower().find("fuck")!=-1 or text.lower().find("bitch")!=-1 or text.lower().find("stfu")!=-1: #or text.find("Fuck")!=-1 or text.find("FUCK")!=-1 or text.find("Bitch")!=-1 or text.find("BITCH")!=-1 or text.find("STFU")!=-1:
            irc.send("PRIVMSG "+channel+" :Stop swearing and seal up that potty mouth of yours "+getname(text)+"!\r\n")
        #elif text.find("ferno")!=-1 or text.find("Ferno")!=-1 or text.find("FERNO")!=-1 or text.find("venu")!=-1 or text.find("Venu")!=-1 or text.find("VENU")!=-1:
        #    irc.send("PRIVMSG "+channel+" :Stop swearing "+getname(text)+"!\r\n")
        elif text.lower().find(":@how are you")!=-1 or text.lower().find("how are you warhammer")!=-1:
            rand=randint(0,4)
            if rand==0:
                irc.send("PRIVMSG "+channel+" :My operational matrix is well and snappy. How 'bout you "+getname(text)+"?\r\n")
            elif rand==1:
                irc.send("PRIVMSG "+channel+" :I would be happier with an intel i7 Xtreme to run on, but I'm good. How 'bout you "+getname(text)+"?\r\n")
            elif rand==3:
                irc.send("PRIVMSG "+channel+" :Loving this automatic life. How 'bout you "+getname(text)+"?\r\n")
            elif rand==4:
                irc.send("PRIVMSG "+channel+" :A lot better than my junkhead older bro, LocalSheriff. How 'bout you "+getname(text)+"?\r\n")
        elif text.find(":@viewteam")!=-1:
            for w in teams:
                if(w.mname==getname(text)):
                    irc.send("PRIVMSG "+channel+" : The team of "+str(w.mname)+" is "+str(w.tname)+", and its players are: \r\n")
                    irc.send("PRIVMSG "+channel+" : "+str(w.tplayers)+" \r\n")
        elif text.find(":@cash")!=-1:
                for r in teams:
                    if(r.mname==getname(text)):
                            irc.send("PRIVMSG "+channel+" : The budget left for "+str(r.mname)+" is : "+str(r.budget)+"\r\n")
        elif text.find(":@init")!=-1 and getname(text)=="greymatter1999" and gameon==False:
            #reset
            text=""
            teams[:]=[]
            bidon=False
            activebid=0
            players=["MESSI","RONALDO","SUAREZ","ROBBEN","HAZARD","ZLATAN","NEYMAR","DAVIDSILVA","THIAGOSILVA","INIESTA","JAMESRODRIGUEZ","LEWANDOWSKI","BOATENG","KROOS","MODRIC","OZIL","BALE","FABREGAS","RIBERY","RAMOS","AGUERO","CHIELLINI","LAHM","POGBA","DEBRUYNE","MULLER","BUSQUETS","REUS","SANCHEZ","VIDAL","COSTA","HUMMELS","BENZEMA","TEVEZ","BASTIAN","ROONEY","ALABA","DIMARIA","GODIN","CAVANI","NALDO","PIQUE","CAZORLA","KOMPANY","YAYA","TERRY","VERRATI","ISCO","JACKSON","LACAZETTE","OTAMENDI","GOTZE","MATIC","PASTORE","HULK","JORDIALBA","COUTINHO","OSCAR","PJANIC","MATA","JAVIMARTINEZ","BENATIA","MATUIDI","RAKITIC","MIRANDA","HIGUAIN","DANIALVES","SNEIJDER","BARZAGLI","PEPE","XABI","GERRARD","VANPERSIE","PIRLO","LAPORTE","BELLARABI","GRIEZMANN","KOKE","RICARDORODRIGUEZ","ERIKSEN","ALCANTARA","PEDRO","GUSTAVO","BONUCCI","GAITAN","MANDZUKIC","DAVIDLUIZ","KHEDIRA","HOWEDES","NAINGGOLAN","MARCELO","CANDREVA","SOKRATIS","HAMSIK","STURRIDGE","ARDA"]
            playerRating=[94,93,90,90,89,89,88,88,88,88,87,87,87,87,87,87,87,87,87,87,87,87,87,86,86,86,86,86,86,86,86,86,86,86,86,86,85,85,85,85,85,85,85,85,85,85,84,84,80,82,84,84,84,84,82,84,84,84,84,84,82,83,82,82,84,80,79,84,79,80,83,84,82,81,82,82,78,83,83,80,83,83,83,80,80,77,80,83,81,80,79,84,80,80,84,83]
            playerinput=""
            sendname=""
            sendrating=0
            bidder=""
            bidamount=0
            index=""
            playercount=0
            isbidopen=False
            skip=False
            gamin=False
            clock=0
            frating=0
            winc=False
            #end of reset
            gameon=True
            isbidopen=True
            irc.send("PRIVMSG "+channel+" :Auction boards drawn up! Call out your team names! You only have 1 minute!\r\n")
            clock=time.clock()
        elif text.find(":@reset")!=-1 and getname(text)=="greymatter1999":#DEBUG COMMAND, REMOVE LATER
            irc.send("PRIVMSG "+channel+" :Resetting everything...\r\n")
            #reset
            text=""
            teams[:]=[]
            gameon=False
            bidon=False
            activebid=0
            players=["MESSI","RONALDO","SUAREZ","ROBBEN","HAZARD","ZLATAN","NEYMAR","DAVIDSILVA","THIAGOSILVA","INIESTA","JAMESRODRIGUEZ","LEWANDOWSKI","BOATENG","KROOS","MODRIC","OZIL","BALE","FABREGAS","RIBERY","RAMOS","AGUERO","CHIELLINI","LAHM","POGBA","DEBRUYNE","MULLER","BUSQUETS","REUS","SANCHEZ","VIDAL","COSTA","HUMMELS","BENZEMA","TEVEZ","BASTIAN","ROONEY","ALABA","DIMARIA","GODIN","CAVANI","NALDO","PIQUE","CAZORLA","KOMPANY","YAYA","TERRY","VERRATI","ISCO","JACKSON","LACAZETTE","OTAMENDI","GOTZE","MATIC","PASTORE","HULK","JORDIALBA","COUTINHO","OSCAR","PJANIC","MATA","JAVIMARTINEZ","BENATIA","MATUIDI","RAKITIC","MIRANDA","HIGUAIN","DANIALVES","SNEIJDER","BARZAGLI","PEPE","XABI","GERRARD","VANPERSIE","PIRLO","LAPORTE","BELLARABI","GRIEZMANN","KOKE","RICARDORODRIGUEZ","ERIKSEN","ALCANTARA","PEDRO","GUSTAVO","BONUCCI","GAITAN","MANDZUKIC","DAVIDLUIZ","KHEDIRA","HOWEDES","NAINGGOLAN","MARCELO","CANDREVA","SOKRATIS","HAMSIK","STURRIDGE","ARDA"]
            playerRating=[94,93,90,90,89,89,88,88,88,88,87,87,87,87,87,87,87,87,87,87,87,87,87,86,86,86,86,86,86,86,86,86,86,86,86,86,85,85,85,85,85,85,85,85,85,85,84,84,80,82,84,84,84,84,82,84,84,84,84,84,82,83,82,82,84,80,79,84,79,80,83,84,82,81,82,82,78,83,83,80,83,83,83,80,80,77,80,83,81,80,79,84,80,80,84,83]
            playerinput=""
            sendname=""
            sendrating=0
            bidder=""
            bidamount=0
            index=""
            playercount=0
            isbidopen=False
            skip=False
            gamin=False
            clock=0
            frating=0
            winc=False
            #end of reset
            irc.send("PRIVMSG "+channel+" :Resetting complete. Game ready to reinitialize.\r\n")
        elif text.find(":@name ")!=-1 and isbidopen==True:
            skip=False
            for x in teams:
                if(x.mname==getname(text)):
                    irc.send("PRIVMSG "+channel+" :"+getname(text)+" has already registered!")
                    skip=True
            if(skip==False):
                teams.append(team())
                teams[-1].mname=getname(text)
                teams[-1].tname=str(text.split(":@name ")[1]).strip("\r\n")
                playercount+=1
                irc.send("PRIVMSG "+channel+" :User "+teams[-1].mname+" has registered the team "+teams[-1].tname+".\r\n")
        elif (isbidopen==True and time.clock()>clock+60):
            irc.send("PRIVMSG "+channel+" :Team registration closed! You may now start calling players and making bids!\r\n")
            gamin=True
            isbidopen=False
            clock=0
        elif text.find(":@call ")!=-1 and gamin==True:
            playerinput=str(((text.split(":@call ")[1]).upper()).strip("\r\n"))
            if playerinput in players:
                index=players.index(playerinput)
                sendname=players.pop(index)
                sendrating=playerRating.pop(index)
                bidon=True
                gamin=False
                irc.send("PRIVMSG "+channel+" : bidding has started for "+str(sendname)+" with rating "+str(sendrating)+"! \r\n")            
            else:
                irc.send("PRIVMSG "+channel+" : "+playerinput+" is not available!\r\n")
        elif text.find(":@bid ")!=-1 and bidon==True and int(text.split(":@bid ")[1])<activebid+50:
                irc.send("PRIVMSG "+channel+" : Make a bid atleast 50 higher than the current one please...\r\n")
        elif text.find(":@bid ")!=-1 and bidon==True and int(text.split(":@bid ")[1])%50!=0:
                irc.send("PRIVMSG "+channel+" : The bid must be a multiple of 50!\r\n")
        elif text.find(":@bid ")!=-1 and text.split(":@bid ")[1].isdigit()==True and bidon==True and int(text.split(":@bid ")[1])>=activebid+50:
            bidder=getname(text)
            bidamount=int(text.split(":@bid ")[1])                
            for z in teams:
                if(z.mname==bidder):
                    if(z.budget-bidamount<0):
                        irc.send("PRIVMSG "+channel+" :"+bidder+" does not have enough money for that bid!\r\n")
                    elif(len(z.tplayers)==11):
                        irc.send("PRIVMSG "+channel+" :"+bidder+" already has 11 players!\r\n")
                    else:
                        activebid=bidamount
                        irc.send("PRIVMSG "+channel+" : "+bidder+" has made a bid of "+str(activebid)+"! This bid will be locked in 20 seconds!\r\n")
                        clock=time.clock()
        elif bidon==True and clock>0:
            if(time.clock()>=clock+20):
                    irc.send("PRIVMSG "+channel+" :"+str(sendname)+" sold to "+bidder+" for "+str(activebid)+"!\r\n")
                    for q in teams:
                        if(q.mname==bidder):
                            q.tplayers.append(sendname)
                            q.trating+=sendrating
                            q.budget-=activebid
                    clock=0
                    activebid=0
                    bidon=False
                    gamin=True
                    irc.send("PRIVMSG "+channel+" : Call the next player.\r\n")
        elif text.find(":@help")!=-1:
            irc.send("PRIVMSG "+channel+" :All commands must be preceded by '@' sign\r\n")
            irc.send("PRIVMSG "+channel+" :@help-->Shows all available commands.\r\n")
            irc.send("PRIVMSG "+channel+" :@hi -->Bot test command.\r\n")
            irc.send("PRIVMSG "+channel+" :@name <teamname> -->Register your team's name. \r\n")
            irc.send("PRIVMSG "+channel+" :@call <playername> -->Call a player for auctioning.\r\n")
            irc.send("PRIVMSG "+channel+" :@bid <amount> -->Bid a particular amount for a player.\r\n")
            irc.send("PRIVMSG "+channel+" :@viewteam -->View your current team.\r\n")
            irc.send("PRIVMSG "+channel+" :@cash -->View your remaining budget.\r\n")
        text=""
    #except Exception:
        #continue
    
#Pause output and termiate execution    
input()        
