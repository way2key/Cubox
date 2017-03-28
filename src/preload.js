var preload = function(game){}

preload.prototype = {
	preload: function(){
          var loadingBar = this.add.sprite(160,240,"loading");
          loadingBar.anchor.setTo(0.5,0.5);
          this.load.setPreloadSprite(loadingBar);
					this.game.load.image("play","assets/play.png");
					// preloading the assets
				  this.game.load.image("ground", "assets/ground.png");
				  this.game.load.image("hero", "assets/hero.png");
				  this.game.load.image("eyes", "assets/hero_eyes.png");
				  this.game.load.image("enemy", "assets/enemy.png");
					this.game.load.image("smasher", "assets/smasher.png");

	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}
