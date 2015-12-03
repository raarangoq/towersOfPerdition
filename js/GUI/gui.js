
function GUI(){

	// Objetos y Atributos
	
	

	// Vidas
	this.lives_bar = addLivesBar();
	this.items_bar = new itemsBar();
	addScore();

	// Pause
	this.pause_menu = addPause();
	this.scoreText = addScore();

	// Metodos
	this.update = updateGui;
	this.setDrawOrder = guiSetDrawOrder;

	this.pauseGame = guiPauseGame;
	this.upScore = guiUpScore;
	this.changeAbility = changeAbility;
	this.setAlive = guiSetAlive;

	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
    this.pauseKey.onDown.add(this.pauseGame, this);
}

function updateGui(){
	this.items_bar.update();
	this.lives_bar.update();
	this.pause_menu.update();
}

function guiUpScore(value){
	this.scoreText.upScore(value);
}

function guiPauseGame(){
	this.pause_menu.pauseGame();
}


// true for take a new item, false when de player uses a item or lose the item
function changeAbility(take, type){
	if (take)
		this.items_bar.setItemsBarAbility(type);
	else
		this.items_bar.useItemsBarAbility(type);
}

function guiSetDrawOrder(){
	this.pause_menu.setDrawOrder();
	this.items_bar.setDrawOrder();
	this.lives_bar.setDrawOrder();
	scoreText.setDrawOrder();
}

function guiSetAlive(value){
	this.items_bar.setAlive(value);
	this.lives_bar.setAlive(value);
	this.pause_menu.setAlive(value);
	this.scoreText.setAlive(value);
}


