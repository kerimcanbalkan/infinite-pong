import { numBoxesY, numBoxesX, boxHeight, boxWidth, secondaryColor, primaryColor, ballRadius, ballSpeedH, ballSpeedV } from "./constants";
import { k } from "./kaboomCtx";
import { Box } from "./types";

const boxes: Box[] = []


for (let i = 0; i < numBoxesY; i++) {
  for (let j = 0; j < numBoxesX; j++) {
    // yellow
    const box1 = k.add([
      k.rect(boxWidth, boxHeight),
      k.pos(i * boxWidth, j * boxHeight),
      k.color(secondaryColor),
      "box",
      {
        group: "primary"
      }

    ]
    )
    boxes.push(box1);
    // red
    const box2 = k.add([
      k.rect(boxWidth, boxHeight),
      k.color(primaryColor),
      k.pos((i + numBoxesX) * boxWidth, j * boxHeight),
      "box",
      {
        group: "secondary"
      }

    ]);
    boxes.push(box2);
  }
}



k.add([
  k.pos(k.width() / 4, k.height() / 2),
  k.circle(ballRadius),
  k.color(primaryColor),
  k.area(),
  k.anchor("center"),
  "secondary-ball",
  "ball",
  {
    hspeed: ballSpeedH,
    vspeed: ballSpeedV,
  }
])

k.add([
  k.pos(k.width() - (k.width() / 4), k.height() / 2),
  k.circle(ballRadius),
  k.color(secondaryColor),
  k.area(),
  k.anchor("center"),
  "primary-ball",
  "ball",
  {
    hspeed: -ballSpeedH,
    vspeed: -ballSpeedV,
  }

])


k.onUpdate("ball", (ball) => {
  ball.move(ball.hspeed, ball.vspeed);

  if (ball.pos.x - ballRadius * 2 <= 0 || ball.pos.x >= k.width() - ballRadius * 2) {
    ball.hspeed = -ball.hspeed;
  }
  if (ball.pos.y - ballRadius * 2 <= 0 || ball.pos.y >= k.height() - ballRadius * 2) {
    ball.vspeed = -ball.vspeed;
  }

  boxes.forEach(box => {
    if (Math.abs(box.pos.x - ball.pos.x) < boxWidth * 4 && Math.abs(box.pos.y - box.pos.y) < boxHeight * 4) {
      if (!box.area) {
        box.use(k.area());
      }
    } else {
      box.unuse("area");
    }
  })

});


k.onCollide("primary-ball", "box", (ball, box) => {
  if (box.group === "primary") {
    ball.hspeed = -ball.hspeed;
    ball.vspeed = -ball.hspeed;
    box.color = primaryColor;
    box.group = "secondary"
  }

})

k.onCollide("secondary-ball", "box", (ball, box) => {
  if (box.group === "secondary") {
    ball.hspeed = -ball.hspeed;
    ball.vspeed = -ball.hspeed;
    box.color = secondaryColor;
    box.group = "primary"
  }
})


