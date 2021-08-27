class Bullet {
  constructor(x, y, r, speed) {
    this.pos = createVector(x, y);
    this.r = r;
    this.rad = 15;
    this.speed = speed;
    
    if (this.r >= 0) {
      this.vel = createVector(map(this.r, -180, 180, -this.speed, this.speed, true) * 2, ((map(this.r, -180, 180, -this.speed, this.speed, true) * -2) + this.speed) * -1);
    } else {
      this.vel = createVector(map(this.r, -180, 180, -this.speed, this.speed, true) * 2, ((map(this.r, -180, 180, -this.speed, this.speed, true) * 2) + this.speed) * -1);
    }
    
    this.acc = createVector(0, 0);
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  collision(otherPlayerHurtbox, ground) {
    if (floor(this.pos.y) >= ground[floor(this.pos.x)] + this.rad * 2) {
      return "miss";
    } else if (this.pos.x >= width) {
      return "miss";
    } else if (this.pos.x <= 0) {
      return "miss";
    }
    
    if (dist(this.pos.x, this.pos.y, floor(otherPlayerHurtbox.x), floor(otherPlayerHurtbox.y)) < 15) {
      return "hit";
    }
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }
  
  show() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.rad);
    pop();
  }
}
