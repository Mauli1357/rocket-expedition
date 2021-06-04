  var bg, bgImg;
  var rocket, rocketImg;
  var edges;
  var plusone;
  var meteorImg, heartImage, gameoverImg, mountainImg, plusoneImg, rockoneImg, rocktwoImg, alienImg;
  var obstaclesGroup, heartsGroup;
  var lives = 5;
  var END = 0;
  var PLAY = 1;
  var gameState=PLAY;

  function preload(){
    bgImg = loadImage("Images/Bg.png");
    mountainImg = loadImage("Images/mountain.png");
    rocketImg = loadImage("Images/rocketship.png");
    meteorImg = loadImage("Images/obstacle1.png");
    rockoneImg = loadImage("Images/rock1.png");
    rocktwoImg = loadImage("Images/rock2.png");
    alienImg = loadImage("Images/alien.png");
    heartImage = loadImage("Images/heart.png");
    gameoverImg = loadImage("Images/gameOver.png");
    plusoneImg = loadImage("Images/plusonelife.png")
  }

  
  function setup() {
  createCanvas(600,300);
  
  

  rocket = createSprite(100, 150, 50, 50);
  rocket.addImage(rocketImg);
  rocket.scale = 0.17;
  rocket.debug=false;

  obstaclesGroup = new Group();
  heartsGroup = new Group();

  gameOver=createSprite(width/2,100);
  gameOver.addImage(gameoverImg);
  gameOver.scale= 2;
  gameOver.visible=false;

  edges = createEdgeSprites();

}

function draw() {
  background(0); 

  if(gameState === PLAY){
    

    // To make the rocket jump
    if(keyDown("space")){
      rocket.velocityY = -3;
    }
    
    // reduce one life after colliding w/ obstacles
    if(obstaclesGroup.isTouching(rocket)){
      lives = lives-1;
      console.log(lives);
      obstaclesGroup.destroyEach();
    }

    // to spawn lives
    if(lives<5){
      addlives()
    }
  
    //add lives
    if(heartsGroup.isTouching(rocket)){
      lives = lives+1;
      heartsGroup.destroyEach();
      plusone = createSprite(580,250,10,10);
      plusone.velocityY = -5;
      plusone.scale = 0.075;
      plusone.addImage(plusoneImg)
     }
     
    rocket.velocityY += 0.2;
    rocket.collide(edges[3])

    scrollbg();
    aliens();
    meteor();
    spacemountains();
    spacerocks();
    spacerockstwo();

    if(lives===0){
      gameState=END;

    }
  } 
  else if (gameState===END){

    bg.setVelocityX = 0;
    heartsGroup.setVelocityXEach(0);
    heartsGroup.setLifetimeEach(-1);
    rocket.velocityY=0;
    gameOver.visible = true;
  }
 
    drawSprites();
    hearts();

    //text lives
    if(lives>0){
      textSize(20)
      fill("red")
      text("Lives:", 400, 35)
    }
}

function meteor(){
  if(frameCount %400 === 0){
    var obstacle = createSprite(600, 50, 50, 50);
    obstacle.addImage(meteorImg);
    obstacle.velocityX = random(-8, 0);
    obstacle.velocityY = random(0, 5);
    obstacle.scale = 0.4;
    obstacle.lifetime = 600;
    obstaclesGroup.add(obstacle);
  }

}

function aliens(){
  if(frameCount %175 === 0){
    var alien = createSprite(600, 150, 50, 50)
    alien.velocityX = -8;
    alien.addImage(alienImg);
    alien.debug = false;
    alien.scale = 0.25;
    alien.lifetime = 600/8;
    obstaclesGroup.add(alien);
  }

}

function spacemountains(){
  if(frameCount % 200 === 0){
    spacemountain = createSprite(900, 205, 50, 50);
    spacemountain.addImage(mountainImg);
    spacemountain.velocityX = -8;
    spacemountain.scale= 0.75;
    spacemountain.depth = rocket.depth -1;
    obstaclesGroup.add(spacemountain);
    spacemountain.debug = false;
   
  }
}

function spacerocks(){
  if(frameCount % 550 === 0){
    spacerock = createSprite(600, 50, 10, 10);
    spacerock.addImage(rockoneImg);
    spacerock.scale = 0.5;
    spacerock.velocityX = -8;
    spacerock.depth = rocket.depth -1;
    spacerock.debug = false;  
    spacerock.setCollider("circle", 0,0,160);
    obstaclesGroup.add(spacerock);
  } 
}

function spacerockstwo(){
  if(frameCount % 290 === 0){
    spacerocktwo = createSprite(600, 50, 10, 10);
    spacerocktwo.addImage(rocktwoImg);
    spacerocktwo.scale = 0.5;
    spacerocktwo.velocityX = -8;
    spacerocktwo.depth = rocket.depth -1;
    spacerocktwo.debug = false;   
    spacerocktwo.setCollider("circle", 0,10,160);
    obstaclesGroup.add(spacerocktwo);
  }
}    

function hearts(){
  console.log("In hearts :"+lives);
  for(var i = 1 ; i <= lives; i++){
     image(heartImage,450+20*i, 20, 20, 20);
  }
}

function addlives(){
  if(frameCount %1000 === 0){
    var heart = createSprite(600, 200, 10, 10);
    heart.addImage(heartImage);
    heart.velocityX = -8;
    heart.scale = 0.08;
    heartsGroup.add(heart);
  }




}

function scrollbg(){
  if(frameCount % 80 === 0){
    bg = createSprite(900, 150, 50, 50);
    bg.addImage(bgImg);
    bg.velocityX = -8;
    bg.scale= 0.5;
    bg.lifetime = 600;
    bg.depth = rocket.depth -3;
  }

  


}