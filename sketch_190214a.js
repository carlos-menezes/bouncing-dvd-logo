let x, y;
let xSpeed, ySpeed;
let dvd;
let timesHit = 0, centerCrosses = 0;

function preload() {
  soundFormats('mp3');
  hitSound = loadSound('ding.mp3');
  dvd = loadImage('dvd_logo.png');
}

function setup() {
  createCanvas(800, 600);
  xSpeed = 1;
  ySpeed = 1;
  x = random(width - dvd.width);
  y = random(height - dvd.height);
  hitSound.setVolume(0.5);
}

function hitCorner() {
  let topLeft = x <= 0 && y <= 0
  let topRight = x >= width - dvd.width && y <= 0
  let bottomLeft = x <= 0 && y >= height - dvd.height
  let bottomRight = x >= width - dvd.width && y >= height - dvd.height
  let center = x == width / 2 && y == height / 2
   
  if (topLeft || topRight || bottomRight || bottomLeft) {
     hitSound.play();
     timesHit += 1;
  }
  
  if (center) {
    centerCrosses += 1;
  }
}

function hitBoundaries() {
  if(x >= width - dvd.width || x <= 0) {
    xSpeed = -xSpeed;
    tint(random(255), random(255), random(255));
  }
  if(y >= height - dvd.height || y <= 0) {
    ySpeed = -ySpeed;
    tint(random(255), random(255), random(255));
  }
}

function hitsText() {
  textSize(18);
  fill(255, 255, 255);
  text(`Corner hits: ${timesHit} | Center crosses: ${centerCrosses}`, width / 2 - 170, height - 10);
}

function draw() {
  background(0);
  image(dvd, x, y);
  x += xSpeed;
  y += ySpeed;
  hitBoundaries();
  hitCorner();
  hitsText();
}
