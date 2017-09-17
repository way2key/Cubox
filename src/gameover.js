var gameOver = function(game){}
var yourScoreStlye = { font: "80px Arial", fill: "#0066FF", align: "center" };
var leaderboardStyle = { font: "40px Arial", fill: "#CCFFFF" };
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
	    this.bar.drawRect(0, game.world.height*0/24, game.world.width, 100);

	    // Score
			var score = this.game.add.text(0, 0, "Your score: "+this.score, yourScoreStlye);
			score.alignIn(this.bar,Phaser.CENTER,0,0);
			var style = { font: "20px Courier", fill: "#fff", tabs: 132 };
			score.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

			// LeaderBoard
			var leaderBoard = game.add.text(game.world.centerX, game.world.height*2/24, "Best Scores:\t", leaderboardStyle);
			leaderBoard.alignIn(this.bar,Phaser.CENTER, 0, game.world.height*4/24);
			var playersScores = game.add.text(game.world.centerX, game.world.height*8/24, this.bestScoreText, style);


			// Play background
			this.container = game.add.graphics();
	    this.container.beginFill(0x77B5FE,0.9);
			this.container.anchor.setTo(0.5);
	    this.container.drawRect(0, game.world.height*16/24 , game.world.width, game.world.height/2);
	    var grd = score.context.createLinearGradient(0, 0, 0, score.canvas.height);
	    grd.addColorStop(0, '#8ED6FF');
	    grd.addColorStop(1, '#004CB3');
	    gameTitle.fill = grd;

			// PlayButton
			var playButton = this.game.add.button(game.world.centerX,game.world.height*20/24,"play",this.playTheGame,this);
			playButton.anchor.setTo(0.5);



	},
	playTheGame: function(){
		this.score = 0;
		this.game.state.start("theGame");
	},
	update: function(game){
		// KeyboardControl
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		if(this.spaceKey.isDown||this.enterKey.isDown){
			this.playTheGame();
		}
	}
}
