let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

var imageSize = 100;
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  let xdirection = 0;
  let ydirection = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = imageSize;

  // TODO: set position here
  newimg.position = position;
  // TODO add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    xdirection,
    ydirection,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    if (item.xdirection == 0) {
      item.position.x += item.velocity.x;
    } 
    else {
      item.position.x -= item.velocity.x;
    }
    if (item.ydirection == 0) {
      item.position.y += item.velocity.y;
    }
    else {
      item.position.y -= item.velocity.y;
    }

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (item.position.x + imageSize >= pageWidth) {
    item.xdirection = 1;
  }
  else if (item.position.x <= 0) {
    item.xdirection = 0;
  }
  if (item.position.y + imageSize >= pageHeight) {
    item.ydirection = 1;
  }
  else if (item.position.y <= 0) {
    item.ydirection = 0;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}