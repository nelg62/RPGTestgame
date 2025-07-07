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

  const removeWallsBetween = (a: number, b: number) => {
    const ax = a % MAP_WIDTH;
    const ay = Math.floor(a / MAP_WIDTH);
    const bx = b % MAP_WIDTH;
    const by = Math.floor(b / MAP_WIDTH);

    if (ax === bx) {
      if (ay < by) {
        rooms[a].walls!.bottom = false;
        rooms[b].walls!.top = false;
      } else {
        rooms[a].walls!.top = false;
        rooms[b].walls!.bottom = false;
      }
    } else if (ay === by) {
      if (ax < bx) {
        rooms[a].walls!.right = false;
        rooms[b].walls!.left = false;
      } else {
        rooms[a].walls!.left = false;
        rooms[b].walls!.right = false;
      }
    }
  };

  const getNeighbors = (i: number): number[] => {
    const neighbors: number[] = [];
    const x = i % MAP_WIDTH;
    const y = Math.floor(i / MAP_WIDTH);

    const coordsToIndex = (x: number, y: number) => y * MAP_WIDTH + x;

    if (x > 0) neighbors.push(coordsToIndex(x - 1, y));
    if (x < MAP_WIDTH - 1) neighbors.push(coordsToIndex(x + 1, y));
    if (y > 0) neighbors.push(coordsToIndex(x, y - 1));
    if (y < MAP_HEIGHT - 1) neighbors.push(coordsToIndex(x, y + 1));

    return neighbors;
  };

  const visited = new Set<number>();

  const dfs = (i: number) => {
    visited.add(i);
    const neighbors = getNeighbors(i).filter((n) => !visited.has(n));
    // Randomize order
    for (const n of neighbors.sort(() => Math.random() - 0.5)) {
      if (!visited.has(n)) {
        rooms[i].connections.push(n);
        rooms[n].connections.push(i); // bidirectional
        removeWallsBetween(i, n);
        dfs(n);
      }
    }
  };

  dfs(0);

  rooms[0].type = "start";

  const distances = Array(totalRooms).fill(Infinity);
  const queue: number[] = [0];
  distances[0] = 0;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    for (const neighbor of rooms[curr].connections) {
      if (distances[neighbor] === Infinity) {
        distances[neighbor] = distances[curr] + 1;
        queue.push(neighbor);
      }
    }
  }

  const farthest = distances.reduce(
    (farthestIdx, dist, idx) =>
      dist > distances[farthestIdx] ? idx : farthestIdx,
    0
  );

  rooms[farthest].type = "boss";
  rooms[farthest].enemy = {
    name: "Dark Lord",
    hp: 100,
    maxHp: 100,
    attack: 12,
    image: "/user.png",
    gold: 100,
    emoji: "🕴",
  };

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
          gold: 10,
          emoji: "🦇",
        },
        {
          name: "Zombie",
          hp: 35,
          maxHp: 35,
          attack: 6,
          image: "/julien-tromeur-6-adg66qleM-unsplash.jpg",
          gold: 15,
          emoji: "🧟",
        },
        {
          name: "Skeleton",
          hp: 40,
          maxHp: 40,
          attack: 7,
          image: "/sabina-music-rich-OJy0JHnoUZQ-unsplash.jpg",
          gold: 20,
          emoji: "💀🦴",
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
