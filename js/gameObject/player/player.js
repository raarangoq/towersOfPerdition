
function addPlayer(){

	// El objeto player en si mismo es un objeto sprite
	player = game.add.sprite(400, 200, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.collideWorldBounds = true;
	player.scale.setTo(1.3, 1.3);
	player.body.setSize(30, 34, 19 + 9, 17 + 5);   // Reajustar el collider del jugador, para que solo cubra el cuerpo
	player.body.gravity.y = 200;

	player.inGround = false;
	player.start_time_pillar_action = game.time.now;

	player.takeSegment = null;

	// Atributos constantes
	player.SPEED_WALKING = 150;
	player.SPEED_ATTACKING = 50;
	player.MAX_HEALTH = 100;

	// Atributos variables
	player.attack = player.addChild(addAttack());
	player.spiral = player.addChild(addSpiral());

	player.shield = player.addChild(game.add.sprite(17, 10, 'shield'));
	player.shield.visible = false;

	player.eyes = game.add.sprite( this.x+17, this.y+10, 'shield');
	player.eyes.visible = false;

	player.haveTorpedo = false;
	player.timeWithVelocity = 5000;
    player.timeVelocityActivated = game.time.time - 5000;

    player.timeOfLastScorpionAttack = game.time.now;
    player.timeBetweenScorpionsAttacks = 2000;

	player.canMove = true;
	player.direction = "";
	player.is_attacking = false;
	player.speed = 200;
	player.highSpeed = 300;
	player.flySpeed = 20;
	player.timeOfTouchWall = game.time.now;
	player.timeToDownPlatform = game.time.now;
	player.health = game.global.health;
	player.hitDamage = 10;
	player.timeBetweenAttacks = 500;

	player.start_time_attack = game.time.time;
	player.start_time_hit = game.time.time - 5000;
	
	player.sound_hit = game.add.audio('hit', 0.2);
	player.sound_sword_fail = game.add.audio('swordair', 0.5);

	// Los metodos del jugador
	player.attacking = attacking;
	player.hitPlayer = hitPlayer;
	player.movePlayer = movePlayer;
	player.setVelocity = setPlayerVelocity;
	player.playAnimations = playAnimations;
	player.toAttack = toAttack;
	player.update = updatePlayer;

	player.activateAbility = activateAbility;
	player.activateVelocity = activateVelocity;
	player.activateShield = activateShield;
	player.activateLight = activateLight;

	player.takeDamage = playerTakeDamage;
	player.checkHealth = checkHealth;
	player.playerDies = playerDies;
	player.setDrawOrder = playerSetDrawOrder;

	player.setWinState = setWinState;

	player.overlapPillar = playerOverlapPillar;
	player.restart = restartPlayer;

	// Se agregan las animaciones del jugador al instanciar uno
	addPlayerAnimations();
}

// Cada una de las animaciones del jugador, no se agrega al objeto player debido a que esta función solo se ejecuta al crear un player
function addPlayerAnimations(){
	var frames_per_second = 10;

	// animaciones para caminar
	player.animations.add('walk_front', [0, 1, 2, 3], frames_per_second, true);
	player.animations.add('walk_left', [8, 9, 10, 11], frames_per_second, true);
	player.animations.add('walk_right', [24, 25, 26, 27], frames_per_second, true);
	player.animations.add('walk_back', [16, 17, 18, 19], frames_per_second, true);

	// animaciones para atacar
	player.animations.add('attack_front', [4, 5, 6, 7], frames_per_second, false);
	player.animations.add('attack_left', [12, 13, 14, 15], frames_per_second, false);
	player.animations.add('attack_right', [28, 29, 30, 31], frames_per_second, false);
	player.animations.add('attack_back', [20, 21, 22, 23], frames_per_second, false);
}


// Mientras se realiza un ataque
function attacking(){
	if(!this.is_attacking) 
		return;

	// la animación para el ataque
	this.animations.play('attack_' + this.direction);

	// Cuando expira el tiempo del ataque, este se detiene
	if(game.time.elapsedSince(this.start_time_attack) > this.timeBetweenAttacks){
		this.is_attacking = false;
		this.attack.hitEnemy = false;
		this.speed = this.SPEED_WALKING;
	}
}


function hitPlayer(enemy){
	
	this.start_time_hit = game.time.time;
	if(this.canMove){
		if(enemy.key == 'scorpion'){
			if(!this.shield.visible)
				this.takeDamage(scorpions.damage);
			else
				return;
		}
		else if(enemy.key == 'stone' || enemy.key == 'boss'){
			this.takeDamage(stones.damage);
			this.shield.visible = false;

			this.canMove = false;
			this.spiral.visible = true;

			if(flags['timeOut'])
				this.playerDies(true);
		}
	}
	
	this.sound_hit.play();
}

function playerTakeDamage(damage){
	game.global.health -= damage;
	this.checkHealth();
	this.playerDies();
}

function checkHealth(){
    if (game.global.health <= 0){
        this.sound_hit.play();
        game.global.lives--;
        if (game.global.lives > 0)
            game.global.health = 100;
        else
            game.global.health = 0;

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);
    }
}

