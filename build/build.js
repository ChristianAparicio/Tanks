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
    BadGuy.prototype.movementUp = function () {
        this.y = this.y - 1;
    };
    BadGuy.prototype.movementDown = function () {
        this.y = this.y + 1;
    };
    BadGuy.prototype.movementRight = function () {
        this.x = this.x + 1;
    };
    BadGuy.prototype.movementLeft = function () {
        this.x = this.x - 1;
    };
    BadGuy.prototype.movementRandom = function () {
        var randomNumber = floor(random(0, 4));
        switch (randomNumber) {
            case 0:
                this.movementUp();
                break;
            case 1:
                this.movementDown();
            case 2:
                this.movementLeft();
                break;
            case 3:
                this.movementRight();
                break;
        }
    };
    return BadGuy;
}());
var Bullet = (function () {
    function Bullet(velX, velY, pxX, pxY, cellSize) {
        this.velX = velX;
        this.velY = velY;
        this.pxX = pxX;
        this.pxY = pxY;
        this.cellSize = cellSize;
    }
    Bullet.prototype.draw = function () {
        fill(0, 255, 0);
        ellipse(this.pxX, this.pxY, 8, 8);
        this.pxX += this.velX;
        this.pxY += this.velY;
    };
    Bullet.prototype.validateWalls = function (walls, bullets) {
        var _this = this;
        walls.forEach(function (wally) {
            if (dist(wally.pxX, wally.pxY, _this.pxX, _this.pxY) < _this.cellSize / 2) {
                bullets.splice(bullets.indexOf(_this), 1);
            }
        });
    };
    return Bullet;
}());
var GoodOne = (function () {
    function GoodOne(x, y, h, w) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.tankY = 0;
        this.tankX = 20;
        this.bullets = [];
        this.coolDown = false;
    }
    GoodOne.prototype.draw = function () {
        this.pxX = (this.x * this.w) + 100;
        this.pxY = (this.y * this.h) + 100;
        noStroke();
        fill(0, 255, 0);
        ellipse(this.pxX, this.pxY, this.w - 10, this.h - 10);
        rect(this.pxX + this.tankX, this.pxY + this.tankY, this.w - 30, this.h - 30);
        this.bullets.forEach(function (bulletSandra) {
            bulletSandra.draw();
        });
        var milisenconds = millis();
        if (milisenconds % 3000 <= 10) {
            this.coolDown = false;
        }
    };
    GoodOne.prototype.movementUp = function () {
        this.y = this.y - 1;
        this.tankX = 0;
        this.tankY = -20;
    };
    GoodOne.prototype.movementDown = function () {
        this.y = this.y + 1;
        this.tankX = 0;
        this.tankY = 20;
    };
    GoodOne.prototype.movementRight = function () {
        this.x = this.x + 1;
        this.tankX = 20;
        this.tankY = 0;
    };
    GoodOne.prototype.movementLeft = function () {
        this.x = this.x - 1;
        this.tankX = -20;
        this.tankY = 0;
    };
    GoodOne.prototype.shootUp = function () {
        this.tankX = 0;
        this.tankY = -20;
        if (!this.coolDown) {
            var newBullet = new Bullet(0, -2, this.pxX, this.pxY + this.tankY, this.h);
            this.bullets.push(newBullet);
            this.coolDown = true;
        }
    };
    GoodOne.prototype.shootDown = function () {
        this.tankX = 0;
        this.tankY = 20;
        if (!this.coolDown) {
            var newBullet = new Bullet(0, 2, this.pxX, this.pxY + this.tankY, this.h);
            this.bullets.push(newBullet);
            this.coolDown = true;
        }
    };
    GoodOne.prototype.shootRight = function () {
        this.tankX = 20;
        this.tankY = 0;
        if (!this.coolDown) {
            var newBullet = new Bullet(2, 0, this.pxX + this.tankX, this.pxY, this.h);
            this.bullets.push(newBullet);
            this.coolDown = true;
        }
    };
    GoodOne.prototype.shootLeft = function () {
        this.tankX = -20;
        this.tankY = 0;
        if (!this.coolDown) {
            var newBullet = new Bullet(-2, 0, this.pxX + this.tankX, this.pxY, this.h);
            this.bullets.push(newBullet);
            this.coolDown = true;
        }
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
        this.pxX = (this.x * this.w) + 100;
        this.pxY = (this.y * this.h) + 100;
        fill(180);
        rect(this.pxX, this.pxY, this.w, this.h);
    };
    return Wall;
}());
var w = 50;
var h = 50;
var enemies = [];
var walls = [];
var ariana;
var matriz = [
    [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
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
    var seconds = millis() / 1000;
    enemies.forEach(function (enemyPete) {
        enemyPete.draw();
        if (seconds % 3 <= 0.05) {
            enemyPete.movementRandom();
        }
    });
    walls.forEach(function (wally) {
        wally.draw();
    });
    ariana.draw();
    ariana.bullets.forEach(function (baliana) {
        baliana.validateWalls(walls, ariana.bullets);
    });
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
        case 87:
            ariana.shootUp();
            break;
        case 83:
            ariana.shootDown();
            break;
        case 68:
            ariana.shootRight();
            break;
        case 65:
            ariana.shootLeft();
            break;
    }
}
//# sourceMappingURL=build.js.map