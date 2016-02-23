var image;

var background;
var player;

var flags = [];

var light;

var wall;
var lateralWalls;
var ground;
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
		var text = game.add.text(400, 200, 'Towers of Doom',
		{ font: "56pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 6,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		image.addChild(text);

		game.global.is_playing = false;

		this.addFlags();
		
		sky = game.add.sprite(0, 0, 'sky');
		sky.kill();

		// GameObjects ever in game
		background = game.add.tileSprite(0, 0, 800, 600, 'background');
		background.kill();
	    //game.stage.backgroundColor = '#aaaaaa';

	    this.addWalls();
	    wall.kill();

	    lateralWalls.kill();
	    
	    ground.kill();

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

	    addScorpions();
	    scorpions.callAll('kill');

	    addBoss();
	    boss.kill();
	    boss.eyes.kill();

	    addStones();
	    stones.callAll('kill');

	    


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

	    


	    this.addMedusa();
	    medusa.kill();
	    medusa_sound = game.add.audio('medusa');

	    gui = new GUI();
	    gui.setAlive(false);	

	    this.addLink();

	    texta = game.add.text(dialog.x + dialog.width / 2, dialog.y + dialog.height / 2, '', 
			{ font: "12pt ferney", fill: '#fff', stroke:  '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: dialog.width, align: "center"});
	    texta.anchor.set(0.5);
	    texta.kill();

	   

	    

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

		ground = game.add.sprite(0, 485, 'ground');
		game.physics.enable(ground, Phaser.Physics.ARCADE);
		ground.body.immovable = true;
		ground.renderable = false;

		lateralWalls = game.add.sprite(0, 0, 'walls');

		wall = game.add.sprite(0, -25, 'door-1');
		game.physics.enable(wall, Phaser.Physics.ARCADE);
		wall.body.immovable = true;

		
	},

	addPlatforms: function(){
		platforms[0] = game.add.sprite(350, 300, 'platform');
		game.physics.enable(platforms[0], Phaser.Physics.ARCADE);
		platforms[0].body.immovable = true;
		platforms[0].body.customSeparateX = true;
		platforms[0].body.setSize(65, 40, 30, 0);
		platforms[0].scale.x = 3;

		platforms[1] = game.add.sprite(50, 200, 'platform');
		game.physics.enable(platforms[1], Phaser.Physics.ARCADE);
		platforms[1].body.immovable = true;
		platforms[1].body.customSeparateX = true;
		platforms[1].body.setSize(65, 40, 30, 0);
		platforms[1].scale.x = 3;
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
			
			//game.state.start('end', false);
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
	    var text = game.add.text(150, 500, 
		'Presiona ENTER para ir al siguiente nivel...', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
		winImage.addChild(text);
	    winImage.visible = false;


	    loseImage = game.add.sprite(0, 0, 'lose');
	    var text = game.add.text(150, 500, 
		'Presiona ENTER para volver a jugar...', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
		loseImage.addChild(text);
	    loseImage.visible = false;


	    endImage = game.add.sprite(0, 0, 'win');
	    var text = game.add.text(400, 400, 
		'Es una lastima que esa bruja te expulsara de las cuevas\n\n\n' +
		'Preciona ENTER para volver a jugar...', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 500, align: 'center'});
		text.anchor.setTo(0.5, 0.5);
		endImage.addChild(text);
	    endImage.visible = false;
	},
}