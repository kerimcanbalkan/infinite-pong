const boxWidth = 40;
const boxHeight = 40;
const numBoxesX = Math.ceil(width() / boxWidth / 2);
const numBoxesY = Math.ceil(height() / boxHeight);



for (let y = 0; y < numBoxesY; y++) {
  for (let x = 0; x < numBoxesX; x++) {
    add([
      rect(40, 40),
      color(153, 229, 80),
      pos(x * boxWidth, y * boxHeight),
      area(),
      "box",
      {
        group: "green"
      }

    ]);
  }
}

for (let y = 0; y < numBoxesY; y++) {
  for (let x = 0; x < numBoxesX; x++) {
    add([
      rect(40, 40),
      color(91, 110, 225),
      area(),
      pos((x + numBoxesX) * boxWidth, y * boxHeight),
      "box",
      {
        group: "purple"
      }

    ]);
  }
}



add([
  pos(width() / 4, height() / 2),
  circle(10),
  color(91, 110, 225),
  area(),
  "purple-ball",
  "ball",
  {
    hspeed: 200,
    vspeed: 100,
  }
])

add([
  pos(width() - (width() / 4), height() / 2),
  circle(10),
  color(153, 229, 80),
  area(),
  "green-ball",
  "ball",
  {
    hspeed: -200,
    vspeed: -100,
  }

])


onUpdate("ball", (ball) => {
  if (ball.pos.x < 0 || ball.pos.x > width()) {
    ball.hspeed = -ball.hspeed;
  }
  if (ball.pos.y < 0 || ball.pos.y > height()) {
    ball.vspeed = -ball.vspeed;
  }
  // move
  ball.move(ball.hspeed, ball.vspeed);
});


onCollideUpdate("green-ball", "box", (ball, box) => {
  if (box.group === "green") {
    ball.hspeed = -ball.hspeed;
    ball.vspeed = -ball.hspeed;
    box.color = Color.fromArray([91, 110, 225]);
    box.group = "purple"
  }

})

onCollide("purple-ball", "box", (ball, box) => {
  if (box.group === "purple") {
    ball.hspeed = -ball.hspeed;
    ball.vspeed = -ball.hspeed;
    box.color = Color.fromArray([153, 229, 80]);
    box.group = "green"
  }
})


