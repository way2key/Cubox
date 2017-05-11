var gameOver = function(game){}
var titleStyle = { font: "80px Arial", fill: "#013ADF", align: "center" };
gameOver.prototype = {
	init: function(bestScore,score){
		this.score = score;
		this.bestScore = bestScore;
		this.bestScoreText = "";
		for(i=0;i<this.bestScore.length;i++){
			this.bestScoreText+=this.bestScore[i]+"\t\n"
		}
	},
  	create: function(game){
			// Bar
			var bar = game.add.graphics();
	   	bar.beginFill(0x000000, 0.2);
	   	bar.drawRect(0, 100, 1600, 100);

	    // Score
			var score = this.game.add.text(game.world.width*8/24,game.world.height*5/24,"Score: "+this.score,titleStyle);
			var style = { font: "20px Courier", fill: "#fff", tabs: 132 };
			var leaderBoard = game.add.text(100, 64, "Best Score\t", style);
			var playersScores = game.add.text(100, 120, this.bestScoreText, style);
	    score.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	    var grd = score.context.createLinearGradient(0, 0, 0, score.canvas.height);
	    grd.addColorStop(0, '#8ED6FF');
	    grd.addColorStop(1, '#004CB3');
	    gameTitle.fill = grd;
			// PlayButton
			var playButton = this.game.add.button(game.world.centerX,game.world.height*14/24,"play",this.playTheGame,this);
			playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.score = 0;
		this.game.state.start("theGame");
	}
}
