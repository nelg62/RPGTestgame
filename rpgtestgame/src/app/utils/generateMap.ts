import { Room } from "../types/room";

export const MAP_WIDTH = 3;
export const MAP_HEIGHT = 3;

export const generateMaze = (): Room[] => {
  const totalRooms = MAP_WIDTH * MAP_HEIGHT;
  const rooms: Room[] = Array.from({ length: totalRooms }, (_, i) => ({
    id: i,
    type: "empty",
    visited: false,
    connections: [],
    walls: {
      top: true,
      right: true,
      bottom: true,
      left: true,
    },
  }));

  return rooms;
};
