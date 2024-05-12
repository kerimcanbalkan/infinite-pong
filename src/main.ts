loadSprite('tiles', '/sprites/tiles.png', {
  sliceX: 6,
  sliceY: 1,
  anims: {
    "greenbox": 0,
    "purplebox": 1,
  }
});


add([
  sprite("tiles", { anim: "greenbox" }),
])


const boxWidth = 32; // Width of each box
const boxHeight = 32; // Height of each box
const numBoxesX = Math.ceil(width() / boxWidth / 2);
const numBoxesY = Math.ceil(height() / boxHeight);

for (let y = 0; y < numBoxesY; y++) {
  for (let x = 0; x < numBoxesX; x++) {
    add([
      sprite("tiles", { anim: "greenbox" }),
      pos(x * boxWidth, y * boxHeight),
      scale(2),
      "box"
    ]);
  }
}

for (let y = 0; y < numBoxesY; y++) {
  for (let x = 0; x < numBoxesX; x++) {
    add([
      sprite("tiles", { anim: "purplebox" }),
      pos((x + numBoxesX) * boxWidth, y * boxHeight),
      scale(2),
      "box"
    ]);
  }
}
