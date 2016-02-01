


function addLight(){
	var light = game.add.sprite(50, 100, 'lamp');
	light.fire = light.addChild(game.add.sprite(33, 220, 'fire'));
	light.fire.anchor.setTo(0.5, 1);
	light.fire.scale.setTo(1.5, 1.5);
//	light.fire.position.setTo(0, 0);
	light.fire.animations.add('fire', [0, 1], 10, true);
	light.fire.animations.play('fire');

	light.timer = light.addChild(
		game.add.text(25, 220, '', 
			{ font: '18px ferney', fill: '#fff', stroke: '#000000', strokeThickness: 3 }));


	light.timeInitLight = game.time.now;
	light.durationOfLight = 30000;

	light.setDark = setGameInDark;
	light.update = updateLight;
	light.restart = restartLight;
	light.addTime = addLightTime;

	return light;
}


function addLightTime(value){
	if( game.time.now - this.timeInitLight > this.durationOfLight){
		this.timeInitLight = game.time.now - this.durationOfLight;
	}
	this.timeInitLight += value;
}

function updateLight(){
	if(!game.global.is_playing || flags['winState'] || game.global.lives <= 0 || game.physics.arcade.isPaused)
		return;

	var time =  Math.floor((this.durationOfLight - (game.time.now - this.timeInitLight)) / 1000);
	if(time > 0)
		this.timer.text = time;
	else
		this.timer.text = '0';

	var scale = ((time * 1000 / this.durationOfLight) * 1.5) + 0.5;
	if(scale > 1.5)
		scale = 1.5;
	this.fire.scale.setTo(scale, scale);

	var local_time = game.time.now - this.timeInitLight;
	if(local_time > this.durationOfLight){
		this.fire.renderable = false;
//		this.setDark(true, scale - 0.5);	
		if(items == null)
			 items = addItem('light');
	}
	else{
		this.fire.renderable = true;
//		this.setDark(false, scale - 0.5);
	}

	scale -= 0.5;
	if(scale<=0)
		scale = 0; 
	else if(scale >= 1)
		scale = 1;

	this.setDark(false, scale);
}

function setGameInDark(value, alpha){
/*
    background.visible = !value;

    player.renderable = !value;

    scorpions.setAll('renderable', !value, true);

    wall.renderable = !value;
//    ground.renderable = !value;

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

    if(game.global.level >= 5){
    	boss.renderable = !value;
        segments[4].renderable = !value;
    }
    if(game.global.level >= 3)
        segments[3].renderable = !value; 
*/
	background.alpha = alpha;

    player.alpha = alpha;

    scorpions.setAll('alpha', alpha, true);
    stones.setAll('alpha', alpha, true);

    wall.alpha = alpha;
//    ground.renderable = !value;

    if(game.global.level >= 2)
    	platforms[0].alpha = alpha;
    if(game.global.level >= 3)
    	platforms[1].alpha = alpha;

    pillars[0].alpha = alpha;
    pillars[1].alpha = alpha;
    pillars[2].alpha = alpha;

    segments[0].alpha = alpha;
    segments[1].alpha = alpha;
    segments[2].alpha = alpha;

    if(game.global.level >= 5){
    	boss.alpha = alpha;
        segments[4].alpha = alpha;
    }
    if(game.global.level >= 3)
        segments[3].alpha = alpha;
}


function restartLight(){
	this.timeInitLight = game.time.now;
}

