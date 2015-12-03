
function addPause(){
	var pause_menu = game.add.sprite(0, 0, 'pause');
	pause_menu.fixedToCamera = true;
	pause_menu.visible = false;

	pause_menu.setDrawOrder = pauseMenuSetDrawOrder;
	pause_menu.setAlive = pauseMenuSetAlive;
	pause_menu.update = pauseMenuUpdate;
	pause_menu.pauseGame = pauseGame;

	return pause_menu;
}

function pauseMenuUpdate(){
	
}

function pauseGame(){
	if(game.physics.arcade.isPaused){
		this.visible = false;
		game.physics.arcade.isPaused = false;
	}
	else{
		this.visible = true;
		game.physics.arcade.isPaused = true;
	}
}

function pauseMenuSetDrawOrder(){
	this.bringToTop();
}

function pauseMenuSetAlive(value){
    if (value){
        this.revive();
    }
    else {
        this.kill();
    }
    this.visible = false;
}