function playerDies(timeOut){
        // When the player dies
	if (game.global.lives < 1 || timeOut){
	    this.eyes.visible = false;
	    this.kill();

//	    stones.callAll('kill');
	    loseImage.visible = true;
	}
    
}

function playerSetDrawOrder(){
	inkImage.bringToTop();
}

function setPlayerVelocity(direction, jumpInWall){
//	if(player.body.touching.down || jumpInWall){
		this.body.velocity.x = direction * this.speed;
//	}

}

// El movimiento del jugador mediante teclado
function movePlayer(){
	if(!this.canMove || game.physics.arcade.isPaused || flags['winState'])
		return;

//	if(player.body.touching.down)
		this.body.velocity.x = 0;
//	else{
		if(player.body.touching.right)
			this.timeOfTouchRightWall = game.time.now;
		if(player.body.touching.left)
			this.timeOfTouchLeftWall = game.time.now;
//	}

	// Al presionar una tecla, el jugador se mueve y se activa una animacion
	if(keyboard.leftKey()){
		// Mover a la izquierda
		if(game.time.now - this.timeOfTouchRightWall < 500){
			this.body.velocity.y = -this.speed;
			this.setVelocity(-1, true);
		}
		else
			this.setVelocity(-1, false);

		this.playAnimations('left');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('left', this);
	}
	else if(keyboard.rightKey()){
		// Mover a la derecha
		if(game.time.now - this.timeOfTouchLeftWall < 500){
			this.body.velocity.y = -this.speed;
			this.setVelocity(1, true);
		}
		else
			this.setVelocity(1, false);
		
		this.playAnimations("right");
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('right', this);
	} 
	
	if(keyboard.upKey()){
		if (player.body.touching.down){
			this.body.velocity.y = -this.speed * 1.5;
		}
		this.playAnimations('back');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('back', this);
	} // abajo
	else if(keyboard.downKey()){
//		this.body.velocity.y = this.speed;
		this.playAnimations('front');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('front', this);
		if(this.body.touching.down)
			this.timeToDownPlatform = game.time.now;
	}
	

	// Permanecer quieto
	if(!this.is_attacking &&
		!keyboard.upKey() &&
		!keyboard.downKey() &&
		!keyboard.leftKey() &&
		!keyboard.rightKey()){
		this.animations.stop();
	}
	
}


// cuando se realiza un ataque, se reproduce la animación correspondiente a la dirección del jugador
function playAnimations(new_direction){
	if(!this.is_attacking || this.segment){
		this.animations.play('walk_' + new_direction);
		this.direction = new_direction;
	}
}

// Al realizar un ataque, se establece la bandera a true, y se guarda el momento de inicio del ataque
function toAttack(){
	this.is_attacking = true;
	this.attack.hitEnemy = true;
	this.start_time_attack = game.time.time;
//	this.speed = this.SPEED_ATTACKING;
	this.sound_sword_fail.play();
}


// Se ejecutan las funciones del jugador, como moverse y atacar
function updatePlayer(){
	if(game.time.elapsedSince(this.start_time_hit) > 1500 ){
		this.canMove = true;
		this.spiral.visible = false;
	}

	this.eyes.x = this.x+17;
	this.eyes.y = this.y+10;

	this.movePlayer();
	this.attacking();

	if (game.time.time - this.timeVelocityActivated < this.timeWithVelocity){
        this.speed = this.highSpeed;
    }
    else{
    	if(!this.is_attacking)
        	this.speed = this.SPEED_WALKING;
        else
        	this.speed = this.SPEED_ATTACKING;
        gui.changeAbility(false, "velocity");
    }  

    if( this.segment ){
    	this.segment.x = this.body.x + 5;
		this.segment.y = this.body.y - 45;
    }

	// Cuando se presiona la tecla SPACE, se produce un ataque o se interactúa con un pillar
	if(keyboard.spaceKey() && !this.is_attacking && game.time.now - this.start_time_pillar_action > 500){
		if ( this.overlapPillar() ){
			this.start_time_pillar_action = game.time.now;
        }
        else if (!this.segment){
        	this.toAttack();
        }
	}

	
}

function playerOverlapPillar(){
	for (var i=0; i<3; i++){
		if( game.physics.arcade.overlap(player, pillars[i]) ){
			if (this.segment != null){
				if(pillars[i].push(this.segment)){
					this.segment = null;
					return true;
				}
			}
			else{
				this.segment = pillars[i].pop();
				if(this.segment)
					return true;
			}
		}
	}
	return false;
}

function activateAbility(type){
	gui.upScore(50);
    if ( type == "velocity"){
        this.activateVelocity();
    } 
    else if(type == 'shield'){
    	this.activateShield();
    }
    else if(type == 'light'){
    	this.activateLight();
    }
}

function activateVelocity(){
    this.timeVelocityActivated = game.time.time;
}

function activateShield(){
	this.shield.visible = true;
}

function activateLight(){
	light.addTime(20000);
}


function setWinState(){
	flags['winState'] = true;
	timeOfWinState = game.time.now;

	door.move();
	
	stones.callAll('kill');
	scorpions.callAll('kill');
}

function restartPlayer(){
	this.x = 200;
	this.y = 300;
	this.segment = null;
	this.shield.visible = false;
	this.eyes.visible = true;
}