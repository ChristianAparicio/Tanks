class Bullet{

 velX: number;
 velY: number;
 pxX: number;
 pxY: number;
 cellSize: number;
    constructor(velX:number, velY:number, pxX:number, pxY:number, cellSize:number){

this.velX= velX;
this.velY= velY;
this.pxX= pxX;
this.pxY= pxY;
this.cellSize= cellSize;
    }

    draw(){

        fill(0,255,0);
        ellipse(this.pxX, this.pxY, 8,8);
        this.pxX += this.velX;
        this.pxY += this.velY;
    }
    validateWalls(walls: Wall[], bullets: Bullet[]){

   walls.forEach(wally=> {
       if(dist(wally.pxX,wally.pxY, this.pxX, this.pxY)< this.cellSize/2){
           bullets.splice(bullets.indexOf(this),1)
       }
   })   
     
    }
}