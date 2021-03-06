
function addSegments(){

	segments[0] = addSegment(0);
	segments[1] = addSegment(1);
	segments[2] = addSegment(2);
	segments[3] = addSegment(3);
	segments[4] = addSegment(4);

	segments.setAlive = segmentsSetAlive;
}

function addSegment(id){
	var segment = game.add.sprite(150 + (id * 200), 200, 'segment-' + (id + 1));
	segment.anchor.set(0.5);
	game.physics.enable(segment, Phaser.Physics.ARCADE);

	segment.id = id + 1;
	//var text = game.add.text(5, 5, id, 
	//	{ font: "14pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3 });
	//segment.addChild(text);

	return segment;
}

function segmentsSetAlive(value){
	if(value){
		segments[0].revive();
		segments[1].revive();
		segments[2].revive();
		if(game.global.level >= 3)
			segments[3].revive();
		if(game.global.level >= 5)
			segments[4].revive();
	}
	else{
		segments[0].kill();
		segments[1].kill();
		segments[2].kill();
		segments[3].kill();
		segments[4].kill();
	}
}

