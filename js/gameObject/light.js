


function addLight(){
	var light = game.add.sprite(75, 200, 'pedestal');
	light.fire1 = light.addChild(game.add.sprite(0, -20, 'fire'));
	light.fire2 = light.addChild(game.add.sprite(0, -40, 'fire'));
	light.fire3 = light.addChild(game.add.sprite(0, -60, 'fire'));

	light.timer = light.addChild(
		game.add.text(5, 20, '', 
			{ font: '18px ferney', fill: '#fff', stroke: '#000000', strokeThickness: 3 }));


	setFireAnimations(light.fire1);
	setFireAnimations(light.fire2);
	setFireAnimations(light.fire3);

	light.timeInitLight = game.time.now;
	light.durationOfLight = 20000;

	light.setDark = setGameInDark;
	light.update = updateLight;
	light.restart = restartLight;
	light.addTime = addLightTime;

	return light;
}

function setFireAnimations(fire){
	fire.animations.add('fire', [0, 1], 10, true);
	fire.animations.play('fire');
}

function addLightTime(value){
	if( game.time.now - this.timeInitLight > this.durationOfLight){
		this.timeInitLight = game.time.now - this.durationOfLight;
	}
	this.timeInitLight += value;
}

function updateLight(){
	if(!game.global.is_playing || flags['winState'] || game.global.lives <= 0)
		return;

	var time =  Math.floor((this.durationOfLight - (game.time.now - this.timeInitLight)) / 1000);
	if(time > 0)
		this.timer.text = time;
	else
		this.timer.text = '0';

	var local_time = game.time.now - this.timeInitLight;

	if(local_time > (this.durationOfLight / 3))
		this.fire3.renderable = false;
	else 
		this.fire3.renderable = true;

	if(local_time > (this.durationOfLight * 2/3))
		this.fire2.renderable = false;
	else
		this.fire2.renderable = true;

	if(local_time > this.durationOfLight){
		this.fire1.renderable = false;
		this.setDark(true);	
		if(items == null)
			 items = addItem('light');
	}
	else{
		this.fire1.renderable = true;
		this.setDark(false);
	}
}

function setGameInDark(value){

    background.visible = !value;

    player.renderable = !value;

    scorpions.setAll('renderable', !value, true);

    walls.setAll('renderable', !value);

    if(game.global.level >= 2)
    	platforms[0].renderable = !value;
    if(game.global.level >= 3)
    	platforms[1].renderable = !value;

    pillars[0].renderable = !value;
    pillars[1].renderable = !value;
    pillars[2].renderable = !value;

    segments[0].renderable = !value;
    segments[1].renderable = !value;
    segments[2].renderable = !value;

    if(game.global.level >= 5)
        segments[4].renderable = !value;
    if(game.global.level >= 3)
        segments[3].renderable = !value; 
}


function restartLight(){
	this.timeInitLight = game.time.now;
}

