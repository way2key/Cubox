var gameTitle = function(game){}
var title="CUB[]X";
var titleStyle = { font: "80px Arial", fill: "#013ADF", align: "center" };
gameTitle.prototype = {
  	create: function(game){
    // Background
    game.stage.backgroundColor = 808080;

    // Bar
    this.bar = game.add.graphics();
    this.bar.beginFill(0x000000, 0.2);
    this.bar.drawRect(0, game.world.height*4/24, game.world.width, 100);

    // Title
		var gameTitle = this.game.add.text(0,0,title,titleStyle);
    gameTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    gameTitle.alignIn(this.bar,Phaser.CENTER,0,160);

    // Title gradient
    var grd = gameTitle.context.createLinearGradient(0, 0, 0, gameTitle.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    gameTitle.fill = grd;

    // Button
		var playButton = this.game.add.button(game.world.centerX,game.world.height*12/24,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5);

	},
	playTheGame: function(){
		this.game.state.start("theGame");
	}
}
