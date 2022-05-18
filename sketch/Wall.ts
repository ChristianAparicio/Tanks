class Wall{
    x:number;
    y:number;
    w:number;
    h:number;
    pxX: number;
    pxY:number;
        constructor(x:number, y:number,h:number, w:number){
    this.x = x;
    this.y= y;
    this.h= h;
    this.w= w;
        }
    
        draw(){

            this.pxX=(this.x*this.w)+100;
            this.pxY=(this.y*this.h)+100;
            fill(180);
                  rect(this.pxX, this.pxY , this.w,this.h);
        }
    }