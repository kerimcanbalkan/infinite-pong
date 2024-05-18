import {
  AnchorComp,
  AreaComp,
  CircleComp,
  ColorComp,
  GameObj,
  PosComp,
  RectComp,
} from "kaboom";

export type Box = GameObj<Partial<AreaComp> & PosComp & RectComp & ColorComp & {
  group: string;
}>

export type Ball = GameObj<PosComp & CircleComp & ColorComp & AreaComp & AnchorComp & {
  hspeed: number;
  vspeed: number;
}>
