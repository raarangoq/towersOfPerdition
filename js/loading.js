
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

text = game.add.text(20, 540, 'Cargando...', { fontSize: '28px', fill: '#ffffff'});

    game.load.image('torpedo', 'assets/pics/items/bombArrowItem.png');
    game.load.image('velocity', 'assets/pics/items/speedItem.png');

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    

    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);

    game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);
    game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
    
    game.load.image('background', 'assets/pics/background.png');
    game.load.image('ground', 'assets/pics/levels/ground.png');
    game.load.image('lateralwall', 'assets/pics/levels/lateralwall.png');
    game.load.image('platform', 'assets/pics/levels/platform.png');
    game.load.image('pillar', 'assets/pics/levels/pillar.png');
    game.load.image('segment', 'assets/pics/levels/segment.png');

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('win', 'assets/pics/images/win.png');
    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);

    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');


	game.load.audio('inicio', 'assets/sounds/inicio.mp3');
    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');
    game.load.audio('new_spider', 'assets/sounds/nace_araña.mp3');
    game.load.audio('arrow', 'assets/sounds/flecha.mp3');
    game.load.audio('torpedo', 'assets/sounds/torpedo.mp3');
    game.load.audio('creature', 'assets/sounds/creature.mp3');
    game.load.audio('hit', 'assets/sounds/golpes.mp3');
    game.load.audio('swordair', 'assets/sounds/espada-aire.mp3');
    game.load.audio('scream', 'assets/sounds/grito.mp3');
    game.load.audio('boom', 'assets/sounds/explosion.mp3');

	},

	
	create: function(){
		addKeyboard();

		game.state.start('initMenu');
		//game.state.start('end');
	}
}
