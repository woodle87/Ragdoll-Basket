// Ragdoll Volleyball Game using Matter.js

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
const runner = Runner.create();
Runner.run(runner, engine);

// Ground and walls
const ground = Bodies.rectangle(width/2, height-20, width, 40, { isStatic: true, render: { fillStyle: "#666" } });
const leftWall = Bodies.rectangle(0, height/2, 40, height, { isStatic: true, render: { fillStyle: "#666" } });
const rightWall = Bodies.rectangle(width, height/2, 40, height, { isStatic: true, render: { fillStyle: "#666" } });
World.add(world, [ground, leftWall, rightWall]);

// Net in the center
const net = Bodies.rectangle(width/2, height-175, 18, 350, { isStatic: true, render: { fillStyle: "#fff" } });
World.add(world, net);

// Volleyball
const ball = Bodies.circle(width/2, height/2, 22, { restitution: 0.88, friction: 0.001, render: { fillStyle: "#f8f8aa", strokeStyle: "#aaa", lineWidth: 3 } });
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

  return { parts, ragdoll, head, torso, upperArmL, upperArmR, lowerArmL, lowerArmR, handL, handR, footL, footR };
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
  // Move left/right (A/D)
  if (keys['a']) {
    Body.applyForce(player.torso, player.torso.position, { x: -0.007, y: 0 });
  }
  if (keys['d']) {
    Body.applyForce(player.torso, player.torso.position, { x: 0.007, y: 0 });
  }
  // Jump (W)
  if (keys['w'] && (player.footL.position.y > height-55 || player.footR.position.y > height-55)) {
    Body.applyForce(player.torso, player.torso.position, { x: 0, y: -0.11 });
  }
});

// Player arms up and hit (Space)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    // Move arms up for animation
    Body.setAngle(player.upperArmL, -Math.PI/2.2);
    Body.setAngle(player.upperArmR, Math.PI/2.2);

    // If ball is close enough to a hand, "hit" it
    const hitForce = 0.25;
    if (Matter.Vector.magnitude(Matter.Vector.sub(player.handL.position, ball.position)) < 45) {
      Body.applyForce(ball, ball.position, {x: hitForce, y: -hitForce});
    }
    if (Matter.Vector.magnitude(Matter.Vector.sub(player.handR.position, ball.position)) < 45) {
      Body.applyForce(ball, ball.position, {x: hitForce, y: -hitForce});
    }
  }
});
document.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    // Return arms to down position
    Body.setAngle(player.upperArmL, 0);
    Body.setAngle(player.upperArmR, 0);
  }
});

// Simple bot AI: move, jump, and "hit" with arms up if ball is close
setInterval(() => {
  // Only move if ball is on bot's side
  if (ball.position.x > width/2 || Math.random() < 0.3) {
    const dir = (ball.position.x > bot.torso.position.x) ? 1 : -1;
    Body.applyForce(bot.torso, bot.torso.position, { x: 0.006 * dir, y: 0 });
  }
  // Jump if ball is above
  if (Math.abs(ball.position.x - bot.torso.position.x) < 50 && ball.position.y < bot.torso.position.y-10 && (bot.footL.position.y > height-50 || bot.footR.position.y > height-50)) {
    Body.applyForce(bot.torso, bot.torso.position, { x: 0, y: -0.10 });
  }
  // Simulate "hit" (arms up) if ball is near hands
  const botHitForce = 0.22;
  if (Matter.Vector.magnitude(Matter.Vector.sub(bot.handL.position, ball.position)) < 45) {
    Body.setAngle(bot.upperArmL, -Math.PI/2.2);
    setTimeout(()=>Body.setAngle(bot.upperArmL, 0), 200);
    Body.applyForce(ball, ball.position, {x: -botHitForce, y: -botHitForce});
  }
  if (Matter.Vector.magnitude(Matter.Vector.sub(bot.handR.position, ball.position)) < 45) {
    Body.setAngle(bot.upperArmR, Math.PI/2.2);
    setTimeout(()=>Body.setAngle(bot.upperArmR, 0), 200);
    Body.applyForce(ball, ball.position, {x: -botHitForce, y: -botHitForce});
  }
}, 180);

// Scoring: ball hits ground on a side
let playerScore = 0;
let botScore = 0;
function checkScore() {
  // Ball below a certain height
  if (ball.position.y > height-45) {
    if (ball.position.x < width/2) {
      botScore++;
    } else {
      playerScore++;
    }
    // Reset ball and ragdolls
    Body.setPosition(ball, { x: width/2, y: height/2 });
    Body.setVelocity(ball, { x: 0, y: 0 });
    Body.setPosition(player.torso, { x: 180, y: height-120 });
    Body.setVelocity(player.torso, { x: 0, y: 0 });
    Body.setPosition(bot.torso, { x: width-180, y: height-120 });
    Body.setVelocity(bot.torso, { x: 0, y: 0 });
  }
}
Events.on(engine, 'afterUpdate', checkScore);

// Draw score
const ctx = canvas.getContext('2d');
function drawScore() {
  ctx.save();
  ctx.font = "32px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText(`You: ${playerScore}`, 60, 50);
  ctx.fillText(`Bot: ${botScore}`, width-160, 50);
  ctx.restore();
}
(function animateScore() {
  drawScore();
  requestAnimationFrame(animateScore);
})();

// -- End of game.js --
