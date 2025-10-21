// Simple Ragdoll Basket Game using Matter.js

// Matter.js modules
const { Engine, Render, Runner, World, Bodies, Body, Constraint, Composite, Events } = Matter;

// Game setup
const width = 900;
const height = 600;
const canvas = document.getElementById('gameCanvas');

const engine = Engine.create();
const world = engine.world;

// Renderer
const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: '#333'
  }
});
Render.run(render);

// Runner
const runner = Runner.create();
Runner.run(runner, engine);

// Ground and walls
const ground = Bodies.rectangle(width/2, height-20, width, 40, { isStatic: true, render: { fillStyle: "#666" } });
const leftWall = Bodies.rectangle(0, height/2, 40, height, { isStatic: true, render: { fillStyle: "#666" } });
const rightWall = Bodies.rectangle(width, height/2, 40, height, { isStatic: true, render: { fillStyle: "#666" } });
World.add(world, [ground, leftWall, rightWall]);

// Basket (simple hoop)
const basketX = width-80;
const basketY = 200;
const basket = Bodies.rectangle(basketX, basketY, 80, 12, { isStatic: true, render: { fillStyle: "#f8b400" } });
World.add(world, basket);

// Basketball
const ball = Bodies.circle(width/2, height/2, 20, { restitution: 0.7, render: { fillStyle: "#f88300" } });
World.add(world, ball);

// Helper: create a ragdoll
function createRagdoll(x, y, color="#fff") {
  const head = Bodies.circle(x, y-70, 18, { render: { fillStyle: color } });
  const torso = Bodies.rectangle(x, y-30, 16, 48, { chamfer: { radius: 8 }, render: { fillStyle: color } });
  const upperArmL = Bodies.rectangle(x-22, y-40, 32, 10, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const upperArmR = Bodies.rectangle(x+22, y-40, 32, 10, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const lowerArmL = Bodies.rectangle(x-42, y-40, 28, 10, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const lowerArmR = Bodies.rectangle(x+42, y-40, 28, 10, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const handL = Bodies.circle(x-56, y-40, 8, { render: { fillStyle: color } });
  const handR = Bodies.circle(x+56, y-40, 8, { render: { fillStyle: color } });
  const upperLegL = Bodies.rectangle(x-10, y+8, 12, 32, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const upperLegR = Bodies.rectangle(x+10, y+8, 12, 32, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const lowerLegL = Bodies.rectangle(x-10, y+34, 12, 26, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const lowerLegR = Bodies.rectangle(x+10, y+34, 12, 26, { chamfer: { radius: 5 }, render: { fillStyle: color } });
  const footL = Bodies.circle(x-10, y+50, 8, { render: { fillStyle: color } });
  const footR = Bodies.circle(x+10, y+50, 8, { render: { fillStyle: color } });

  // Constraints (joints)
  const parts = [head, torso, upperArmL, upperArmR, lowerArmL, lowerArmR, handL, handR,
                 upperLegL, upperLegR, lowerLegL, lowerLegR, footL, footR];
  const constraints = [
    Constraint.create({ bodyA: head, pointA: {x:0, y:18}, bodyB: torso, pointB: {x:0, y:-24}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: torso, pointA: {x:-8, y:-20}, bodyB: upperArmL, pointB: {x:16, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: torso, pointA: {x:8, y:-20}, bodyB: upperArmR, pointB: {x:-16, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: upperArmL, pointA: {x:-16, y:0}, bodyB: lowerArmL, pointB: {x:14, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: upperArmR, pointA: {x:16, y:0}, bodyB: lowerArmR, pointB: {x:-14, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: lowerArmL, pointA: {x:-14, y:0}, bodyB: handL, pointB: {x:0, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: lowerArmR, pointA: {x:14, y:0}, bodyB: handR, pointB: {x:0, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: torso, pointA: {x:-6, y:24}, bodyB: upperLegL, pointB: {x:0, y:-14}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: torso, pointA: {x:6, y:24}, bodyB: upperLegR, pointB: {x:0, y:-14}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: upperLegL, pointA: {x:0, y:14}, bodyB: lowerLegL, pointB: {x:0, y:-13}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: upperLegR, pointA: {x:0, y:14}, bodyB: lowerLegR, pointB: {x:0, y:-13}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: lowerLegL, pointA: {x:0, y:13}, bodyB: footL, pointB: {x:0, y:0}, length: 2, stiffness: 0.6 }),
    Constraint.create({ bodyA: lowerLegR, pointA: {x:0, y:13}, bodyB: footR, pointB: {x:0, y:0}, length: 2, stiffness: 0.6 }),
  ];

  // Composite
  const ragdoll = Composite.create({ bodies: parts, constraints: constraints });
  World.add(world, ragdoll);

  return { parts, ragdoll, head, torso, handL, handR, footL, footR };
}

// Player and bot ragdolls
const player = createRagdoll(180, height-120, "#59f");
const bot = createRagdoll(width-180, height-120, "#fa4");

// Keyboard controls
const keys = {};
document.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
});

// Move player ragdoll
Events.on(engine, 'beforeUpdate', function() {
  // Move left/right
  if (keys['a']) {
    Body.applyForce(player.torso, player.torso.position, { x: -0.005, y: 0 });
  }
  if (keys['d']) {
    Body.applyForce(player.torso, player.torso.position, { x: 0.005, y: 0 });
  }
  // Jump if feet are touching ground
  if (keys['w'] && (player.footL.position.y > height-50 || player.footR.position.y > height-50)) {
    Body.applyForce(player.torso, player.torso.position, { x: 0, y: -0.08 });
  }
});

// Simple bot AI: random left/right, sometimes jumps
setInterval(() => {
  // Move randomly left/right
  const dir = Math.random() > 0.5 ? 1 : -1;
  Body.applyForce(bot.torso, bot.torso.position, { x: 0.004 * dir, y: 0 });
  // Random jump
  if (Math.random() < 0.2 && (bot.footL.position.y > height-50 || bot.footR.position.y > height-50)) {
    Body.applyForce(bot.torso, bot.torso.position, { x: 0, y: -0.07 });
  }
}, 400);

// Scoring
let playerScore = 0;
let botScore = 0;
function checkScore() {
  // Ball in basket area?
  if (ball.position.x > basketX-40 && ball.position.x < basketX+40 &&
      ball.position.y > basketY-30 && ball.position.y < basketY+30) {
    // Who last touched?
    if (ball.position.x < width/2) playerScore++;
    else botScore++;
    // Reset ball position
    Body.setPosition(ball, { x: width/2, y: height/2 });
    Body.setVelocity(ball, { x: 0, y: 0 });
  }
}
Events.on(engine, 'afterUpdate', checkScore);

// Draw score
const ctx = canvas.getContext('2d');
function drawScore() {
  ctx.save();
  ctx.font = "32px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(`Player: ${playerScore}`, 40, 50);
  ctx.fillText(`Bot: ${botScore}`, width-160, 50);
  ctx.restore();
}
(function animateScore() {
  drawScore();
  requestAnimationFrame(animateScore);
})();

// -- End of game.js --
