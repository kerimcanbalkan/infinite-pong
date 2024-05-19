import { GameObj } from "kaboom";
import { numBoxesY, numBoxesX, boxHeight, boxWidth, secondaryColor, primaryColor, ballRadius, ballSpeedH, ballSpeedV } from "./constants";
import { k } from "./kaboomCtx";

const primaryBoxes: GameObj[] = [];
const secondaryBoxes: GameObj[] = [];

for (let i = 0; i < numBoxesY; i++) {
  for (let j = 0; j < numBoxesX; j++) {
    // yellow
    const box1 = k.add([
      k.rect(boxWidth, boxHeight),
      k.pos(j * boxWidth, i * boxHeight),
      k.color(primaryColor),
      "box",
      {
        group: "primary"
      }

    ]
    )
    primaryBoxes.push(box1);
    // red
    const box2 = k.add([
      k.rect(boxWidth, boxHeight),
      k.color(secondaryColor),
      k.pos((j + numBoxesX) * boxWidth, i * boxHeight),
      "box",
      {
        group: "secondary"
      }

    ]);
    secondaryBoxes.push(box2);
  }
}



k.add([
  k.pos(k.width() / 4, k.height() / 2),
  k.circle(ballRadius),
  k.color(secondaryColor),
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
  k.color(primaryColor),
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

});

k.onUpdate("secondary-ball", (ball) => {
  secondaryBoxes.forEach(box => {
    if (Math.abs(box.pos.x - ball.pos.x) < boxWidth * 2 && Math.abs(box.pos.y - box.pos.y) < boxHeight * 2) {
      if (!box.area) {
        box.use(k.area());
      }
    } else {
      box.unuse("area");
    }
  })

})

k.onUpdate("primary-ball", (ball) => {
  primaryBoxes.forEach(box => {
    if (Math.abs(box.pos.x - ball.pos.x) < boxWidth * 2 && Math.abs(box.pos.y - box.pos.y) < boxHeight * 2) {
      if (!box.area) {
        box.use(k.area());
      }
    } else {
      box.unuse("area");
    }

  })

})


k.onCollide("primary-ball", "box", (ball, box: GameObj) => {
  if (box.group === "primary") {
    ball.hspeed = -ball.hspeed;
    ball.vspeed = -ball.hspeed;
    box.color = secondaryColor;
    box.group = "secondary"

    const index = primaryBoxes.indexOf(box);
    primaryBoxes.splice(index, 1);

    secondaryBoxes.push(box);
  }

})

k.onCollide("secondary-ball", "box", (ball, box: GameObj) => {
  if (box.group === "secondary") {
    ball.hspeed = -ball.hspeed;
    ball.vspeed = -ball.hspeed;
    box.color = primaryColor;
    box.group = "primary"

    const index = secondaryBoxes.indexOf(box);
    secondaryBoxes.splice(index, 1);

    primaryBoxes.push(box);
  }
})


