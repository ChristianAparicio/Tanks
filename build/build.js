var BadGuy = (function () {
    function BadGuy(x, y, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }
    BadGuy.prototype.draw = function () {
        fill(255, 0, 0);
        ellipse((this.x * this.w) + 100, (this.y * this.h) + 100, this.w, this.h);
    };
    return BadGuy;
}());
var GoodOne = (function () {
    function GoodOne(x, y, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }
    GoodOne.prototype.draw = function () {
        fill(0, 255, 0);
        ellipse((this.x * this.w) + 100, (this.y * this.h) + 100, this.w, this.h);
    };
    GoodOne.prototype.movementUp = function () {
        this.y = this.y - 1;
    };
    GoodOne.prototype.movementDown = function () {
        this.y = this.y + 1;
    };
    GoodOne.prototype.movementRight = function () {
        this.x = this.x + 1;
    };
    GoodOne.prototype.movementLeft = function () {
        this.x = this.x - 1;
    };
    return GoodOne;
}());
var Wall = (function () {
    function Wall(x, y, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }
    Wall.prototype.draw = function () {
        fill(180);
        rect((this.x * this.w) + 100, (this.y * this.h) + 100, this.w, this.h);
    };
    return Wall;
}());
var w = 50;
var h = 50;
var enemies = [];
var walls = [];
var ariana;
var matriz = [
    [1, 0, 3, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 3, 0, 1, 1, 1, 1, 0, 1],
];
function setup() {
    createCanvas(windowWidth, windowHeight);
    matriz.forEach(function (filas, y) {
        filas.forEach(function (cuadros, x) {
            switch (cuadros) {
                case 0:
                    break;
                case 1:
                    var wall = new Wall(x, y, h, w);
                    walls.push(wall);
                    break;
                case 2:
                    ariana = new GoodOne(x, y, h, w);
                    break;
                case 3:
                    var pete = new BadGuy(x, y, h, w);
                    enemies.push(pete);
                    break;
            }
        });
    });
}
function draw() {
    rectMode(CENTER);
    background(0);
    enemies.forEach(function (enemyPete) {
        enemyPete.draw();
    });
    walls.forEach(function (wally) {
        wally.draw();
    });
    ariana.draw();
}
function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            if (matriz[ariana.y - 1][ariana.x] !== 1) {
                matriz[ariana.y][ariana.x] = 0;
                ariana.movementUp();
                matriz[ariana.y][ariana.x] = 2;
            }
            break;
        case DOWN_ARROW:
            if (matriz[ariana.y + 1][ariana.x] !== 1) {
                matriz[ariana.y][ariana.x] = 0;
                ariana.movementDown();
                matriz[ariana.y][ariana.x] = 2;
            }
            break;
        case LEFT_ARROW:
            if (matriz[ariana.y][ariana.x - 1] !== 1) {
                matriz[ariana.y][ariana.x] = 0;
                ariana.movementLeft();
                matriz[ariana.y][ariana.x] = 2;
            }
            break;
        case RIGHT_ARROW:
            if (matriz[ariana.y][ariana.x + 1] !== 1) {
                matriz[ariana.y][ariana.x] = 0;
                ariana.movementRight();
                matriz[ariana.y][ariana.x] = 2;
            }
            break;
    }
}
//# sourceMappingURL=build.js.map