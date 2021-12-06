class Bullet {
  constructor(x, y, angle, speed, power) {
    this.pos = createVector(x, y);
    this.angle = angle;
    this.rad = 15;
    this.speed = speed;
    this.power = power;
    
    if (this.angle >= 0 && this.angle <= 90) {
      this.vel = createVector(map(this.angle, -90, 90, -this.speed, this.speed, true) * this.power, (map(this.angle, -90, 90, -this.speed, this.speed, true) * -1 + this.speed) * -this.power);
    } else if (this.angle < 0 && this.angle >= -90) {
      this.vel = createVector(map(this.angle, -90, 90, -this.speed, this.speed, true) * this.power, (map(this.angle, -90, 90, -this.speed, this.speed, true) + this.speed) * -this.power);
    } else if (this.angle > 90) {
      this.vel = createVector((this.speed - (map(this.angle, -90, 90, -this.speed, this.speed)) + this.speed) * this.power, ((map(this.angle, -90, 90, -this.speed, this.speed) * -1) + this.speed) * -this.power);
    } else if (this.angle < -90) {
      this.vel = createVector((this.speed + (map(this.angle, -90, 90, -this.speed, this.speed)) + this.speed) * -this.power, ((map(this.angle, -90, 90, -this.speed, this.speed) * -1) - this.speed) * this.power);
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
