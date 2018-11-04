class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    draw() {
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, this.y, 15, 15);
    }

    del() {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, 15, 15);
    }
}

class Snake {
    constructor() {
        this.tail = [new Point(canvas.width / 2 - 30,canvas.height / 2), new Point(canvas.width / 2 - 15,canvas.height / 2), new Point(canvas.width / 2, canvas.height / 2), new Point(canvas.width / 2 + 15, canvas.height / 2)];
        this.score = 0;
        this.isBreak = false;
        this.queue = ["left"];
    }
    
    change(e) {
        if ((e.keyCode == 83 || e.keyCode == 40) && this.queue[this.queue.length - 1] !== "up" && this.queue[this.queue.length - 1] !== "down")
        {
            this.queue.push("down");
        }
        else if ((e.keyCode == 87 || e.keyCode == 38)&& this.queue[this.queue.length - 1] !== "down" && this.queue[this.queue.length - 1] !== "up")
        {
            this.queue.push("up");
        }
        else if ((e.keyCode == 65 || e.keyCode == 37) && this.queue[this.queue.length - 1] !== "right" && this.queue[this.queue.length - 1] !== "left")
        {
            this.queue.push("left");
        }
        else if ((e.keyCode == 68 || e.keyCode == 39) && this.queue[this.queue.length - 1] !== "left" && this.queue[this.queue.length - 1] !== "right")
        {
            this.queue.push("right");
        }
    }      

    move() {
        switch(this.queue[0]) {
            case "down": this.tail[0].y += 15; break;
            case "up": this.tail[0].y -= 15; break;
            case "left": this.tail[0].x -= 15; break;
            case "right": this.tail[0].x += 15;
        }
        
        if (wallsOn == "OFF")
        {
            if (this.tail[0].x >= canvas.width)
                this.tail[0].x = 0;
            if (this.tail[0].y >= canvas.height)
                this.tail[0].y = 0;
            if (this.tail[0].x <= -15)
                this.tail[0].x = canvas.width - 15;
            if (this.tail[0].y <= -15)
                this.tail[0].y = canvas.height - 15;
        }

        this.tail[0].draw();

        if (this.queue.length > 1)
            this.queue.shift();
    }
}

function rand(max, div) {
    return Math.floor(Math.floor(Math.random()*(max + 1)) / div) * div;
}

function collision() {
    apple = new Point(rand(canvas.width,15), rand(canvas.height, 15));
    for (let i = 0; i < snake.tail.length; i++)
    {
        if (snake.tail[i].x == apple.x && snake.tail[i].y == apple.y)
        {
            collision();
            break;
        }
    }
}

function newApple() {
    collision();
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(apple.x, apple.y, 15, 15);
}

function refresh() {
    for (let i = 1; i < snake.tail.length; i++)
    {
        if (snake.tail[0].x == snake.tail[i].x && snake.tail[0].y == snake.tail[i].y)
        {
            gameOver();
            return;
        }
    }

    if (wallsOn == "ON")
    {
        if (snake.tail[0].x >= canvas.width || snake.tail[0].x < 0 || snake.tail[0].y >= canvas.height || snake.tail[0].y < 0)
        {
            gameOver();
            return;
        }
    }

    if (snake.tail[0].x == apple.x && snake.tail[0].y == apple.y)
    {
        snake.tail.push(new Point(apple.x, apple.y));
        newApple();
        snake.score++;
    }
    else
        snake.tail[snake.tail.length - 1].del();

    for (let i = snake.tail.length - 1; i >= 1; i--)
    {
        snake.tail[i].x = snake.tail[i - 1].x;
        snake.tail[i].y = snake.tail[i - 1].y;
    }

    snake.move();

}