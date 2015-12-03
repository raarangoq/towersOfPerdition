
function addScore(){

    var scoreText = game.add.text(10, 10, 'Puntaje: ', { font: '34px Arial', fill: '#fff' });
    scoreText.scoreString = 'Puntaje: ';
    scoreText.score = 0;

    scoreText.upScore = upScore;
    scoreText.setDrawOrder = scoreSetDrawOrder;
    scoreText.setAlive = scoreSetAlive;

    return scoreText;
}


function upScore(value){
	this.score += value;
    this.text = this.scoreString + this.score;
}

function scoreSetDrawOrder(){
	this.bringToTop();
}

function scoreSetAlive(value){
    if (value){
        this.revive();
    }
    else {
        this.kill();
    }
}