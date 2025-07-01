import { Character } from "./player";

export type RoomType =
  | "start"
  | "empty"
  | "enemy"
  | "treasure"
  | "healing"
  | "boss";

export interface Room {
  id: number;
  type: RoomType;
  visited: boolean;
  enemy?: Character;
  connections: number[];
  walls?: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}
