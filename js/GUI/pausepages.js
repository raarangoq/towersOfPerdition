function addPausePage0(){
	var page = game.add.text(400, 150, 'Level ' + game.global.level,
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 4,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	page.anchor.setTo(0.5, 0.5);

	var text = game.add.text(0, 180, 
		'Completa el problema de las torres de Hanoi mientras peleas con los escorpiones, ' + 
		'antes de tiempo, para escapar de la camara que colapsa.\n\n',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);


	page.setAlive = setPageAlive;
	return page;
}


function addPausePage1(){
	var page = game.add.sprite(0, 0, 'input');


	page.setAlive = setPageAlive;

	return page;
}

function addPausePage2(){
	var page = game.add.sprite(100, 130, 'scorpion');
	page.animations.add('walk', [0, 1, 2], 8, true);
    page.play('walk');
	var text = game.add.text(50, 0, 
		'Escorpion: pequeño bicho que inflinge daño leve.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 70, 'stone1');
	page.addChild(image);
	text = game.add.text(50, 70, 
		'Roca: Una roca que cae del techo de la cueva, infringe daño moderado y te incapacita.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 170, 'boss');
	image.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
    image.play('walk');
    image.scale.setTo(0.5, 0.5);
	page.addChild(image);
	text = game.add.text(100, 170, 
		'Rey: Gran escorpion inmune a los ataques físicos, infringe daño moderado y te incapacita.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 500});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}

function setPageAlive(value){
	if(value){
		this.revive();
	}
	else
		this.kill();
}

function addPausePage3(){
	var page = game.add.sprite(100, 130, 'velocity');
	var text = game.add.text(50, 0, 
		'Velocidad: Te permite moverte mas rápido mientras está activo.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 100, 'shield');
	page.addChild(image);
	text = game.add.text(50, 100, 
		'Escudo: Te proteje de los escorpiones.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'heart');
	page.addChild(image);
	text = game.add.text(50, 200, 
		'Vida: Dispones de tres vidas, cuando las pierdes, mueres.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}


function addPausePage4(){
	var page = game.add.sprite(100, 130, 'segment-3');
	var text = game.add.text(50, 0, 
		'Totem: Cuando estés sobre el tótem presiona espacio para agarrarlo y llevarlo a otra base.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 100, 'fire');
	image.animations.add('burn', [0, 1], 7, true);
	image.play('burn');
	page.addChild(image);
	text = game.add.text(50, 100, 
		'Antorcha: Cuando se estinga su llama, no podrás ver nada.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'light');
	page.addChild(image);
	text = game.add.text(50, 200, 
		'Luz: Tomalo para revivir y avivar el fuego de la antorcha.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}