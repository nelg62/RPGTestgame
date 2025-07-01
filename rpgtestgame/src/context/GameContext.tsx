"use client";
import { Character } from "@/app/types/player";
import { Room } from "@/app/types/room";
import { attack } from "@/app/utils/battle";
import { generateMaze } from "@/app/utils/generateMap";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Turn = "player" | "monster";

type GameContextType = {
  remainingEnemies: Character[];
  player: Character;
  currentEnemy: Character | null;
  handlePlayerAttack: () => void;
  log: string[];
  turn: Turn;
  inCombat: boolean;
  setInCombat: (value: boolean) => void;
  resetGame: () => void;
  setCurrentEnemy: (value: Character | null) => void;
  attackingEnemy: Character | null;
  exploringDungeon: boolean;
  enterDungeon: () => void;
  map: Room[];
  currentRoomIndex: number;
  enterRoom: (index: number) => void;
  roomLocked: boolean;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// create enemies
const enemyPool: Character[] = [
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

export const GameProvider = ({ children }: { children: ReactNode }) => {
  //   create the player
  const [player, setPlayer] = useState<Character>({
    name: "Hero",
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: "/user.png",
  });

  //   set enemies in to a state
  const [remainingEnemies, setRemainingEnemies] =
    useState<Character[]>(enemyPool);
  //  get random enemy and set as curernt enemy
  const [currentEnemy, setCurrentEnemy] = useState<Character | null>(
    getRandomEnemy(enemyPool)
  );

  const [attackingEnemy, setAttackingEnemy] = useState<Character | null>(null);

  //   state to handle if in combat or not
  const [inCombat, setInCombat] = useState(false);
  //   handle player and monster turns
  const [turn, setTurn] = useState<Turn>("player");
  //   state for logs
  const [log, setLog] = useState<string[]>([]);

  const [exploringDungeon, setExploringDungeon] = useState(false);

  const [map, setMap] = useState<Room[]>([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const [roomLocked, setRoomLocked] = useState(false);

  // get a random ememy
  function getRandomEnemy(pool: Character[]): Character | null {
    if (pool.length === 0) return null;
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
  }

  //  function for creating and setting the logs in state
  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev]);
  };

  //   attack all enemeys in the enemy array
  const handlePlayerAttack = () => {
    // if no target and not player turn then do nothing
    if (turn !== "player" || !currentEnemy || player.hp <= 0) return;

    // attack the enemy with attack function and return message
    const { updatedTarget, message } = attack(player, currentEnemy);

    setCurrentEnemy(updatedTarget);
    addLog(message);

    const updatedEnemies = remainingEnemies.map((enemy) =>
      enemy.name === currentEnemy.name ? updatedTarget : enemy
    );
    setRemainingEnemies(updatedEnemies);

    // if monster still has health
    if (updatedTarget.hp > 0) {
      // set the turn to monster
      setTurn("monster");
      //   wait a bit and then call handlemonster turn function to attack
      setTimeout(() => {
        handleMonsterTurn();
      }, 1000);
    } else {
      // if monster has no health
      addLog(`✅ ${currentEnemy.name} was defeated!`);

      const updatedPool = remainingEnemies.filter(
        (enemy) => enemy.name !== currentEnemy.name
      );
      setRemainingEnemies(updatedPool);

      if (updatedPool.length > 0) {
        const nextEnemy = getRandomEnemy(updatedPool);
        setCurrentEnemy(nextEnemy);
        setTurn("player");
      } else {
        // if there are no more enemies all defeated and end combat
        addLog("🎉 You defeated all the enemies!");
        setCurrentEnemy(null);
        setInCombat(false);
      }
    }
  };

  //   monster attack
  //   const handleMonsterTurn = (enemy: Character) => {
  //     const { updatedTarget, message } = attack(enemy, player);
  //     setPlayer(updatedTarget);
  //     addLog(message);

  //     // check if player health is more then 0
  //     if (updatedTarget.hp > 0) {
  //       setTurn("player");
  //     } else {
  //       addLog("You were defeated");
  //       setInCombat(false);
  //     }
  //   };

  // random monster attacks
  const handleMonsterTurn = () => {
    if (remainingEnemies.length === 0) return;

    const randomEnemy = getRandomEnemy(remainingEnemies);
    if (!randomEnemy) return;

    setAttackingEnemy(randomEnemy);

    const { updatedTarget, message } = attack(randomEnemy, player);
    setPlayer(updatedTarget);
    addLog(`${randomEnemy.name} attacks! ` + message);

    // check if player health is more then 0
    if (updatedTarget.hp > 0) {
      setTimeout(() => {
        setAttackingEnemy(null);
        setTurn("player");
      }, 500);
    } else {
      addLog("You were defeated");
      setAttackingEnemy(null);
      setInCombat(false);
    }
  };

  const enterDungeon = () => {
    setExploringDungeon(true);
    setMap(generateMaze());
  };

  const enterRoom = (index: number) => {
    console.log("map", map);

    const newMap = [...map];
    const room = newMap[index];
    console.log("room", room);

    room.visited = true;
    setMap(newMap);
    setCurrentRoomIndex(index);

    if (
      (room.type === "enemy" && room.enemy) ||
      (room.type === "boss" && room.enemy)
    ) {
      addLog(`⚔️ You encountered a ${room.enemy.name}!`);
      // setRemainingEnemies([room.enemy]);
      setAttackingEnemy(remainingEnemies[0]);
      setTurn("player");
      setInCombat(true);
      setRoomLocked(true);
    } else {
      setInCombat(false);
      setRoomLocked(false);
      if (room.type === "treasure") {
        addLog("🎁 You found a treasure chest! (+10 HP)");
        setPlayer((prev) => ({
          ...prev,
          hp: Math.min(prev.hp + 10, prev.maxHp),
        }));

        room.type = "empty";
      } else if (room.type === "healing") {
        addLog("💖 You found a healing spring! (+20 HP)");
        setPlayer((prev) => ({
          ...prev,
          hp: Math.min(prev.hp + 20, prev.maxHp),
        }));

        room.type = "empty";
      } else {
        addLog("🌾 The room is empty.");
      }
      setInCombat(false);
      setMap(newMap);
    }
  };

  const resetGame = () => {
    const newPool = [...enemyPool];
    const firstEnemy = getRandomEnemy(newPool);

    setPlayer({
      name: "Hero",
      hp: 100,
      maxHp: 100,
      attack: 10,
      image: "/user.png",
    });
    setRemainingEnemies(newPool);
    setCurrentEnemy(firstEnemy);
    setInCombat(false);
    setTurn("player");
    setLog([]);
  };

  return (
    <GameContext.Provider
      value={{
        remainingEnemies,
        player,
        currentEnemy,
        handlePlayerAttack,
        log,
        turn,
        inCombat,
        setInCombat,
        resetGame,
        setCurrentEnemy,
        attackingEnemy,
        exploringDungeon,
        enterDungeon,
        map,
        currentRoomIndex,
        enterRoom,
        roomLocked,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
