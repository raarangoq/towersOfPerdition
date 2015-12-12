
// Agregar la interfaz de salud del jugador, solo se invoca al inicio
function addLivesBar(){
    var livesBar = game.add.sprite(650, 495, 'healthBar');

    lives = 3;
    livesBar.heart = [];

	for (var i = 0; i < lives; i++) 
    {
        livesBar.heart[i] = game.add.sprite(663 + (30 * i), 505, 'heart');
        livesBar.heart[i].scale.setTo(1.5, 1.5);
        livesBar.heart[i].frame = 0;
    }
    livesBar.health = game.add.text(650, 540, 'Salud : ', { font: "16pt ferney", fill: '#fff' });
    livesBar.health.stroke = '#000000';
    livesBar.health.strokeThickness = 3;


    livesBar.update = updateLivesBar;
    livesBar.setDrawOrder = livesBarSetDrawOrder;
    livesBar.setAlive = livesBarSetAlive;

    return livesBar;
}

function updateLivesBar(){
    this.health.text = 'Salud: ' + game.global.health;

    if (game.global.lives <= 2)
        this.heart[0].visible = false;

    if (game.global.lives <= 1)
        this.heart[1].visible = false;

    if (game.global.lives == 0)
        this.heart[2].visible = false;
}

function livesBarSetDrawOrder(){
    this.bringToTop();
    this.heart[0].bringToTop();
    this.heart[1].bringToTop();
    this.heart[2].bringToTop();
}

function livesBarSetAlive(value){
    if (value){
        this.revive();
        this.heart[0].revive();
        this.heart[1].revive();
        this.heart[2].revive();
        this.health.revive();
    }
    else {
        this.kill();
        this.heart[0].kill();
        this.heart[1].kill();
        this.heart[2].kill();
        this.health.kill();
    }
}