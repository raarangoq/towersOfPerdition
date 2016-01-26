
// Variables para controlar la entrada por teclado
var keyboard;

var text;


loading = {
	preload: function(){


    game.load.image('light', 'assets/pics/items/bombArrowItem.png');
    game.load.image('velocity', 'assets/pics/items/speedItem.png');
    game.load.image('shield', 'assets/pics/items/shield.png');

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    

    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');
    game.load.image('stone1', 'assets/pics/enemys/stone1.png');
    game.load.image('stone2', 'assets/pics/enemys/stone2.png');
    game.load.image('stone3', 'assets/pics/enemys/stone3.png');
    game.load.image('stone4', 'assets/pics/enemys/stone4.png');
    game.load.image('stone5', 'assets/pics/enemys/stone5.png');

    game.load.image('avalanche', 'assets/pics/enemys/avalanche.png');
    game.load.spritesheet('scorpion', 'assets/pics/enemys/scorpion.png', 38, 36);
    game.load.spritesheet('scorpioneyes', 'assets/pics/enemys/scorpioneyes.png', 38, 36);
    game.load.spritesheet('boss', 'assets/pics/enemys/boss.png', 183, 144);
    game.load.spritesheet('bosseyes', 'assets/pics/enemys/bosseyes.png', 183, 144);

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);

    game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);
    game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
    game.load.image('spiral','assets/pics/espiral.png');
  
    game.load.image('background', 'assets/pics/background.png');
    game.load.image('ground', 'assets/pics/levels/ground.png');
    game.load.image('door', 'assets/pics/levels/door.png');
    game.load.image('door-1', 'assets/pics/levels/door-1.png');
    game.load.image('door-2', 'assets/pics/levels/door-2.png');
    game.load.image('platform', 'assets/pics/levels/platform.png');
    game.load.image('pillar', 'assets/pics/levels/pillar.png');
//    game.load.image('segment', 'assets/pics/levels/segment.png');
    game.load.image('segment-1', 'assets/pics/levels/segment-1.png');
    game.load.image('segment-2', 'assets/pics/levels/segment-2.png');
    game.load.image('segment-3', 'assets/pics/levels/segment-3.png');
    game.load.image('segment-4', 'assets/pics/levels/segment-4.png');
    game.load.image('segment-5', 'assets/pics/levels/segment-5.png');

    game.load.spritesheet('fire', 'assets/pics/levels/fire.png', 32, 32);
    game.load.spritesheet('lamp', 'assets/pics/levels/lamp.png');

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('blankpause', 'assets/pics/images/blankpause.png');
    game.load.image('input', 'assets/pics/images/input.png');
    game.load.image('win', 'assets/pics/images/win.png');
    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);

    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');


    game.load.image(        'sky',        'assets/pics/videos/sky.png');
    game.load.spritesheet(  'link',       'assets/pics/videos/link.png', 148, 150);
    game.load.spritesheet(  'linkfail',   'assets/pics/videos/linkfail.png', 145, 175);
    game.load.image(        'cloud',      'assets/pics/videos/cloud.png');
    game.load.image(        'dialog',     'assets/pics/videos/dialog.png');

    game.load.spritesheet('medusa', 'assets/pics/videos/medusa.png', 128, 128);

/***********************************************************/
//              Sounds

	game.load.audio('inicio', 'assets/sounds/inicio.mp3');
    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('scorpion', 'assets/sounds/nuevo_escorpion.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');
    game.load.audio('boss', 'assets/sounds/boss.mp3');
    game.load.audio('creature', 'assets/sounds/creature.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('bat', 'assets/sounds/bat.mp3');
    game.load.audio('arrow', 'assets/sounds/flecha.mp3');

    game.load.audio('torpedo', 'assets/sounds/torpedo.mp3');
    game.load.audio('hit', 'assets/sounds/golpes.mp3');
    game.load.audio('swordair', 'assets/sounds/espada-aire.mp3');
    game.load.audio('scream', 'assets/sounds/grito.mp3');
    game.load.audio('boom', 'assets/sounds/explosion.mp3');
    game.load.audio('stone', 'assets/sounds/stone.mp3');
    game.load.audio('door', 'assets/sounds/door.mp3');

    game.load.audio('medusa', 'assets/sounds/medusa-grito.mp3');

	},

	
	create: function(){
        addKeyboard();
    },

    update: function(){
        if(game.load.onLoadComplete){
            loadingImage.destroy();
            game.state.start('initMenu');
        }
    },
}
