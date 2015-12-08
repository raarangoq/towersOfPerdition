var image;

var background;
var player;

var flags = [];

var walls;
var platforms = [];
var door;
var pillars = [];
var segments = [];
var stones;
var bats;

var explosions;

var gui;
var score;


var winImage;
var loseImage;
var endImage;


initMenu = {
	create: function(){

		image = game.add.sprite(0, 0, 'initmenu');
		game.global.is_playing = false;

		this.addFlags();
		

		// GameObjects ever in game
		background = game.add.tileSprite(0, 0, 800, 600, 'background');
		background.kill();
	    //game.stage.backgroundColor = '#aaaaaa';

	   

	    

	    this.addWalls();
	    walls.callAll('kill');
	    this.addPlatforms(),
	    platforms[0].kill();
	    platforms[1].kill();

	    addPillars();
	    pillars.setAlive(false);

	    addSegments();
	    segments.setAlive(false);


	    addPlayer();
	    player.kill();

	    door = game.add.sprite(750, 380, 'door');
	    door.scale.setTo(0.5, 2);
	    door.visible = false;
	    door.sound = game.add.audio('door');

	    addStones();
	    stones.callAll('kill');

	    addBats();
	    bats.callAll('kill');

	    //  An explosion pool
	    explosions = game.add.group();
	    explosions.createMultiple(15, 'kaboom');
	    explosions.forEach(this.setupExplosion, this);

text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//texta = game.add.text(20, 400, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});


//game.global.level = 5;

//    this.addAliens();
   
	    sound_backgroud = game.add.audio('levelB', 0.5, true);
	    boom_sound = game.add.audio('boom', 0.5);

	    link = game.add.sprite(0, 0, 'linkfail');
	    game.physics.enable(link, Phaser.Physics.ARCADE);
	    link.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
	    link.kill();
	    scream_sound = game.add.audio('scream');

	    

	    winImage = game.add.sprite(0, 0, 'win');
	    winImage.visible = false;
	    loseImage = game.add.sprite(0, 0, 'lose');
	    loseImage.visible = false;
	    endImage = game.add.sprite(0, 0, 'end');
	    endImage.visible = false;

	    gui = new GUI();
	    gui.setAlive(false);	
	},

	addFlags: function(){
		flags['winAnimationPointA'] = false;
		flags['winState'] = false;
        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;

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

	addPlatforms: function(){
		platforms[0] = game.add.sprite(350, 300, 'platform');
		game.physics.enable(platforms[0], Phaser.Physics.ARCADE);
		platforms[0].body.immovable = true;
		platforms[0].body.customSeparateX = true;

		platforms[1] = game.add.sprite(50, 200, 'platform');
		game.physics.enable(platforms[1], Phaser.Physics.ARCADE);
		platforms[1].body.immovable = true;
		platforms[1].body.customSeparateX = true;
	},

	// Establecer la explosión
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 10);
    },

	update: function(){
		if(keyboard.enterKey()){
//			game.global.is_playing = true;
			game.state.start('levels', false);
		}


	}
}