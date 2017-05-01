var boot = function(game){
	console.log("%cLet's do that!", "color:white; background:red");
};

boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/loading.png");
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
		this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
	}
}
