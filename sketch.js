var PLAY=1
var END=0
var gameState=PLAY

var pinkOpponentGroup,yellowOpponentGroup,redOpponentGroup
var obstacle1Group,obstacle2Group,obstacle3Group

var road,racer,opponentPink,opponentYellow,opponentRed
var roadImage,racerImage1,racerImage2,opponentPink1Image, opponentPink2Image,opponentYellow1Image,opponentYellow2Image,opponentRed1Image,opponentRed2Image

var obstacle1,obstacle2,obstacle3
var obstacle1Image,obstacle2Image,obstacle3Image

var racerMoving=0

var edges

var gameOver,restart
var gameOverImage

var bellSound

function preload(){
  
  roadImage=loadImage("images/Road.png")
  
  gameOverImage= loadImage("images/gameOver.png")
  
  racerImage1=loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png")
  racerImage2=loadAnimation("images/mainPlayer3.png");
  
  opponentPink1Image=loadAnimation("images/opponent1.png","images/opponent2.png");
  opponentPink2Image=loadAnimation("images/opponent3.png")
  
  opponentYellow1Image=loadAnimation("images/opponent4.png","images/opponent5.png")
  opponentYellow2Image=loadAnimation("images/opponent6.png")
  
  opponentRed1Image=loadAnimation("images/opponent7.png","images/opponent8.png")
  opponentRed2Image=loadAnimation("images/opponent9.png")
  
  obstacle1Image=loadAnimation("images/obstacle1.png")
  obstacle2Image=loadAnimation("images/obstacle2.png")
  obstacle3Image=loadAnimation("images/obstacle3.png")
  
  bellSound= loadSound("sounds/bell.mp3");
}

function setup(){
  
  createCanvas(displayWidth,displayHeight)
  
  pinkOpponentGroup=new Group()
  yellowOpponentGroup=new Group()
  redOpponentGroup=new Group()
  obstacle1Group=new Group()
  obstacle2Group=new Group()
  obstacle3Group=new Group()
  
  road=createSprite(displayWidth/2,displayHeight/2)
  road.addImage(roadImage)
  road.velocityX=-7

  racer=createSprite(59,displayHeight/2)
  racer.addAnimation("racer",racerImage1)
  racer.scale=0.07
  
  gameOver=createSprite(displayWidth/2,displayHeight/2)
  gameOver.addImage(gameOverImage)
  gameOver.scale=1
  gameOver.visible=false
}

function draw(){
  
  background("cyan")
  
  drawSprites()
  
  racer.debug=false
  racer.setCollider("circle",0,0,450)
  
  textSize(18)
  fill("skyBlue")
  text("Distance:  "+racerMoving,displayWidth/2,40);
  
  if(gameState===PLAY){
   
  racerMoving=racerMoving+Math.round(getFrameRate()/40)
  road.velocityX=-(6+2*racerMoving/140)
  
  if(road.x<0){
  road.x=width/2
  } 
    
  racer.y=World.mouseY
  
  if(keyDown("space")){
  bellSound.play()
  }    
  
  edges=createEdgeSprites()
  racer.collide(edges[3])
  racer.collide(edges[2])
  
  if(pinkOpponentGroup.isTouching(racer)){
    
  gameState=END
  opponentPink.addAnimation("opponentPink",opponentPink2Image)
  opponentPink.velocityY=0
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)
  }
    
  if(yellowOpponentGroup.isTouching(racer)){
    
  gameState=END
  opponentYellow.addAnimation("opponentYellow",opponentYellow2Image)
  opponentYellow.velocityY=0
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)
  }
    
  if(redOpponentGroup.isTouching(racer)){
    
  gameState=END
opponentRed.addAnimation("opponentRed",opponentRed2Image)
  opponentRed.velocityY=0
  obstacle1Group.setVelocityXEach(0)
  obstacle2Group.setVelocityXEach(0)
  obstacle3Group.setVelocityXEach(0)
  }
    
  if(racer.isTouching(obstacle1Group)){
  
  gameState=END
  racer.addAnimation("racer",racerImage2)
  obstacle1.velocityX=0
  }
    
  if(racer.isTouching(obstacle2Group)){
  
  gameState=END
  racer.addAnimation("racer",racerImage2)
  obstacle2.velocityX=0
  }
  
  if(racer.isTouching(obstacle3Group)){
  
  gameState=END
  racer.addAnimation("racer",racerImage2)
  obstacle3.velocityX=0 
  }
  
  var select_opponentCycles=Math.round(random(1,3))
  
  if(World.frameCount%150==0){
  if(select_opponentCycles==1){
  pinkCyclists()
  }else if (select_opponentCycles==2){
  yellowCyclists()
  }else{
  redCyclists()
  }
  }
    
  var select_obstcles=Math.round(random(1,3))  
  
  if(World.frameCount%170==0){
  if(select_obstcles==1){
  spawnObstcle1()
  }else if (select_obstcles==2){
  spawnObstcle2()
  }else{
  spawnObstcle3()
  }
  }
    
  }else if(gameState===END){
    
  racer.addAnimation("racer",racerImage2)
  racer.velocityY=0
    
  road.velocityX=0
    
  gameOver.visible=true
    
  textSize(18)
  fill("red")
  text("well done, press up_arrow to restart the game",
  displayWidth/2,100)
  
  if(keyDown("UP_ARROW")){
  reset()
  }  
  
  pinkOpponentGroup.setLifetimeEach(-1)
  yellowOpponentGroup.setLifetimeEach(-1)
  redOpponentGroup.setLifetimeEach(-1)
    
  pinkOpponentGroup.setVelocityXEach(0)
  yellowOpponentGroup.setVelocityXEach(0)
  redOpponentGroup.setVelocityXEach(0)
  }

  camera.position.y=racer.y

}

