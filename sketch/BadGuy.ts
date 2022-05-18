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

        movementUp() {
            this.y = this.y - 1;
            
        }
    
        movementDown() {
            this.y = this.y + 1;
        }
    
        movementRight() {
            this.x = this.x + 1;
            
        }
    
        movementLeft() {
            this.x = this.x - 1;
           
    }

    movementRandom(){
        const randomNumber= floor(random(0,4));

        switch(randomNumber){
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
    }
}