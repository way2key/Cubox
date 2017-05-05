var gameTitle = function(game){}
var title="CUB[]X";
var titleStyle = { font: "80px Arial", fill: "#013ADF", align: "center" };
gameTitle.prototype = {
  	create: function(game){
    //background
    game.stage.backgroundColor = 808080;
    //bar
    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.2);
    bar.drawRect(0, 100, 800, 100);
    //Title
		var gameTitle = this.game.add.text(game.world.centerX-140,game.world.height*5/24,title,titleStyle);
    gameTitle.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    var grd = gameTitle.context.createLinearGradient(0, 0, 0, gameTitle.canvas.height);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    gameTitle.fill = grd;
    //button
		var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
    //this.game.state.start("theGame");
	},
	playTheGame: function(){
		this.game.state.start("theGame");
	}
}
