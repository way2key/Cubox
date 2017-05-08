var boot = function(game){
	console.log("Start this awesome game ;-)");
};

boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/images/loading.png");
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
	}
}
