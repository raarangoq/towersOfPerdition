var image;

var background;
var player;

var walls;
var pillars = [];
var segments = [];

var gui;
var score;


var winImage;
var loseImage;


initMenu = {
	create: function(){
		image = game.add.sprite(0, 0, 'initmenu');
		game.global.is_playing = false;

		// GameObjects ever in game
		background = game.add.tileSprite(0, 0, 800, 600, 'background');
		background.kill();
	    //game.stage.backgroundColor = '#aaaaaa';

	    addPillars();
	    pillars.setAlive(false);

	    addSegments();
	    segments.setAlive(false);

	    addPlayer();
	    player.kill();

	    this.addWalls();
	    walls.callAll('kill');

	    winImage = game.add.sprite(0, 0, 'win');
	    winImage.visible = false;
	    loseImage = game.add.sprite(0, 0, 'lose');
	    loseImage.visible = false;
	    endImage = game.add.sprite(0, 0, 'end');
	    endImage.visible = false;

	    gui = new GUI();
	    gui.setAlive(false);	
	},

	addWalls: function(){
		walls = game.add.group();
		walls.enableBody = true;

		var wall = walls.create(0, 450, 'ground');
		wall.body.immovable = true;
//		wall.body.setSize(800, 30, 0, 50);

		wall = walls.create(0, -50, 'lateralwall');
		wall.body.immovable = true;

		wall = walls.create(750, -50, 'lateralwall');
		wall.body.immovable = true;
	},

	update: function(){
		if(keyboard.enterKey()){
//			game.global.is_playing = true;
			game.state.start('levels', false);
		}


	}
}