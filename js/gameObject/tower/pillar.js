

/************************************************
		Group of pillars
******************************************/

function addPillars(){

	pillars[0] = addPillar(0);
	pillars[1] = addPillar(1);
	pillars[2] = addPillar(2);

	pillars.objective = 2;
	pillars.slotObjetive = 2;

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
		this[i].slot[3] = null;
		this[i].slot[4] = null;
	}
	if(game.global.level <= 2)
		this.slotObjetive = 2;
	else if(game.global.level <=4)
		this.slotObjetive = 1;
	else
		this.slotObjetive = 0;
}

/***************************************
		Every single pillar
****************************************/

function addPillar(id){
	var pillar = game.add.sprite(100 + (id * 200), 430, 'pillar');
	game.physics.enable(pillar, Phaser.Physics.ARCADE);
	pillar.scale.setTo(0.5, 0.5);

	pillar.slot = [];
	pillar.slot[0] = null;
	pillar.slot[1] = null;
	pillar.slot[2] = null;
	pillar.slot[3] = null;
	pillar.slot[4] = null;

	pillar.push = pushSegment;
	pillar.pop = popSegment;
	pillar.setSegmentPosition = setSegmentPosition;
	pillar.checkObjective = checkObjective;

	return pillar;
}

function checkObjective(){
	if (pillars[pillars.objective].slot[pillars.slotObjetive] != null){
		player.setWinState();
		gui.upScore(200);
	}
}


function pushSegment(segment){
	if(this.slot[4] == null){
		this.slot[4] = segment;
		this.setSegmentPosition(segment, 4);	
		return true;
	}

	for (var i=3; i>=1; i--){
		if(this.slot[i] == null){
			if(this.slot[i+1] == null)
				return false;
			if( segment.id < this.slot[i+1].id ){
				this.slot[i] = segment;
				this.setSegmentPosition(segment, i);
				this.checkObjective();
				return true;
			}
		}
	}

	if(this.slot[1] == null)
		return false;
	if(this.slot[0] == null){
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
	var segment = null
	for(var i=0; i<5; i++){
		if(this.slot[i] != null){
			segment = this.slot[i];
			this.slot[i] = null;
			return segment;
		}
	}
}

function setSegmentPosition(segment, slot){
	segment.x = this.x;
	segment.y = this.y + (slot * 30) - 130;

}