var scorpion;

/*********************************************
            Group of scorpions
********************************************/

function addScorpions(){
	scorpions = game.add.group();
    scorpions.enableBody = true;
    scorpions.physicsBodyType = Phaser.Physics.ARCADE;
    scorpions.createMultiple(10, 'scorpion');
    scorpions.setAll('anchor.x', 0.5);
    scorpions.setAll('anchor.y', 0.5);
//    scorpions.setAll('outOfBoundsKill', true);
//    scorpions.setAll('checkWorldBounds', true);
//    scorpions.setAll('body.immovable', true);
    scorpions.setAll('body.gravity.y', 200);
    scorpions.setAll('marchSetted', false);

    scorpions.timeOfLastScorpion = game.time.now + 2000;
    scorpions.timeBetweenScorpions = 10000;

    scorpions.forEach(this.setScorpion, this);
    scorpions.damage = 10;
    scorpions.speed = 100;

    scorpions.inGame = false;

    scorpions.killSound = game.add.audio('rugido');
    scorpions.newSound = game.add.audio('scorpion');

    scorpions.attack = scorpionsGroupAttack;
    scorpions.update = updateScorpionsGroup;
    scorpions.updateScorpion = updateScorpion;
    scorpions.setScorpion = setScorpion;
    scorpions.reset = resetScorpions;
}

function resetScorpions(){
    this.timeOfLastScorpion = game.time.now + 2000;
    this.callAll('kill');
    this.setAll('marchSetted', false);

    this.timeBetweenScorpions = 10000 - (game.global.level * 1400);

}


function scorpionsGroupAttack(){
	scorpion = this.getFirstExists(false);
    if (scorpion)
    {
        scorpion.resetScorpion();
//       this.setScorpion(scorpion);
//        this.sound.play();
        this.timeOfLastScorpion = game.time.now/* + this.timeBetweenScorpions*/;
        this.newSound.play();
    }
}

function updateScorpionsGroup(){
	if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
		return;
	
	if( game.time.now - this.timeOfLastScorpion > this.timeBetweenScorpions){
			this.timeOfLastScorpion = game.time.now;
			this.attack();
	}

	this.forEachAlive(this.updateScorpion, this);
}

/*****************************************************
            Every single scorpions in the group
*****************************************************/

function setScorpion(scorpion){
    scorpion.PointA = 0;
    scorpion.PointB = 800;

    scorpion.animations.add('left', [0, 1, 2], 8, true);
    scorpion.animations.add('right', [3, 4, 5], 8, true);

    scorpion.eyes = game.add.sprite(0, 0, 'scorpioneyes');
    scorpion.eyes.anchor.setTo(0.5, 0.5);
    scorpion.eyes.position.setTo(scorpion.x, scorpion.y);

    scorpion.scale.setTo(2, 2);
    scorpion.eyes.scale.setTo(2, 2);

    scorpion.move = moveScorpionToTarget;
    scorpion.setMarch = setScorpionMarch;
    scorpion.resetScorpion = resetScorpion;
    scorpion.takeDamage = scorpionTakeDamage;
}

function resetScorpion(){
    scorpion.reset(100 + (Math.random() * 500), 0);

    scorpion.eyes.revive();
    scorpion.marchSetted = false;
}

function updateScorpion(scorpion){
	if(	Math.abs(scorpion.x - scorpion.PointA) <= 10 ){
		scorpion.move( scorpion.PointB );
        scorpion.play('right');
	}

    if( Math.abs(scorpion.x - scorpion.PointB) <= 10 ){
        scorpion.move( scorpion.PointA );
        scorpion.play('left');
    }

    scorpion.eyes.position.setTo(scorpion.x, scorpion.y);
    scorpion.eyes.frame = scorpion.frame;
}

function setScorpionMarch(a, b){
    if(!this.marchSetted){
        if(Math.random() < 0.15){
            this.PointA = a;
            this.PointB = b;
        }
        else{
            this.PointA = 100;
            this.PointB = 700;
        }   
        this.speed = 100 + (scorpions.speed * Math.random());
        this.marchSetted = true;
        this.move(this.PointB);
        scorpion.play('right');
    }
}

function moveScorpionToTarget(target){
    this.target = target;
    game.physics.arcade.moveToXY(this, this.target, this.y, scorpions.speed);
}

function scorpionTakeDamage(){
    this.eyes.kill();
    this.kill();
}