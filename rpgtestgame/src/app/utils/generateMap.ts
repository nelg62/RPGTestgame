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

  for (const room of rooms) {
    if (room.type === "start" || room.type === "boss") continue;
    const rand = Math.random();
    if (rand < 0.2) room.type = "healing";
    else if (rand < 0.4) room.type = "treasure";
    else if (rand < 0.7) {
      room.type = "enemy";
      const enemyPool = [
        {
          name: "Bat",
          hp: 25,
          maxHp: 25,
          attack: 4,
          image: "/todd-cravens-IY1sRDxNWN4-unsplash.jpg",
        },
        {
          name: "Zombie",
          hp: 35,
          maxHp: 35,
          attack: 6,
          image: "/julien-tromeur-6-adg66qleM-unsplash.jpg",
        },
        {
          name: "Skeleton",
          hp: 40,
          maxHp: 40,
          attack: 7,
          image: "/sabina-music-rich-OJy0JHnoUZQ-unsplash.jpg",
        },
      ];
      room.enemy = enemyPool[Math.floor(Math.random() * enemyPool.length)];
    } else {
      room.type = "empty";
    }
  }
  console.log("rooms", rooms);

  return rooms;
};
