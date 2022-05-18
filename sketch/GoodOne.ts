class GoodOne {
    x: number;
    y: number;
    w: number;
    h: number;
    tankX: number;
    tankY: number;
    pxX: number;
    pxY: number;
    coolDown: boolean;
    bullets: Bullet[];
    constructor(x: number, y: number, h: number, w: number) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.tankY = 0;
        this.tankX = 20;
        this.bullets = [];
        this.coolDown= false;
    }

    draw() {
        this.pxX = (this.x * this.w) + 100;
        this.pxY = (this.y * this.h) + 100;
        noStroke();
        fill(0, 255, 0);
        ellipse(this.pxX, this.pxY, this.w - 10, this.h - 10);

        rect(this.pxX + this.tankX, this.pxY + this.tankY, this.w - 30, this.h - 30);

        this.bullets.forEach(bulletSandra=> {
            bulletSandra.draw();
        })

        let milisenconds: number = millis();
        if(milisenconds %3000 <= 10){
            this.coolDown= false;
        }
    }
    movementUp() {
        this.y = this.y - 1;
        this.tankX = 0;
        this.tankY = -20;
    }

    movementDown() {
        this.y = this.y + 1;
        this.tankX = 0;
        this.tankY = 20;
    }

    movementRight() {
        this.x = this.x + 1;
        this.tankX = 20;
        this.tankY = 0;
    }

    movementLeft() {
        this.x = this.x - 1;
        this.tankX = -20;
        this.tankY = 0;
    }

    shootUp() {
        this.tankX = 0;
        this.tankY = -20;
if(!this.coolDown){
        const newBullet = new Bullet(0, -2, this.pxX, this.pxY + this.tankY, this.h);
        this.bullets.push(newBullet);

        this.coolDown= true;
}
    }

    shootDown() {
        this.tankX = 0;
        this.tankY = 20;
        if(!this.coolDown){
        const newBullet = new Bullet(0, 2, this.pxX, this.pxY + this.tankY, this.h);
        this.bullets.push(newBullet);

        this.coolDown= true;
        }
    }

    shootRight() {
        this.tankX = 20;
        this.tankY = 0;
        if(!this.coolDown){
        const newBullet = new Bullet(2, 0, this.pxX + this.tankX, this.pxY, this.h);
        this.bullets.push(newBullet);

        this.coolDown= true;
        }
    }

    shootLeft() {
        this.tankX = -20;
        this.tankY = 0;
        if(!this.coolDown){
        const newBullet = new Bullet(-2, 0, this.pxX + this.tankX, this.pxY, this.h);
        this.bullets.push(newBullet);

        this.coolDown= true;
        }
    }
    
}