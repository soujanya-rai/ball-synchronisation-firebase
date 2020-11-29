var ball;
var database;
var position; //latest value of position in firebase

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballRef = database.ref('ball/position');
    ballRef.on("value", readPosition, showError);
}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
}

function readPosition(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function writePosition(x1, y1) {
    database.ref('ball/position').set({
        x: position.x + x1,
        y: position.y + y1
    });
}

function showError() {
    console.log("Something went wrong");
}