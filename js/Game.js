class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("carimg",car1img);
    car2 = createSprite(300,200);
    car2.addImage("carimg",car2img);
    car3 = createSprite(500,200);
    car3.addImage("carimg",car3img);
    car4 = createSprite(700,200);
    car4.addImage("carimg",car4img);
    cars =[car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers !== undefined){
    background('red');
    image(trackimg, 0, -displayHeight*4,displayWidth, displayHeight*5);
    var index = 0;
    var x = 175;
    var y;

    for(var plr in allPlayers){
      index = index+1;
      x= x+200
      y = displayHeight - allPlayers[plr].distance;
      cars[index-1].x = x;
      cars[index-1].y = y;

      if(index === player.index){
        stroke(10);
        fill("green");
        ellipse(x,y,70,70);
        cars[index-1].shapeColor = "blue";
        camera.position.x = displayWidth/2;
        camera.position.y = cars[index-1].y
      }
    }
    }

    if(keyDown("UP_ARROW") && player.index !== null){
      player.distance += 10;
      player.update();
    }

    if(player.distance > 3900){
      gameState = 2
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();

  }

  end(){
    console.log("game has ended");
    console.log(player.rank);
    textSize(80);
    fill("red");
    text("Your rank" + player.rank, 180,180);
    drawSprites();
  }

 
  
}