function pinkCyclists(){
  
  opponentPink=createSprite(600,Math.round(random(40,260)))
  opponentPink.addAnimation("opponentPink",opponentPink1Image)
    
  opponentPink.velocityX=-(4+2*racerMoving/100)
     
  opponentPink.scale=0.07

  opponentPink.setLifetime=150
  
  pinkOpponentGroup.add(opponentPink)
}

function yellowCyclists(){
  
  opponentYellow=createSprite(600,Math.round(random(40,260)))
  opponentYellow.addAnimation("opponentYellow",opponentYellow1Image)
  
  opponentYellow.velocityX=-(5+2*racerMoving/100)
  
  opponentYellow.scale =0.07
  
  opponentYellow.setLifetime=120
  
  yellowOpponentGroup.add(opponentYellow)
}

function redCyclists(){

  opponentRed=createSprite(600,Math.round(random(40,260)))

  opponentRed.addAnimation("OpponentRed",opponentRed1Image)
  
  opponentRed.velocityX=-(6+2*racerMoving/100) 
  
  opponentRed.scale=0.07
  
  opponentRed.setLifetime=100
  
  redOpponentGroup.add(opponentRed)
}

function spawnObstcle1(){
  obstacle1=createSprite(600,Math.round(random(40,260)))
  obstacle1.addAnimation("obstacle1",obstacle1Image)
  obstacle1.velocityX=-(4+2*racerMoving/120)
  obstacle1.scale=0.1
  obstacle1.setLifetime=150
  obstacle1Group.add(obstacle1)
}

function spawnObstcle2(){
  obstacle2=createSprite(600,Math.round(random(40,260)))
  obstacle2.addAnimation("obstacle2",obstacle2Image)
  obstacle2.velocityX=-(4+2*racerMoving/120)
  obstacle2.scale=0.1
  obstacle2.setLifetime=150
  obstacle2Group.add(obstacle2)
}

function spawnObstcle3(){
  obstacle3=createSprite(600,Math.round(random(40,260)))
  obstacle3.addAnimation("obstacle3",obstacle3Image)
  obstacle3.velocityX=-(4+2*racerMoving/120)
  obstacle3.scale=0.1
  obstacle3.setLifetime=150
  obstacle3Group.add(obstacle3)
}


function reset(){
  
  gameState=PLAY

  racer.addAnimation("racer",racerImage1)
  
  gameOver.visible=false
  
  pinkOpponentGroup.destroyEach()
  yellowOpponentGroup.destroyEach()
  redOpponentGroup.destroyEach()
  obstacle1Group.destroyEach()
  obstacle2Group.destroyEach()
  obstacle3Group.destroyEach()
  
  racerMoving=0
}