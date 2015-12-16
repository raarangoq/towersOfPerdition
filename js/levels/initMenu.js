var image;

var background;
var player;

var flags = [];

var light;

var walls;
var platforms = [];
var door;
var pillars = [];
var segments = [];
var stones;
var scorpions;
var boss;


var explosions;

var gui;
var score;

var sky;

var winImage;
var loseImage;
var endImage;

var medusa;
var medusa_sound;
var linkfail;

var texta;

initMenu = {
	create: function(){

		image = game.add.sprite(0, 0, 'initmenu');
		game.global.is_playing = false;

		this.addFlags();
		
		sky = game.add.sprite(0, 0, 'sky');
		sky.kill();

		// GameObjects ever in game
		background = game.add.tileSprite(0, 0, 800, 600, 'background');
		background.kill();
	    //game.stage.backgroundColor = '#aaaaaa';

	    this.addWalls();
	    walls.callAll('kill');
	    this.addPlatforms(),
	    platforms[0].kill();
	    platforms[1].kill();

	    light = addLight();
	    light.kill();

	    addPillars();
	    pillars.setAlive(false);

	    addSegments();
	    segments.setAlive(false);


	    addPlayer();
	    player.kill();

	    door = addDoor();
	    door.setAlive(false);

	    addStones();
	    stones.callAll('kill');

	    addScorpions();
	    scorpions.callAll('kill');

	    addBoss();
	    boss.kill();


	    //  An explosion pool
	    explosions = game.add.group();
	    explosions.createMultiple(15, 'kaboom');
	    explosions.forEach(this.setupExplosion, this);

//text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});


//game.global.level = 5;

//    this.addAliens();
   
	    sound_backgroud = game.add.audio('levelB', 0.5, true);
	    boom_sound = game.add.audio('boom', 0.5);

	    dialog = game.add.sprite(230, 300, 'dialog');
	    dialog.kill();

	    texta = game.add.text(dialog.x + dialog.width / 2, dialog.y + dialog.height / 2, '', 
			{ font: "12pt ferney", fill: '#fff', stroke:  '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: dialog.width, align: "center"});
	    texta.anchor.set(0.5);
	    texta.kill();


	    this.addMedusa();
	    medusa.kill();
	    medusa_sound = game.add.audio('medusa');

	    this.addLink();


	   

	    gui = new GUI();
	    gui.setAlive(false);	

	},

	addFlags: function(){
		flags['winAnimationPointA'] = false;
		flags['winAnimationPointB'] = false;
		flags['winState'] = false;
		flags['timeOut'] = false;
        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
        flags['playedF'] = false;

	},

	addWalls: function(){
		walls = game.add.group();
		walls.enableBody = true;

		var wall = walls.create(0, 450, 'ground');
		wall.body.immovable = true;
//		wall.body.setSize(800, 30, 0, 50);

		wall = walls.create(0, -130, 'door-1');
		wall.body.immovable = true;

		
	},

	addPlatforms: function(){
		platforms[0] = game.add.sprite(350, 300, 'platform');
		platforms[0].scale.x = 3;
		game.physics.enable(platforms[0], Phaser.Physics.ARCADE);
		platforms[0].body.immovable = true;
		platforms[0].body.customSeparateX = true;

		platforms[1] = game.add.sprite(50, 200, 'platform');
		platforms[1].scale.x = 3;
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
			image.destroy();
			
			//game.state.start('levels', false);
			game.state.start('introVideo', false);
		}
	},

	addMedusa: function(){
		medusa = game.add.sprite(100, 350, 'medusa');
		game.physics.enable(medusa, Phaser.Physics.ARCADE);
		medusa.animations.add('normal', [0, 1, 2, 3, 4, 5], 6, true);
		medusa.animations.add('attack', [6, 7, 8, 9], 6, false);
		medusa.scale.setTo(2, 2);
	},

	addLink: function(){
		link = game.add.sprite(1000, 600, 'link');
		link.scale.setTo(1.5, 1.5);
		link.animations.add('go', [0, 1, 2, 3], 10, true);
		link.kill();

		linkfail = game.add.sprite(550, 350, 'linkfail');
		linkfail.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		game.physics.enable(linkfail, Phaser.Physics.ARCADE);
		linkfail.scale.setTo(0.2, 0.2);
		linkfail.hit_sound = game.add.audio('hit');
		linkfail.scream_sound = game.add.audio('scream', true);
		linkfail.kill();

	    winImage = game.add.sprite(0, 0, 'win');
	    winImage.visible = false;
	    loseImage = game.add.sprite(0, 0, 'lose');
	    loseImage.visible = false;
	    endImage = game.add.sprite(0, 0, 'end');
	    endImage.visible = false;
	},
}