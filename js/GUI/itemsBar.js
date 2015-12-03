

function itemsBar(){
	this.itemsBar = game.add.sprite(20, 495, 'healthBar');


	this.itemImage = [];
	this.itemImage['torpedo'] = game.add.sprite(80, 500, 'torpedo');
	this.itemImage['torpedo'].visible = false;
	this.itemImage['velocity'] = game.add.sprite(80, 500, 'velocity');
	this.itemImage['velocity'].visible = false;

	this.update = updateItemsBar;
	this.setItemsBarAbility = setItemsBarAbility;
	this.useItemsBarAbility = useItemsBarAbility;
	this.setDrawOrder = itemsBarSetDrawOrder;
	this.setAlive = itemsBarSetAlive;
}


function updateItemsBar(){
	
}

function itemsBarSetDrawOrder(){
	this.itemsBar.bringToTop();
	this.itemImage['torpedo'].bringToTop();
	this.itemImage['velocity'].bringToTop();
}


function useItemsBarAbility(type){
	this.itemImage[type].visible = false;
}

function setItemsBarAbility(type){
	this.itemImage[type].visible = true;

}

function itemsBarSetAlive(value){
	if (value){
		this.itemsBar.revive();
		this.itemImage['torpedo'].revive();
		this.itemImage['velocity'].revive();
	}
	else {
		this.itemsBar.kill();
		this.itemImage['torpedo'].kill();
		this.itemImage['velocity'].kill();
	}
}