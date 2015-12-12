
function addItem(type){
    var x = 200 + (Math.random() * 400); 
    var item = game.add.sprite( x, 0, type);
    game.physics.enable(item, Phaser.Physics.ARCADE);

    item.type = type;

    item.body.gravity.y = 40;

    item.sound = game.add.audio('item');

    item.takeItem = takeItem;
    item.update = updateItem;

    return item;
}

function updateItem(){
    if(this.y > 600){
        items = null;
        this.destroy();
    }
}


function takeItem(){    
    this.sound.play();

    gui.changeAbility(true, this.type);
    player.activateAbility(this.type);
    
    items = null;
	this.destroy();
}
