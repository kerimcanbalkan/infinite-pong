import { k } from "./kaboomCtx";

export const scale = 4;

export const boxWidth = k.width() / 30;
export const boxHeight = k.height() / 15;
export const numBoxesX = Math.ceil(k.width() / boxWidth / 2);
export const numBoxesY = Math.ceil(k.height() / boxHeight);

export const ballRadius = boxWidth / 8;
export const ballSpeedH = 200;
export const ballSpeedV = 100;

export const primaryColor = k.Color.fromArray([169, 4, 50])
export const secondaryColor = k.Color.fromArray([253, 185, 34])


