let flakes = [];
let yLocations = [];
let inc = 0.01;
let gravity;
let player1;
let player2;
let player1P;
let player2P;
let hidden = false;
let controls1;
let controls2;

function setup() {
  const cnv = createCanvas(800, 500);
  cnv.style("border", "2px solid black");
  cnv.style("margin", "0% auto 0% auto");

  rectMode(CENTER);
  angleMode(DEGREES);

  for (let i = 0; i < random(100, 150); i++) {
    flakes[i] = new Snowflake();
  }
  
  gravity = createVector(0, 0.03);
  
  makeSnowHills();
  
  player1P = select("#player1Score");
  player2P = select("#player2Score");
  
  player1P.style("font-size", `${width / 8}px`);
  player2P.style("font-size", `${width / 8}px`);
  
  player1P.style("margin", `0% 0% 0% ${(displayWidth - width) / 4}px`);
  player2P.style("margin", `0% ${(displayWidth - width) / 4}px 0% 0%`);
  
  controls1 = createP("Player 1: A - Left, D - Right, W - Angle Counterclockwise, S - Angle Clockwise, X - Power Down, C - Power Up");
  controls2 = createP("Player 2: J - Left, L - Right, I - Angle Clockwise, K - Angle Counterclockwise, M - Power Down, N - Power Up")
  
  controls1.class("controls");
  controls2.class("controls");
  
  document.getElementsByClassName("controls")[0].onclick = () => {hidden = !hidden};
  document.getElementsByClassName("controls")[1].onclick = () => {hidden = !hidden};
  
  player1 = new Tank(floor(width / 6), yLocations, 45, "left");
  player2 = new Tank(floor(width - width / 6), yLocations, -45, "right");
}

function draw() {
  background(0);
  
  player1P.html(player1.score);
  player2P.html(player2.score);
  
  if (hidden) {
    controls1.style("visibility", "hidden");
    controls2.style("visibility", "hidden");
  } else {
    controls1.style("visibility", "visible");
    controls2.style("visibility", "visible");
  }

  for (let i = 0; i < flakes.length; i++) {
    flakes[i].applyForce(gravity);
    flakes[i].update();
    flakes[i].borders();
    flakes[i].show();
  }
  
  drawSnowHills();
  
  player1.update(83, 68, 65, 87, 67, 88, player2.x - 27, createVector(player2.x, player2.y[floor(player2.x)]));
  player1.show();
  
  player2.update(73, 76, 74, 75, 78, 77, player1.x + 27, createVector(player1.x, player1.y[floor(player1.x)]));
  player2.show();
}

function keyPressed() {
  player1.shoot(69);
  player2.shoot(85);
}

function reset() {
  player1.x = floor(width / 6);
  player2.x = floor(width - width / 6);
  
  player1.bullets = [];
  player2.bullets = [];
}

function drawSnowHills() {
  noFill();
  stroke(255);
  strokeWeight(2);
  
  for (let x = 0; x < width; x++) {
    line(x, yLocations[x] + 35, x, height);
  }
}

function makeSnowHills() {
  let xoff = 0;
  
  for (let x = 0; x < width; x++) {
    let y = map(noise(xoff), -0.5, 1, 0, height);
    
    if (yLocations.length < width) {
      yLocations[x] = Math.floor(y) - 35;
    }
    
    xoff += inc;
  }
}

function drawSnowman(x, y) {
  push();
  noStroke();
  fill(255);
  scale(0.5);
  translate(x * 2, y * 2);
  noStroke();
  ellipse(0, 0, 50);
  ellipse(0, -25, 40);
  ellipse(0, -50, 25);
  fill(255, 165, 0);
  triangle(0, -50, 0, -45, 10, -47.5);
  stroke(51);
  fill(0);
  rect(0, 0 - 70, 25, 25);
  line(-20, -57, 20, -57);
  pop();
}
