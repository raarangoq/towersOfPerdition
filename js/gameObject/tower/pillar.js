

function addPillars(){

	pillars[0] = addPillar(0);
	pillars[1] = addPillar(1);
	pillars[2] = addPillar(2);

	pillars.objective = 2;

	pillars.setAlive = pillarsSetAlive;
	pillars.restart = restartPillars;
	
}

function pillarsSetAlive(value){
	if(value){
		pillars[0].revive();
		pillars[1].revive();
		pillars[2].revive();
	}
	else{
		pillars[0].kill();
		pillars[1].kill();
		pillars[2].kill();
	}
}

function restartPillars(){
	for(i=0; i<3; i++){
		this[i].slot[0] = null;
		this[i].slot[1] = null;
		this[i].slot[2] = null;
	}
}

function addPillar(id){
	var pillar = game.add.sprite(100 + (id * 200), 300, 'pillar');
	game.physics.enable(pillar, Phaser.Physics.ARCADE);
	pillar.scale.setTo(0.5, 0.5);

	pillar.slot = [];
	pillar.slot[0] = null;
	pillar.slot[1] = null;
	pillar.slot[2] = null;

	pillar.push = pushSegment;
	pillar.pop = popSegment;
	pillar.setSegmentPosition = setSegmentPosition;
	pillar.checkObjective = checkObjective;

	return pillar;
}

function checkObjective(){
	if (pillars[pillars.objective].slot[0] != null){
		player.setWinState();
	}
}


function pushSegment(segment){
	if(this.slot[2] == null){
		this.slot[2] = segment;
		this.setSegmentPosition(segment, 2);	
		return true;
	}
	else if(this.slot[1] == null){
		if( segment.id < this.slot[2].id ){
			this.slot[1] = segment;
			this.setSegmentPosition(segment, 1);
			return true;
		}
	}
	else if(this.slot[0] == null){
		if( segment.id < this.slot[1].id ){
			this.slot[0] = segment;
			this.setSegmentPosition(segment, 0);
			this.checkObjective();
			return true;
		}
	}

	return false;
	
}

function popSegment(){
	var segment = null;
	if(this.slot[0] != null){
		segment = this.slot[0];
		this.slot[0] = null;
	}
	else if(this.slot[1] != null){
		segment = this.slot[1];
		this.slot[1] = null;
	}
	else if(this.slot[2] != null){
		segment = this.slot[2];
		this.slot[2] = null;
	}

	return segment;
}

function setSegmentPosition(segment, slot){
	segment.x = this.body.x;
	segment.y = this.body.y + (slot * 40);

}