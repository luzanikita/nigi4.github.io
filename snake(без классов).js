function wallsChange(x, y)
{
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

function draw(x, y)
{
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, 15, 15);
}

function del(x, y)
{
    ctx.fillStyle = "#000";
    ctx.fillRect(x, y, 15, 15);
}

function rand(max, div)
{
    return Math.floor(Math.floor(Math.random()*(max + 1)) / div) * div;
}

function noColision ()
{
    apple = [rand(canvas.width,15), rand(canvas.height, 15)];
    for (let i = 0; i < snake.length; i++)
    {
        if (snake[i][0] == apple[0] && snake[i][1] == apple[1])
        {
            noColision();
            break;
        }
    }
}

function newApple()
{
    noColision();
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(apple[0], apple[1], 15, 15);
}

function change(e)
{
    if ((e.keyCode == 83 || e.keyCode == 40) && queue[queue.length - 1] !== "up" && queue[queue.length - 1] !== "down")
    {
        queue.push("down");
    }
    else if ((e.keyCode == 87 || e.keyCode == 38)&& queue[queue.length - 1] !== "down" && queue[queue.length - 1] !== "up")
    {
        queue.push("up");
    }
    else if ((e.keyCode == 65 || e.keyCode == 37) && queue[queue.length - 1] !== "right" && queue[queue.length - 1] !== "left")
    {
        queue.push("left");
    }
    else if ((e.keyCode == 68 || e.keyCode == 39) && queue[queue.length - 1] !== "left" && queue[queue.length - 1] !== "right")
    {
        queue.push("right");
    }
}      

function move(direct)
{
    if (direct == "down")
    {
        snake[0][1] += 15;
    }
    else if (direct == "up")
    {
        snake[0][1] -= 15;
    }
    else if (direct == "left")
    {
        snake[0][0] -= 15;
    }
    else if (direct == "right")
    {
        snake[0][0] += 15;
    }
    
    if (wallsOn == "OFF")
    {
        if (snake[0][0] == canvas.width)
            snake[0][0] = 0;
        if (snake[0][1] == canvas.height)
            snake[0][1] = 0;
        if (snake[0][0] == -15)
            snake[0][0] = canvas.width - 15;
        if (snake[0][1] == -15)
            snake[0][1] = canvas.height - 15;
    }
      
    draw(snake[0][0], snake[0][1]);
    
    if (queue.length > 1)
        queue.shift();
}

function refresh()
{
    for (let i = 1; i < snake.length; i++)
    {
        if (snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1])
        {
            gameOver();
            return;
        }
    }
    
    if (wallsOn == "ON")
    {
        if (snake[0][0] >= canvas.width || snake[0][0] < 0 || snake[0][1] >= canvas.height || snake[0][1] < 0)
        {
            gameOver();
            return;
        }
    }
    
    if (snake[0][0] == apple[0] && snake[0][1] == apple[1])
    {
        snake.push([apple[0], apple[1]]);
        newApple();
        score++;
    }
    else
        del(snake[snake.length - 1][0], snake[snake.length - 1][1]);
    
    for (let i = snake.length - 1; i >= 1; i--)
    {
        snake[i][0] = snake[i - 1][0];
        snake[i][1] = snake[i - 1][1];
    }
    
    move(queue[0]);
    
}

function start(e)
{
    snake = [[canvas.width / 2 - 30,canvas.height / 2], [canvas.width / 2 - 15,canvas.height / 2], [canvas.width / 2, canvas.height / 2], [canvas.width / 2 + 15, canvas.height / 2]];
    queue = ["left"];
    score = 0;
    inProcess = false;   
    isBreak = false;

    music.load();
    music.play();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i in snake)
    {
        draw(snake[i][0], (snake[i][1]));
    }

    newApple();

    timer = setTimeout(function run()
    {
        if (isBreak)
            return;
        refresh();
        setTimeout(run, 75);
    }, 75);
    
    window.onkeydown = function(e)
    {
        change(e);

        if (e.keyCode == 32)
        {
            gameOver(); 
        }
    }
}

function gameOver()
{
    attempt++;
    
    clearTimeout(timer);
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
    ctx.fillText("Your score: " + score, canvas.width/2, canvas.height/2 + 50);
    
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

            start(e);
        }
        else if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 39)
            wallsChange(canvas.width / 2, canvas.height / 2 + 50);
    }   
}

var snake;
var score;
var inProcess;   
var queue;
var isBreak;
var apple;
var timer;
var attempt = 0;
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

window.onkeydown = function(e)
{
    if (e.keyCode == 13)
        start();
    else if (e.keyCode == 65 || e.keyCode == 68 || e.keyCode == 37 || e.keyCode == 39)
        wallsChange(canvas.width / 2, canvas.height / 2);
}