
var timeOfWinState;


var text;
var textb;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    

    background.revive();

    player.revive();
    player.restart();

    gui.setAlive(true);
//    gui.upScore(20);

    walls.callAll('revive');

    stones.callAll('kill');

    this.setPlatforms();

    door.x = 750;
    door.scale.setTo(0.5, 2);
    door.visible = true;
    

    pillars.setAlive(true);
    segments.setAlive(true);

    timeOfWinState = game.time.now;

    pillars.restart();
    pillars[0].push(segments[2]);
    pillars[0].push(segments[1]);
    pillars[0].push(segments[0]);

    sound_backgroud.play();

    if(game.global.level == 5){
    //    link.revive();
    }

game.time.advancedTiming = true;


    gui.pauseGame();

    game.global.is_playing = true;
    },

    setPlatforms: function(){
        if(game.global.level == 1){
            platforms[0].kill();
            platforms[0].position.setTo(350, 300);
            platforms[1].kill();
            platforms[1].position.setTo(50, 200);

            pillars[1].y = 300;
            pillars[2].y = 300;
        }
        if(game.global.level == 2){
            platforms[0].revive();
            platforms[0].position.setTo(450, 400);

            pillars[2].y = 250;
        }
        else if( game.global.level == 3 ){
            platforms[0].revive();
            platforms[0].position.setTo(450, 400);
            platforms[1].revive();
            platforms[1].position.setTo(140, 300);

            pillars[1].y = 150;
            pillars[2].y = 250;
        }
        else if( game.global.level == 4 ){
            platforms[0].revive();
            platforms[0].position.setTo(450, 350);
            platforms[1].revive();
            platforms[1].position.setTo(140, 250);

            pillars[1].y = 100;
            pillars[2].y = 200;
        }
        else if( game.global.level == 5 ){
            platforms[0].revive();
            platforms[0].position.setTo(450, 150);
            platforms[1].revive();
            platforms[1].position.setTo(140, 250);

            pillars[1].y = 100;
            pillars[2].y = 0;
        }
    },

    update: function() {
        gui.update();


        this.playerTouchWalls();
            

        if (!flags['winState']){
            if (player.alive){
                if( keyboard.enterKey() )
                    gui.pauseGame();
                game.physics.arcade.overlap(player, stones, this.playerHitStone, null, this);
                game.physics.arcade.overlap(player, bats, this.playerHitBat, null, this);
                if(player.is_attacking)
                    game.physics.arcade.overlap(player.attack, bats, this.attackHitBat, null, this);
            }
            else{
                if( keyboard.enterKey() )
                    this.restart();
            }
        }
        else{
            this.playWinAnimation();

            if( keyboard.enterKey() )
                this.restart();
        }

        


   
    },

    playerTouchWalls: function(){
        game.physics.arcade.collide(player, walls);
        // Esta condición para poder subir en una plataforma y bajar de esta atravesandola
        if(player.body.velocity.y >= 0 && game.time.now - player.timeToDownPlatform > 500){
            game.physics.arcade.collide(player, platforms[0]);
            game.physics.arcade.collide(player, platforms[1]);
        }


    },

    playerHitBat: function(player, bat){
        if(!bat.touchPlayer){
            player.hitPlayer(bat);
            bat.touchPlayer = true;
        }
    },

    attackHitBat: function(attack, bat){
        bat.kill();
        bats.sound.play();
        gui.upScore(10);
    },

    playerHitStone: function(player, stone){
        player.hitPlayer(stone);
        stone.kill();
    },

    addAliens: function(){
        
    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();
    },

   
    playWinAnimation: function(){
        if (game.global.level < 5){          
            if(game.time.now - timeOfWinState < 2000){ //wait
                player.body.velocity.x = 0;
                player.animations.stop();
            }
            else if(game.time.now - timeOfWinState < 5000){
                if(!flags['winAnimationPointA']){
                    game.physics.arcade.moveToXY(player, 800, 300, 200);
                    player.playAnimations("right");
                    player.body.collideWorldBounds = false;
                    flags['winAnimationPointA'] = true;
                }
            }
            else{
                winImage.visible = true;              
            }
        }
        else{
//         
        }
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

text.text = flags['winState'];

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
        
        winImage.visible = false;
        endImage.visible = false;
        loseImage.visible = false;

        game.global.is_playing = false;

        this.restartFlags();
        game.state.start('levels', false);

    },

    restartFlags: function(){
        flags['winAnimationPointA'] = false;
        flags['winState'] = false;
        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
    },




}
