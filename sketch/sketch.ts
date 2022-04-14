function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  const circlesArray = calculateTouchingCircles(width, height);
  for (const c of circlesArray) {
    drawCircle(c);
  }
}

function drawCircle(c: Circle) {
  const shade = random(50, 100);
  fill(shade);
  noStroke();
  circle(c.pos.x, c.pos.y, c.radius * 2);
}
