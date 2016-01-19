

function addBoss(){
	boss = game.add.sprite(500, 330, 'boss');

	game.physics.enable(boss, Phaser.Physics.ARCADE);
	boss.body.gravity.y = 100;
    boss.body.setSize(113, 49, 42, 47);

	boss.speed = 100;
	boss.PointA = 50;
    boss.PointB = 550;
    
    boss.damage = 25;
    boss.isDie = false;

    boss.eyes = game.add.sprite(0, 0, 'bosseyes');
    boss.eyes.position.setTo(boss.x, boss.y);

    boss.animations.add('left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 8, true);
    boss.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    boss.animations.add('die', [18, 19, 20, 21, 22, 23], 8);

    boss.killSound = game.add.audio('creature');
    boss.sound = game.add.audio('boss');

    boss.move = moveBossToTarget;
    boss.update = updateBoss;
    boss.reset = resetBoss;
    boss.die = dieBoss;

    if (Math.random() < 0.5){
        boss.target = boss.PointB;
        boss.move( boss.PointB );
        boss.play('right');
    }
    else{
        boss.target = boss.PointA;
        boss.move( boss.PointA );
        boss.play('left');
    }

//    game.physics.arcade.moveToXY(boss, boss.target, boss.y, boss.speed);
}

function moveBossToTarget(target){
	this.target = target;
    game.physics.arcade.moveToXY(this, this.target, this.y, this.speed);
    this.sound.play();
}


function updateBoss(){
    if(this.isDie)
        return;

	if(	Math.abs(this.x - this.PointA) <= 10 ){
		this.move( this.PointB );
        this.play('right');
	}

    if( Math.abs(this.x - this.PointB) <= 10 ){
        this.move( this.PointA );
        this.play('left');
    }

    this.eyes.position.setTo(this.x, this.y);
    this.eyes.frame = this.frame;
}

function resetBoss(){ 
	this.y = 330;
    this.x = 500;
    this.isDie = false;
    this.eyes.revive();

    if (Math.random() < 0.5){
        this.target = this.PointB;
        this.move( this.PointB );
        this.play('right');
    }
    else{
        this.target = this.PointA;
        this.move( this.PointA );
        this.play('left');
    }
}

function dieBoss(){
    if(!this.isDie){
        this.play('die');
        this.eyes.kill();
        this.killSound.play();
        this.isDie = true;
        this.body.velocity.setTo(0, 0);
    }
}