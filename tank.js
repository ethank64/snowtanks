class Tank {
  constructor(x, y, shotAngle, side) {
    this.initialX = x;
    this.x = x;
    this.y = y;
    this.r = 0;
    this.shotAngle = shotAngle;
    this.vel = 0;
    this.side = side;
    this.bullets = [];
    this.otherPlayerHurtbox = createVector(0, 0);
    this.score = 0;
    this.power = 1;
  }

  update(up, right, left, down, inc, dec, otherPlayerX, otherPlayerHurtbox) {
    this.r = ((this.y[floor(this.x) - floor(25 / 2.5)]) - (this.y[floor(this.x) + floor(25 / 2.5)])) * -1;
    
    this.vel = 1 - map(abs(this.r), 0, 90, 0, 1);

    if (keyIsDown(down) && this.shotAngle > -90) {
      this.shotAngle--;
    } else if (keyIsDown(up) && this.shotAngle < 90) {
      this.shotAngle++;
    }
    
    if (keyIsDown(left) && this.x > 16 && (this.x > otherPlayerX || this.side === "left")) {
      this.x -= this.vel;
    } else if (keyIsDown(right) && this.x < width - 16 && (this.x < otherPlayerX || this.side === "right")) {
      this.x += this.vel;
    }
    
    if (keyIsDown(inc) && this.power < 1) {
      this.power += 0.01;
      console.log(this.power);
    } else if (keyIsDown(dec) && this.power > 0.25) {
      this.power -= 0.01;
    }
    
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].applyForce(gravity);
      this.bullets[i].update();
      this.bullets[i].show();
      
      if (this.bullets[i].collision(otherPlayerHurtbox, this.y) === "miss") {
        this.bullets.splice(i, i + 1);
      } else if (this.bullets[i].collision(otherPlayerHurtbox, this.y) === "hit") {
        this.score++;
        reset();
      }
    }
  }
  
  shoot(shootButton) {
    if (keyCode == (shootButton) && this.bullets.length < 3) {
      this.bullets.push(new Bullet(this.x, this.y[floor(this.x)], this.r + this.shotAngle, 5, this.power));
    }
  }

  show() {
    push();
    strokeWeight(2);
    stroke(255);
    noFill();
    translate(this.x, this.y[floor(this.x)]);
    rotate(this.r);
    ellipse(0, 0, 25, 25);
    ellipse(-8, 28, 10, 10);
    ellipse(8, 28, 10, 10);
    rect(0, 18, 30, 10);
    rotate(this.shotAngle);
    line(0, -12, 0, -22);
    pop();
  }
}
