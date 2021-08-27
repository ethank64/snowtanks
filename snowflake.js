function Snowflake() {
  this.pos = createVector(random(width), random(-100, height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.r = random(5, 15);

  this.applyForce = function(force) {
    let f = force.copy();
    f.mult(this.r);
    this.acc.add(f);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);

    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }

    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.borders = function() {
    if (this.pos.y > height) {
      this.pos = createVector(random(width), random(-100, 0));
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.r = random(5, 15);
    }
  }

  this.show = function() {
    push();
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r);
    pop();
  }
}
