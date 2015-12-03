
function addSegments(){

	segments[0] = addSegment(0);
	segments[1] = addSegment(1);
	segments[2] = addSegment(2);

	segments.setAlive = segmentsSetAlive;
}

function addSegment(id){
	var segment = game.add.sprite(150 + (id * 200), 200, 'segment');
//	segment.scale.setTo(0.5, 0.5);
	game.physics.enable(segment, Phaser.Physics.ARCADE);

	segment.id = id + 1;
	var text = game.add.text(10, 10, id, { font: '16px Arial', fill: '#fff' });
	segment.addChild(text);

	return segment;
}

function segmentsSetAlive(value){
	if(value){
		segments[0].revive();
		segments[1].revive();
		segments[2].revive();
	}
	else{
		segments[0].kill();
		segments[1].kill();
		segments[2].kill();
	}
}
