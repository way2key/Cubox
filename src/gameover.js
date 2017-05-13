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
	    this.bar = game.add.graphics();
	    this.bar.beginFill(0x000000, 0.2);
	    this.bar.drawRect(0, game.world.height*4/24, game.world.width, 100);

	    // Score
			var score = this.game.add.text(0,0,"Score: "+this.score,titleStyle);
			score.alignIn(this.bar,Phaser.CENTER,0,160);
			var style = { font: "20px Courier", fill: "#fff", tabs: 132 };
			score.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

			// PlayButton
			var playButton = this.game.add.button(game.world.centerX,game.world.height*14/24,"play",this.playTheGame,this);
			playButton.anchor.setTo(0.5);

			// LeaderBoard
			this.container = game.add.graphics();
	    this.container.beginFill(0x77B5FE,0.9);
			this.container.anchor.setTo(0.5);
	    this.container.drawRect(0, game.world.height*16/24 , game.world.width, game.world.height/2);
			var leaderBoard = game.add.text(game.world.centerX-70, 300, "Best Score\t", style);
			var playersScores = game.add.text(game.world.centerX-20, 320, this.bestScoreText, style);
			leaderBoard.alignIn(this.bar,Phaser.BOTTOM_CENTER,0,200);
			playersScores.alignIn(leaderBoard,Phaser.BOTTOM_CENTER,0,250);
	    var grd = score.context.createLinearGradient(0, 0, 0, score.canvas.height);
	    grd.addColorStop(0, '#8ED6FF');
	    grd.addColorStop(1, '#004CB3');
	    gameTitle.fill = grd;

	},
	playTheGame: function(){
		this.score = 0;
		this.game.state.start("theGame");
	}
}
