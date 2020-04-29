var cvs, ctx;
window.onload = function() {
  cvs = document.getElementById("snek");
  ctx = cvs.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  // render X times per second
  var x = 8;
  setInterval(draw, 1000 / x);
};

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// create the snek

let snek = [];

snek[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snek.length ; i++){
        ctx.fillStyle = ( i == 0 )? "black" : "blue";
        ctx.fillRect(snek[i].x,snek[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snek[i].x,snek[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snekX = snek[0].x;
    let snekY = snek[0].y;
    
    // which direction
    if( d == "LEFT") snekX -= box;
    if( d == "UP") snekY -= box;
    if( d == "RIGHT") snekX += box;
    if( d == "DOWN") snekY += box;
    
    // if the snek eats the food
    if(snekX == food.x && snekY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snek.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snekX,
        y : snekY
    }
    
    // game over
    
    if(snekX < box || snekX > 17 * box || snekY < 3*box || snekY > 17*box || collision(newHead,snek)){
        clearInterval(game);
    }
    
    snek.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);
