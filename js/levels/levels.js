
var winState = false;


var text;
var textb;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    

    background.revive();

    player.revive();

    gui.setAlive(true);
    gui.upScore(20);

    walls.callAll('revive');
    pillars.setAlive(true);
    segments.setAlive(true);

    pillars[0].push(segments[2]);
    pillars[0].push(segments[1]);
    pillars[0].push(segments[0]);

    pillars[1].push(pillars[0].pop());
text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//texta = game.add.text(20, 400, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});


//game.global.level = 7;

//    this.addAliens();
    
    //  An explosion pool
/*    explosions = game.add.group();
    explosions.createMultiple(15, 'kaboom');
    explosions.forEach(this.setupExplosion, this);


    sound_backgroud = game.add.audio('levelB', 0.5, true);
    sound_backgroud.play();
    boom_sound = game.add.audio('boom', 0.5);

    if (game.global.level == 5){
        link = game.add.sprite(0, 0, 'linkfail');
        game.physics.enable(link, Phaser.Physics.ARCADE);
        link.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        link.visible = false;
        scream_sound = game.add.audio('scream');
    }
*/

    winState = false;

game.time.advancedTiming = true;


    gui.pauseGame();
    },



    update: function() {
        if (game.physics.arcade.collide(player, walls))
            player.inGround = true;
        else
            player.inGround = false;

        gui.update();

        if( keyboard.enterKey() ){
            gui.pauseGame();
    }
        
    },

    addAliens: function(){
        
    },

   
    playWinAnimation: function(){
        
    },

    // Establecer la explosión
    setupExplosion: function(explosion) {
        
    },

    setAbility: function(item, player){
    },

    enemyHitsPlayer: function(player, bullet) {
        

        
    },

    

    render: function() {

textb.text = game.time.fps;
//texta.text = player.speed;

    },

    restart: function() {
//        sound_backgroud.stop();

        if (player.alive){
            game.global.level++;
            if (game.global.level == 6){
                game.global.level = 1;
                game.global.lives = 3;
            }
        }
        else{
            game.global.lives = 3;
            score = 0;
            game.global.health = 100;
        }
        winState = false;
        game.state.start('levels', false);

    },



}
