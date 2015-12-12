


function addDoor(){
	var door = game.add.sprite(710, 380, 'door');
	game.physics.enable(door, Phaser.Physics.ARCADE);
	door.body.immovable = true;
	door.scale.setTo(2, 2);

	door.yTarget = 300;
	
	door.sound = game.add.audio('door');

	door.visible = false;

	door.move = moveDoor;
	door.update = updateDoor;
	door.setAlive = setDoorAlive;
	door.reset = resetDoor;

	return door;
}


function moveDoor(){
//alert('entra');	
	game.physics.arcade.moveToXY(this, this.x, this.yTarget, 60);
	this.sound.play();
}

function updateDoor(){
	if(Math.abs(this.yTarget - this.y) < 10){
		this.body.velocity.y = 0;
		this.body.velocity.x = 20;
	}
}

function setDoorAlive(value){
	if(value){
		this.revive();
		this.visible = true;
	}
	else{
		this.kill();
	}
}

function resetDoor(){
	this.y = 380;
	this.x = 710
	this.body.velocity.setTo(0, 0);
}