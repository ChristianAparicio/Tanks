const w: number = 50;
const h: number = 50;
let enemies: BadGuy[] = [];
let walls: Wall[] = [];
let ariana: GoodOne;
let matriz: number[][] = [
  [1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],

  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0],

  [0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0],

  [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],

  [1, 1, 0, 0, 3, 0, 1, 1, 1, 1, 0, 1],

]

function setup() {


  createCanvas(windowWidth, windowHeight)


  matriz.forEach((filas, y) => {
    filas.forEach((cuadros, x) => {
      switch (cuadros) {
        case 0:
          break;

        case 1:
          const wall = new Wall(x, y, h, w);
          walls.push(wall);
          break;

        case 2:
          ariana = new GoodOne(x, y, h, w);
          break;

        case 3:
          const pete = new BadGuy(x, y, h, w);
          enemies.push(pete);
          break;

      }
    })
  })

}




function draw() {

  rectMode(CENTER);

  background(0);
  let seconds: number = millis()/1000;

  enemies.forEach(enemyPete => {
    enemyPete.draw()
    
  if(seconds%3 <= 0.05){
    enemyPete.movementRandom();
  }
  })

  walls.forEach(wally => {
    wally.draw()
  })

  ariana.draw()

  ariana.bullets.forEach(baliana=> {
    baliana.validateWalls(walls, ariana.bullets);
  })

  

}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      if(matriz[ariana.y-1][ariana.x]!== 1){
      matriz[ariana.y][ariana.x]= 0;
      ariana.movementUp();
      matriz[ariana.y][ariana.x]= 2;

      }
      break;
    case DOWN_ARROW:
      if(matriz[ariana.y+1][ariana.x]!== 1){
      matriz[ariana.y][ariana.x]= 0;
      ariana.movementDown();
      matriz[ariana.y][ariana.x]= 2;
      }
      break;
    case LEFT_ARROW:
      if(matriz[ariana.y][ariana.x-1]!== 1){
      matriz[ariana.y][ariana.x]= 0;
      ariana.movementLeft();
      matriz[ariana.y][ariana.x]= 2;
      }
      break;
    case RIGHT_ARROW:
      if(matriz[ariana.y][ariana.x+1]!== 1){
      matriz[ariana.y][ariana.x]= 0;
      ariana.movementRight();
      matriz[ariana.y][ariana.x]= 2;
      }
      break;

      case 87: //W
        ariana.shootUp();
        break;

        case 83://s
          ariana.shootDown();
          break;

          case 68: // d
          ariana.shootRight();
          break;

          case 65: // a
          ariana.shootLeft();
          break;
  }
}