var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, stoneGroup

var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(200,400,100,100);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false

  
  
  ground = createSprite(0,470,1200,20);
  ground.shapeColor = "brown";
  ground.x = ground.width/2;
  ground.velocityX = -5;
  
  bananaGroup = createGroup();
  stoneGroup = createGroup(); 
  
  
}


function draw() {
   background("green");
  text("survivalTime" + survivalTime,500,50);
  survivalTime=Math.ceil(frameCount/frameRate());
  if (gameState === PLAY){
     ground.velocityX = -5;
     if(ground.x<0){
        ground.x = ground.width/2; 
     }   
    
     if(keyDown("space") && monkey.y >= 200 ){
        monkey.velocityY = -10;  
      }
      monkey.velocityY = monkey.velocityY + 0.5;
   
      spawnBananas();
      spawnStones();
    
      if(bananaGroup.isTouching(monkey)){
         bananaGroup.destroyEach();      
         monkey.scale = monkey.scale + 0.01
      }
    
      if(stoneGroup.isTouching(monkey)){
         gameState = END;   
      }       
    
  }
  else if(gameState === END){
         ground.velocityX = 0;
         monkey.velocityY = 0;
         bananaGroup.setVelocityXEach(0)
         stoneGroup.setVelocityXEach(0)
         bananaGroup.setLifetimeEach(-1)
         stoneGroup.setLifetimeEach(-1)
  }
  
  monkey.collide(ground);
  drawSprites();
  
}

function spawnBananas(){
    if(frameCount % 75 === 0 )   {
       var banana = createSprite(600,10,50,50);
       banana.addImage(bananaImage);
       banana.scale = 0.1;
       banana.velocityX = -5;
       banana.y = Math.round(random(200,400))
       banana.lifeTime = 200;
       bananaGroup.add(banana);
    }
  
}


function spawnStones(){
    if(frameCount % 150 === 0 )   {
       var stone = createSprite(600,10,50,50);
       stone.addImage(obstacleImage);
       stone.scale = 0.1;
       stone.velocityX = -5;
       stone.y = 450
       stone.lifeTime = 200;
       stoneGroup.add(stone);

      
    }
  
}









