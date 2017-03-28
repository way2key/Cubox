var theGame = function(game){
  // all variables stored in the game object
  this.squareSize = 40;
  this.startingSquareX = 2;
  this.startingSquareY = 7;
  this.level = 8;
  this.moveTime = 150;
  this.count=Math.ceil(Math.random()*5)+2;
  this.score = 0;
  // all variables available with their name
  var squareSize = this.squareSize;
  var startingSquareX = this.startingSquareX;
  var startingSquareY = this.startingSquareY;
  var level = this.level;
  var moveTime = this.moveTime;
  var count=this.count;
  var score = this.score;
}
theGame();

theGame.prototype = {
  create: function(game){

			var gameTitle = this.game.add.text(game.world.centerX-140,game.world.height*5/24,"Almost working");

			//create all groups
		  this.terrainGroup = game.add.group();
		  this.enemyGroup = game.add.group();
		  game.stage.backgroundColor = 808080;

			// filling the field with squares to create the terrain
		  for(var i=0; i<game.width/squareSize+2; i++){
		      var square = game.add.sprite(i*squareSize, 8*squareSize, "ground");
		      this.terrainGroup.add(square);
		  }

			// adding the hero
		  this.hero = game.add.sprite(startingSquareX*squareSize+squareSize/2, startingSquareY*squareSize+squareSize/2, "hero");
		  this.hero.eyes=game.add.sprite(startingSquareX*squareSize+squareSize/2, startingSquareY*squareSize+squareSize/2, "eyes");
		  this.hero.anchor.set(0.5);
		  this.hero.eyes.anchor.set(0.5);
		  this.hero.canMove = true;
		  game.physics.enable(this.hero, Phaser.Physics.ARCADE);
		  this.hero.body.moves = false;

			// input listener waiting for mouse or touch input, then calling moveSquare method
		  game.input.onDown.add(this.moveSquare, this);

	},
	moveSquare: function(game){
    //nothing
		if(this.hero.canMove){

			// the hero is about to be moved so we aren't considering more inputs
	    this.hero.canMove = false;

			// if the hero have to go up
	    this.terrainGroup.sort("x", Phaser.Group.SORT_ASCENDING);
	    if(this.terrainGroup.getChildAt(3).y==(this.hero.y+squareSize/2)){
	      //do nothing
	    }else if(this.terrainGroup.getChildAt(3).y<(this.hero.y+squareSize/2)){
	      //go up
	      this.hero.y-=squareSize;
	      this.hero.eyes.y-=squareSize;
	    }

			//tween to scroll the terrain to the left by squareSize pixels
			var scrollTween = this.add.tween(this.terrainGroup).to({
	      x: this.terrainGroup.x - squareSize
	    }, moveTime, Phaser.Easing.Linear.None, true);

			//tween to scroll the ennemies to the left by squareSize pixels
			var enemyTween = this.add.tween(this.enemyGroup).to({
				x: this.terrainGroup.x -squareSize
			},moveTime,Phaser.Easing.Linear.None,true);

			// tween to rotate and move the hero
	    var moveTween = this.add.tween(this.hero).to({
	      angle: this.hero.angle+90
	    },moveTime, Phaser.Easing.Linear.None, true);

      // once the tween has been completed...
      moveTween.onComplete.add(function(){
        if(this.terrainGroup.getChildAt(3).y>(this.hero.y+squareSize/2)){
          //go up
          this.hero.y+=squareSize;
          this.hero.eyes.y+=squareSize;
        }

        //the hero can move again
        this.hero.canMove = true;
        this.terrainGroup.sort("x", Phaser.Group.SORT_ASCENDING);

        //getting the leftmost enemy and destroy it
        this.enemyGroup.sort("x",Phaser.Group.SORT_ASCENDING);
        if(this.enemyGroup.length > 0 && this.enemyGroup.getChildAt(0).x <= this.terrainGroup.getChildAt(0).x){
          this.enemyGroup.getChildAt(0).destroy();
        }
        //bring leftmost square to the right
        this.terrainGroup.getChildAt(0).y=level*squareSize;
        this.terrainGroup.getChildAt(0).x+=this.terrainGroup.length*squareSize;

        // determining the level of the ground
        var sign=Math.random() < 0.5 ? -1 : 1;
        if(count<3){
          if(level>9){
            level-=1;
          }else if(level<6){
            level+=1;
          }else{
            level+=1*sign;
          }
          count=Math.ceil(Math.random()*5)+2;
          }
        else{
            count--;
        }
        //add an enemy
        if(this.rnd.integerInRange(0,9)<6){
          this.addSmasher();
        }else{  this.addEnemy();}

      }, this);
		}
	},
	update: function(game){
		//looking for collision between the hero and the enemies
    game.physics.arcade.collide(this.hero,this.enemyGroup,function(game){
      //restart the game
      //game.state.start("GameOver",true,false,score);
      //alert("GAME OVER");
      //this.state.restart();
    });

	},
	addEnemy: function(game){
    // adding the enemy over the rightmost tile
    this.terrainGroup.sort("x", Phaser.Group.SORT_DESCENDING);
    var enemy = this.add.sprite(this.terrainGroup.getChildAt(0).x,0,"enemy");
    this.physics.enable(enemy,Phaser.Physics.ARCADE);
    enemy.body.moves=false;
    var lastHeight=this.terrainGroup.getChildAt(0).y-40;
    //giving the enemy a yoyo tween to move it at a random speed

    this.add.tween(enemy).to({
      y:lastHeight
    },1500+this.rnd.integerInRange(0, 250),Phaser.Easing.Default,true,0,100,true);

    this.enemyGroup.add(enemy);

	},
  addSmasher: function(game){
    // adding the enemy over the rightmost tile
    this.terrainGroup.sort("x", Phaser.Group.SORT_DESCENDING);
    var smasher = this.add.sprite(this.terrainGroup.getChildAt(0).x,0,"smasher");
    this.physics.enable(smasher,Phaser.Physics.ARCADE);
    smasher.body.moves=false;
    var lastHeight=this.terrainGroup.getChildAt(0).y-40;
    if(1!=1){
      // fall
      this.add.tween(smasher).to({
        y:lastHeight
      },600+this.rnd.integerInRange(0, 250),Phaser.Easing.Default,true,0,100,true);
    }else{
      // stay in place
      console.log(this);
      this.game.add.tween(smasher).to({y : smasher.y+10},1050,Phaser.Easing.Linear.None,true,0,100,true);
      /*
      this.add.tween(smasher).to({
        y:smasher.y+10
      },1050,Phaser.Easing.Default,true,0,-1,true);
      */
    }


    this.enemyGroup.add(smasher);
  }
}
