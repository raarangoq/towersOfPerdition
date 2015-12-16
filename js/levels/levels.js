
var timeOfWinState;

var items;

var textb;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
endImage.visible = false; 

    background.revive();

    player.revive();
    player.restart();

    gui.setAlive(true);

    light.revive();
    light.restart();

    walls.callAll('revive');

    stones.reset();
    scorpions.reset();

    this.setPlatforms();

    door.setAlive(true);
    door.reset();

//    items = addItem('light');
    

    pillars.setAlive(true);
    pillars.restart();
    segments.setAlive(true);

    timeOfWinState = game.time.now;

    if(game.global.level == 5){
        pillars[2].push(segments[4]);
        boss.revive();
        boss.reset(); 
    }
    if(game.global.level >= 3){
        pillars[2].push(segments[3]);
    }
    pillars[2].push(segments[2]);
    pillars[2].push(segments[1]);
    pillars[1].push(segments[0]);



    sound_backgroud.play();
dialog.kill();

game.time.advancedTiming = true;


    

    game.global.is_playing = true;
    gui.pauseGame();
    },

    setPlatforms: function(){
        if(game.global.level == 1){
            platforms[0].kill();
            platforms[0].position.setTo(350, 300);
            platforms[1].kill();
            platforms[1].position.setTo(50, 200);

            pillars[1].y = 430;
            pillars[2].y = 430;
        }
        if(game.global.level == 2){
            platforms[0].revive();
            platforms[0].position.setTo(450, 400);

            pillars[2].y = 380;
        }
        else if( game.global.level == 3 ){
            platforms[0].revive();
            platforms[0].position.setTo(450, 400);
            platforms[1].revive();
            platforms[1].position.setTo(140, 300);

            pillars[1].y = 280;
            pillars[2].y = 380;
        }
        else if( game.global.level == 4 ){
            platforms[0].revive();
            platforms[0].position.setTo(450, 350);
            platforms[1].revive();
            platforms[1].position.setTo(140, 250);

            pillars[1].y = 230;
            pillars[2].y = 330;
        }
        else if( game.global.level == 5 ){
            platforms[0].revive();
            platforms[0].position.setTo(450, 150);
            platforms[1].revive();
            platforms[1].position.setTo(140, 250);

            pillars[1].y = 230;
            pillars[2].y = 130;
        }
    },

    update: function() {
        gui.update();


        this.playerTouchWalls();
            

        if (!flags['winState']){
            if (player.alive){
                
                game.physics.arcade.overlap(player, stones, this.playerHitStone, null, this);
                game.physics.arcade.overlap(player, scorpions, this.playerHitScorpion, null, this);
                game.physics.arcade.collide(player, door);
                game.physics.arcade.collide(walls, scorpions, this.scorpionTouchWall, null, this);

                game.physics.arcade.collide(scorpions, platforms[0], this.scorpionTouchPlatform, null, this);
                game.physics.arcade.collide(scorpions, platforms[1], this.scorpionTouchPlatform, null, this);

                game.physics.arcade.overlap(player, items, this.setAbility, null, this);

                if(game.global.level == 5){
                    game.physics.arcade.overlap(player, boss, this.bossHitPlayer, null, this);
                }

                if(player.is_attacking)
                    game.physics.arcade.overlap(player.attack, scorpions, this.attackHitScorpion, null, this);
                if( keyboard.enterKey() )
                    gui.pauseGame();
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

        game.physics.arcade.collide(walls, boss);

        if(flags['winState'] || flags['timeOut']){
            game.physics.arcade.collide(stones, walls);
            game.physics.arcade.collide(stones, stones);

            if(game.global.level == 5){
                game.physics.arcade.overlap(boss, stones, this.killBoss, null, this);
                    
                
            }
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

    playerHitScorpion: function(player, scorpion){
        if(game.time.now - player.timeOfLastScorpionAttack > player.timeBetweenScorpionsAttacks){
            player.hitPlayer(scorpion);
            player.timeOfLastScorpionAttack = game.time.now;
        }
    },

    attackHitScorpion: function(attack, scorpion){
        scorpion.kill();
        gui.upScore(10);

        var prob = Math.random();
        if(items == null){
            if(prob < 0.2)
                items = addItem('shield');
            else if( prob < 0.4)
                items = addItem('velocity');
            else if(prob < 0.6)
                items = addItem('light');
        }

        scorpions.killSound.play();
    },

    killBoss: function(boss, stone){
        boss.killSound.play();
        boss.kill();
        this.addExplosion(boss.x, boss.y);
        this.addExplosion(boss.x + 80, boss.y);
        this.addExplosion(boss.x + 40, boss.y + 40);
    },

    playerHitStone: function(player, stone){
        player.hitPlayer(stone);
        stone.kill();
    },

    bossHitPlayer: function(player, boss){
        player.hitPlayer(boss);
    },

    scorpionTouchWall: function(wall, scorpion){
        scorpion.setMarch(100, 700);
    },

    scorpionTouchPlatform: function(platform, scorpion){
        scorpion.setMarch(platform.body.x, platform.body.x + platform.body.width - 20);
    },

    addAliens: function(){
        if(game.time.now - player.timeOfLastScorpionAttack > player.timeBetweenScorpionsAttacks){
            player.hitPlayer(scorpion);
            player.timeOfLastScorpionAttack = game.time.now;
        }
    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();
    },

   
    playWinAnimation: function(){
        if (game.global.level <= 5){          
            if(game.time.now - timeOfWinState < 2000){ //wait
                player.body.velocity.x = 0;
                player.animations.stop();
            }
            else if(game.time.now - timeOfWinState < 6000){
                if(!flags['winAnimationPointA']){
                    game.physics.arcade.moveToXY(player, 800, 300, 200);
                    player.playAnimations("right");
                        player.body.collideWorldBounds = false;
                    flags['winAnimationPointA'] = true;
                }
            }
            else if(game.time.now - timeOfWinState < 8000){
                if(!flags['winAnimationPointB']){
                    stones.startAvalanche();
                    flags['winAnimationPointB'] = true;
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

    setAbility: function(player, item){
        items.takeItem();
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
        }
        else{
            game.global.lives = 3;
            gui.restartScore();
            game.global.health = 100;
        }

        segments.setAlive(false);
        door.setAlive(false);
        boss.kill();

        if(items)
            items.destroy();
        items = null;

        stones.reset();
        
        winImage.visible = false;
        endImage.visible = false;
        loseImage.visible = false;

        game.global.is_playing = false;

        this.restartFlags();

        if(game.global.level <= 5)
            game.state.start('levels', false);
        else {
            player.kill();
            player.eyes.kill();
            pillars.setAlive(false);
            segments.setAlive(false);
            platforms[0].kill();
            platforms[1].kill();
            light.kill();
            game.state.start('end', false);
        }

    },

    restartFlags: function(){
        flags['winAnimationPointA'] = false;
        flags['winAnimationPointB'] = false;
        flags['winState'] = false;
        flags['timeOut'] = false;
        flags['inDark'] = false;

        flags['playedA'] = false;
        flags['playedB'] = false;
        flags['playedC'] = false;
        flags['playedD'] = false;
        flags['playedE'] = false;
        flags['playedF'] = false;
    },




}
