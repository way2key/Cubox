var theGame = function(game){
  // All variables stored in the game object
  this.squareSize = 40;
  this.startingSquareX = 2;
  this.startingSquareY = 7;
  this.level = 8;
  this.moveTime = 125;
  this.count = Math.ceil(Math.random()*5)+2;
  this.score = 0;
  this.boost = 10;
  this.bestScore = [];

  // All variables available directly with their name
  var squareSize = this.squareSize;
  var startingSquareX = this.startingSquareX;
  var startingSquareY = this.startingSquareY;
  var count = this.count;
}
theGame();

theGame.prototype = {
  init: function(game){
    // Initialise all dynamiques variables
    this.score = 0;
    this.count = Math.ceil(Math.random()*5)+2;
    this.level = 8;
    this.moveTime = 125;
    this.boost = 10;
  },
  create: function(game){
      // Print all texts
      this.textScore = game.add.text(20, 400, "Score: ", {
        font: "65px Arial",
        fill: "#013ADF",
        align: "center"
      });
      this.textScore.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      var grd = this.textScore.context.createLinearGradient(0, 0, 0, this.textScore.canvas.height);
      grd.addColorStop(0, '#8ED6FF');
      grd.addColorStop(1, '#004CB3');
      this.textScore.fill = grd;
      this.textBoost = game.add.text(game.world.centerX, 400, "Boost: "+this.boost, {
        font: "65px Arial",
        fill: "#013ADF",
        align: "center"
      });
      this.textBoost.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
      var grd = this.textBoost.context.createLinearGradient(0, 0, 0, this.textBoost.canvas.height);
      grd.addColorStop(0, '#8ED6FF');
      grd.addColorStop(1, '#004CB3');
      this.textBoost.fill = grd;
      game.stage.backgroundColor = 808080;

      // Set the music
      music = this.game.add.audio('soundtrack');
      music.fadeIn(1500);

			// Create all groups
		  this.terrainGroup = game.add.group();
		  this.enemyGroup = game.add.group();
      this.smasherGroup = game.add.group();
      this.bonusGroup = game.add.group();

			// Filling the field with squares to create the terrain
		  for(var i=0; i<24; i++){
		      var square = game.add.sprite(i*squareSize, 8*squareSize, "ground");
		      this.terrainGroup.add(square);
		  }

			// Adding the hero
		  this.hero = game.add.sprite(startingSquareX*squareSize+squareSize/2, startingSquareY*squareSize+squareSize/2, "hero");
		  this.hero.eyes = game.add.sprite(startingSquareX*squareSize+squareSize/2, startingSquareY*squareSize+squareSize/2, "eyes");
		  this.hero.anchor.set(0.5);
		  this.hero.eyes.anchor.set(0.5);
		  this.hero.canMove = true;
      this.hero.canBoost = true;
      this.hero.canFlash = true;
		  game.physics.enable(this.hero, Phaser.Physics.ARCADE);
		  this.hero.body.moves = false;

      // Creating the speed emitter particles
      this.emitter = game.add.emitter(this.hero.x-20,this.hero.y,400);
      this.emitter.height = this.squareSize;
      this.emitter.width = 0;
      this.emitter.makeParticles('rain');
      this.emitter.minParticleScale = 0.1;
      this.emitter.maxParticleScale = 0.4;
      this.emitter.setYSpeed(-2, 2);
      this.emitter.setXSpeed(-700, -100);
      this.emitter.tint = 0xd21111;
      this.emitter.start(false, 1600, 1, 0);
      this.emitter.on = false;

      //Prevent directions and space key events bubbling up to browser
      game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
    ]);

	},
	moveSquare: function(game){
		if(this.hero.canMove){
	    this.hero.canMove = false;

			// If the hero have to go up
	    this.terrainGroup.sort("x", Phaser.Group.SORT_ASCENDING);
	    if(this.terrainGroup.getChildAt(3).y == (this.hero.y+squareSize/2)){
	      // Do nothing
	    }else if(this.terrainGroup.getChildAt(3).y < (this.hero.y+squareSize/2)){
	      // Go up
        var heroUp = this.add.tween(this.hero).to({y: this.hero.y-this.squareSize}, 1, Phaser.Easing.Linear.None, true);
        var eyesUp = this.add.tween(this.hero.eyes).to({y: this.hero.y-this.squareSize}, 1, Phaser.Easing.Linear.None, true);
        this.emitter.emitY = this.hero.y-this.squareSize;
	    }

      // Tweens to scroll all groups to the left by squareSize pixels
      this.terrainGroup.forEach(function(item){
        var scrollTween = this.add.tween(item).to({
  	      x: item.x - squareSize
  	    }, this.moveTime, Phaser.Easing.Linear.None, true);
      }, this);
      this.enemyGroup.forEach(function(item){
        var scrollTween = this.add.tween(item).to({
  	      x: item.x - squareSize
  	    }, this.moveTime, Phaser.Easing.Linear.None, true);
      }, this);
      this.smasherGroup.forEach(function(item){
        var scrollTween = this.add.tween(item).to({
  	      x: item.x - squareSize
  	    }, this.moveTime, Phaser.Easing.Linear.None, true);
      }, this);
      this.bonusGroup.forEach(function(item){
        var scrollTween = this.add.tween(item).to({
  	      x: item.x - squareSize
  	    }, this.moveTime, Phaser.Easing.Linear.None, true);
      }, this);

			// Tween to rotate and move the hero
	    var moveTween = this.add.tween(this.hero).to({
	      angle: this.hero.angle+90
	    },this.moveTime, Phaser.Easing.Linear.None, true);
      moveTween.onComplete.add(function(){
        if(this.terrainGroup.getChildAt(3).y > (this.hero.y+squareSize/2)){
          // Go down
          var heroDown = this.add.tween(this.hero).to({y: this.hero.y+this.squareSize}, 1, Phaser.Easing.Linear.None, true);
          var eyesDown = this.add.tween(this.hero.eyes).to({y: this.hero.y+this.squareSize}, 1, Phaser.Easing.Linear.None, true);
          this.emitter.emitY = this.hero.y+this.squareSize;
        }
        this.hero.canMove = true;

        // Getting the leftmost enemy and destroy it
        this.enemyGroup.sort("x",Phaser.Group.SORT_ASCENDING);
        this.terrainGroup.sort("x", Phaser.Group.SORT_ASCENDING);
        if(this.enemyGroup.length > 0 && this.enemyGroup.getChildAt(0).x <= this.terrainGroup.getChildAt(0).x){
          this.enemyGroup.getChildAt(0).destroy();
        }

        // Bring leftmost square to the right
        this.terrainGroup.getChildAt(0).y = this.level*squareSize;
        this.terrainGroup.getChildAt(0).x += this.terrainGroup.length*squareSize;

        // Determining the level of the ground
        var sign=Math.random() < 0.5 ? -1 : 1;
        if(count<3){
          if(this.level>8){
            this.level-=1;
          }else if(this.level<7){
            this.level+=1;
          }else{
            this.level+=1*sign;
          }
          count=Math.ceil(Math.random()*5)+2;
          }
        else{
            count--;
        }

        // Create enemy with the enemy's creator handler
        switch(this.rnd.integerInRange(0,6)){
          case 1:
            this.addSmasher();
            break;
          case 2:
            this.addSmasher();
            break;
          case 3:
            this.addSmasher();
            break;
          case 4:
            this.addEnemy();
            break;
          case 5:
            this.addEnemy();
            break;
          case 6:
            if(this.rnd.integerInRange(1,15)==10){
              this.addSpeedBonus();
            }
            break;
          default:
            break;
        }

      }, this);
      this.score++;
      this.textScore.setText("Score: "+this.score);
		}
	},
	update: function(game){
    var that=this;

    // A step forward for the hero
    if(game.input.activePointer.isDown){
      that.moveSquare();
    };

    // Let's speed!
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      that.speed();
    }

    // Let's teleport!
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
      that.teleportation();
    };

    // Are smashers falling?
    if(this.smasherGroup.length>=1){
      this.smasherGroup.forEach(function(item){
        item.fall(item.lastHeight);
      },this);
    }

    // Is boost bonus in hero's range?
    if(this.bonusGroup.length>=1){
      this.bonusGroup.forEach(function(item){
        item.getBonus();
      },this);
    }

		// Looking for collision between the hero and the enemies
    game.physics.arcade.collide(this.hero,this.enemyGroup,restart);
    game.physics.arcade.collide(this.hero,this.smasherGroup,restart);
    function restart(){
      var gameover = that.game.add.audio('gameover');
      gameover.play("",0,0.5);
      music.destroy();
  		that.bestScore.push(that.score);
  		that.bestScore.sort(function(a, b){return b - a});
      that.bestScore.slice(0,9);
      that.state.start("GameOver",true,false,that.bestScore,that.score);
    }
	},
	addEnemy: function(game){
    // Adding the enemy over the rightmost tile
    this.terrainGroup.sort("x", Phaser.Group.SORT_DESCENDING);
    var enemy = this.add.sprite(this.terrainGroup.getChildAt(0).x,0,"enemy");
    this.physics.enable(enemy,Phaser.Physics.ARCADE);
    enemy.body.moves=false;
    var lastHeight=this.terrainGroup.getChildAt(0).y-40;
    this.add.tween(enemy).to({
      y:lastHeight
    },1000+this.rnd.integerInRange(0, 750),Phaser.Easing.Default,true,0,-1,true);
    this.enemyGroup.add(enemy);

	},
  addSmasher: function(game){
    // Adding the smasher over the rightmost tile
    this.terrainGroup.sort("x", Phaser.Group.SORT_DESCENDING);
    var smasher = this.add.sprite(this.terrainGroup.getChildAt(0).x,0,"smasher");
    var crush = this.game.add.audio('crush');
    this.physics.enable(smasher,Phaser.Physics.ARCADE);
    smasher.body.moves=true;
    smasher.lastHeight=this.terrainGroup.getChildAt(0).y-40;
    var stay=this.game.add.tween(smasher).to({y : smasher.y+10},1050,Phaser.Easing.Linear.None,true,0,-1,true);
    var that=this;
    smasher.fall=function(lastHeight){
      if(smasher.body.moves&&that.hero.x==smasher.x-20){
        that.tweens.remove(stay);
        smasher.body.moves=false;
        var fall=that.add.tween(smasher).to({y:lastHeight},400+that.rnd.integerInRange(100, 350),Phaser.Easing.Default,true,0);
        fall.onComplete.add(swat,that);
        function swat(){
          that.game.camera.shake(0.003,125);
        }
        fall.onComplete.add(disappear,that);
        function disappear(){
          crush.play("",0,0.4);
          var disappear=that.add.tween(smasher).to({alpha:0},125,Phaser.Easing.Linear.None,true,0);
          disappear.onComplete.add(die,that);
          function die(){
            smasher.destroy();
          }
        }
      }

    }
    this.smasherGroup.add(smasher);
    this.terrainGroup.sort("x", Phaser.Group.SORT_ASCENDING);

  },
  addSpeedBonus: function(game){
    // Adding the bonus over the rightmost tile
    this.terrainGroup.sort("x", Phaser.Group.SORT_DESCENDING);
    var bonus = this.add.sprite(this.terrainGroup.getChildAt(0).x+20,this.terrainGroup.getChildAt(0).y-30,"speed");
    this.physics.enable(bonus,Phaser.Physics.ARCADE);
    bonus.anchor.set(0.5);
    bonus.alpha=0.8;
    this.bonusGroup.add(bonus);
    var stay=this.game.add.tween(bonus).to({y : bonus.y-3},1050,Phaser.Easing.Linear.None,true,0,-1,true);
    var that=this;
    bonus.getBonus=function(){
      that.game.physics.arcade.collide(that.hero,that.bonusGroup,function(){
        that.boost+=1;
        bonus.destroy();
        that.textBoost.setText("Boost: "+that.boost);
      });
    }
  },
  speed: function(game){
    if(this.hero.canBoost==true && !(this.boost<=0)){
      this.emitter.on = true;
      this.hero.canBoost = false;
      this.boost--;
      this.textBoost.setText("Boost: "+this.boost);
      var speed=this.game.add.audio('speed');
      var slow=this.game.add.audio('slowdown');
      this.hero.tint = 0xd21111;
      speed.play("",0,0.2);
      this.moveTime=75;
      this.game.time.events.add(Phaser.Timer.SECOND*1.4, function(){
        slow.play("",0,0.2);
        this.game.time.events.add(Phaser.Timer.SECOND*0.6, function(){
          this.moveTime = 125;
          this.hero.tint = 0xFFFFFF;
          this.hero.canBoost = true;
          this.emitter.on = false;
        },this);
      }, this);
    }
  },
  teleportation: function(game){
    if(this.hero.canFlash){
      this.hero.canFlash = false;
      //flash
      this.step();
      //spawn
      this.game.time.events.add(Phaser.Timer.SECOND*10, function(){
        that.hero.canFlash = true;
      });
    }
  },
  step: function(game){

  }
}
