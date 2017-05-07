var preload = function(game){}

preload.prototype = {
	preload: function(){
          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
					this.game.load.image("play","assets/images/play.png");
					// preloading the assets
				  this.game.load.image("ground", "assets/images/ground.png");
				  this.game.load.image("hero", "assets/images/hero.png");
				  this.game.load.image("eyes", "assets/images/hero_eyes.png");
				  this.game.load.image("enemy", "assets/images/enemy.png");
					this.game.load.image("smasher", "assets/images/smasher.png");
					this.game.load.image("rain", "assets/images/rain.png")
					this.game.load.image("speed", "assets/images/speed.png")
					this.game.load.audio("crush", "assets/audio/crush.mp3");
					this.game.load.audio("gameover", "assets/audio/gameover.wav");
					this.game.load.audio("soundtrack", "assets/audio/soundtrack3.wav");
					this.game.load.audio("speed", "assets/audio/speed.wav");
					this.game.load.audio("slowdown", "assets/audio/slowdown.wav");

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
