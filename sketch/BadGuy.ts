class BadGuy{
    x:number;
    y:number;
    w:number;
    h:number;
        constructor(x:number, y:number,h:number, w:number){
    this.x = x;
    this.y= y;
    this.h= h;
    this.w= w;
        }
    
        draw(){
            fill(255,0,0);
                  ellipse((this.x*this.w)+100, (this.y*this.h)+100 , this.w,this.h);
        }
    }