
var stone;

function addStones(){
	stones = game.add.group();
    stones.enableBody = true;
    stones.physicsBodyType = Phaser.Physics.ARCADE;
    stones.createMultiple(30, 'stone');
    stones.setAll('anchor.x', 0.5);
    stones.setAll('anchor.y', 0.5);
    stones.setAll('outOfBoundsKill', true);
    stones.setAll('checkWorldBounds', true);
    stones.setAll('body.immovable', true);

    stones.timeOfLastStone = game.time.now;
    stones.timeBetweenStones = 3000;

    stones.damage = 50;
    stones.speed = 300;

    stones.sound = game.add.audio("stone", 0.2);


    stones.dropStone = dropStone;
    stones.update = updateStone;
}

function dropStone(){
	stone = this.getFirstExists(false);
    if (stone)
    {
        this.sound.play();

        stone.reset(100 + (Math.random() * 600), 0);

        stone.body.velocity.y = this.speed;
        stone.body.angularVelocity = Math.random() * 90;
        stone.scale.x = 0.5 + (Math.random());
        stone.scale.y = 0.5 + (Math.random()); 

        this.timeOfLastStone = game.time.now + this.timeBetweenStones;
    }
}

function updateStone(){
	if( game.physics.arcade.isPaused || flags['winState'] || !game.global.is_playing)
		return;
	
	if( game.time.now - this.timeOfLastStone > 
		this.timeBetweenStones - (game.global.level * 100)){
			this.timeOfLastStone = game.time.now;
			this.dropStone();
	}
}
