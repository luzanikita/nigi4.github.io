var wallsOn = "OFF";
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = "50px Arial";
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.fillText("SNAKE GAME", canvas.width/2, canvas.height/2);

ctx.font = "20px Arial";
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.fillText("Press ENTER to start", canvas.width/2, canvas.height/2 + 50);

ctx.font = "20px Arial";
ctx.fillStyle = "#fff";
ctx.textAlign = "center";
ctx.fillText("Walls: " + wallsOn, canvas.width/2, canvas.height/2 + 100);

var snake;
var attempt = 0;
var apple;

window.onkeydown = function(e)
{
    if (e.keyCode == 13)
        start();
    else if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 39)
        wallsChange(canvas.width / 2, canvas.height / 2);
}

function start()
{
    snake = new Snake();  
    isBreak = false;

    music.load();
    music.play();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i in snake.tail)
    {
        snake.tail[i].draw();
    }

    newApple();

    setTimeout(function run()
    {
        if (!isBreak) {
            refresh();
            setTimeout(run, 75);
        }
    }, 75);
    
    window.onkeydown = function(e)
    {
        snake.change(e);

        if (e.keyCode == 32)
        {
            gameOver(); 
        }
    }
}

function gameOver()
{
    attempt++;
    
    isBreak = true;
    
    music.pause();
    if (attempt == 5)
    {
        doit.style.display="block";
        doit.load();
        doit.play();
        attempt = 0; 
        setTimeout( function(){doit.style.display = "none";} ,65000);
    }
    else
    {
        wasted.style.display="block";
        defeat.load();
        defeat.play();
    }
    

    
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Your score: " + snake.score, canvas.width/2, canvas.height/2 + 50);
    
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Press ENTER to retry", canvas.width/2, canvas.height/2 + 100);
    
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Walls: " + wallsOn, canvas.width/2, canvas.height/2 + 150);
    
    window.onkeydown = function(e)
    {
        if (e.keyCode == 13)
        {
            doit.style.display="none";
            doit.pause();

            wasted.style.display="none";
            defeat.pause();

            start();
        }
        else if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 39)
            wallsChange(canvas.width / 2, canvas.height / 2 + 50);
    }   
}

function wallsChange(x, y) {
    if (wallsOn == "ON")
            wallsOn = "OFF"
        else
            wallsOn = "ON"
        
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillRect(x - 50, y + 80, 100, 20);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Walls: " + wallsOn, x, y + 100);
}