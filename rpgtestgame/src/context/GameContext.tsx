"use client";
import { Items } from "@/app/types/items";
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
  moveToRoom: (index: number | null) => void;
  roomLocked: boolean;
  inventory: Items[];
  // addToInventory: () => void;
  handleUseItem: (item: string) => void;
  handleBuyItem: (item: string) => void;
  handleLeaveCombat: () => void;
  handleLeaveDungeon: () => void;
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

const items: Items[] = [
  {
    name: "potion",
  },
];

export const GameProvider = ({ children }: { children: ReactNode }) => {
  console.log("GameProvider mounted");

  //   create the player
  const [player, setPlayer] = useState<Character>({
    name: "Hero",
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: "/user.png",
    gold: 100,
    emoji: "🧙‍♂️",
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

  const [inventory, setInventory] = useState<Items[]>([]);

  const [previousRoomIndex, setPreviousRoomIndex] = useState<number | null>(
    null
  );

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

  const getEnemyGold = () => {
    if (currentEnemy?.gold) {
      const loot = Math.floor(Math.random() * currentEnemy?.gold);
      console.log("loot", loot);
      setPlayer((prev) => ({
        ...prev,
        gold: prev.gold + loot,
      }));
      addLog(
        `💰 You have gained ${loot} Gold for defeating ${currentEnemy.name}`
      );
      return loot;
    }
  };

  //   attack all enemeys in the enemy array
  const handlePlayerAttack = () => {
    if (exploringDungeon) {
      handleDungeonPlayerAttack();
    } else {
      handleArenaPlayerAttack();
    }
  };

  const handleDungeonPlayerAttack = () => {
    if (turn !== "player" || !currentEnemy || player.hp <= 0) return;

    const { updatedTarget, message } = attack(player, currentEnemy);
    setCurrentEnemy(updatedTarget);
    addLog(message);

    const isBossRoom = map[currentRoomIndex]?.type === "boss";

    if (updatedTarget.hp > 0) {
      setTurn("monster");
      setTimeout(() => {
        handleMonsterTurn();
      }, 1000);
    } else {
      addLog(`✅ ${currentEnemy.name} was defeated!`);

      console.log(getEnemyGold());

      setRoomLocked(false);
      setInCombat(false);
      setCurrentEnemy(null);

      if (isBossRoom) {
        addLog("👑 You defeated the boss and won the game!");
        setInCombat(false);
        setExploringDungeon(false);
      } else {
        // Mark room as cleared
        setMap((prevMap) => {
          const updatedMap = [...prevMap];
          updatedMap[currentRoomIndex] = {
            ...updatedMap[currentRoomIndex],
            type: "empty",
            enemy: undefined,
          };
          return updatedMap;
        });

        addLog("🎉 You cleared the room!");
      }
    }
  };

  const handleArenaPlayerAttack = () => {
    if (turn !== "player" || !currentEnemy || player.hp <= 0) return;

    const { updatedTarget, message } = attack(player, currentEnemy);
    setCurrentEnemy(updatedTarget);
    addLog(message);

    const updatedEnemies = remainingEnemies.map((enemy) =>
      enemy.name === currentEnemy.name ? updatedTarget : enemy
    );
    setRemainingEnemies(updatedEnemies);

    if (updatedTarget.hp > 0) {
      setTurn("monster");
      setTimeout(() => {
        handleMonsterTurn();
      }, 1000);
    } else {
      addLog(`✅ ${currentEnemy.name} was defeated!`);
      console.log(getEnemyGold());

      const updatedPool = remainingEnemies.filter(
        (enemy) => enemy.name !== currentEnemy.name
      );
      setRemainingEnemies(updatedPool);

      if (updatedPool.length > 0) {
        const nextEnemy = getRandomEnemy(updatedPool);
        setCurrentEnemy(nextEnemy);
        setTurn("player");
      } else {
        addLog("🎉 You defeated all the enemies!");
        setCurrentEnemy(null);
        setInCombat(false);
      }
    }
  };

  // random monster attacks
  const handleMonsterTurn = () => {
    if (exploringDungeon) {
      handleDungeonMonsterTurn();
    } else {
      handleArenaMonsterTurn();
    }
  };

  const handleDungeonMonsterTurn = () => {
    if (!currentEnemy) return;

    setAttackingEnemy(currentEnemy);

    const { updatedTarget, message } = attack(currentEnemy, player);
    setPlayer(updatedTarget);
    addLog(`${currentEnemy.emoji} ${currentEnemy.name} attacks! ` + message);

    if (updatedTarget.hp > 0) {
      setTimeout(() => {
        setAttackingEnemy(null);
        setTurn("player");
      }, 500);
    } else {
      addLog("💀 You were defeated");
      setAttackingEnemy(null);
      setInCombat(false);
    }
  };

  const handleArenaMonsterTurn = () => {
    if (remainingEnemies.length === 0) return;

    const randomEnemy = getRandomEnemy(remainingEnemies);
    if (!randomEnemy) return;

    setAttackingEnemy(randomEnemy);

    const { updatedTarget, message } = attack(randomEnemy, player);
    setPlayer(updatedTarget);
    addLog(`${randomEnemy.emoji} ${randomEnemy.name} attacks! ` + message);

    if (updatedTarget.hp > 0) {
      setTimeout(() => {
        setAttackingEnemy(null);
        setTurn("player");
      }, 500);
    } else {
      addLog("💀 You were defeated");
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
    setPreviousRoomIndex(currentRoomIndex);

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
      setCurrentEnemy(room.enemy);
      setTurn("player");
      setInCombat(true);
      setRoomLocked(true);
    } else {
      setInCombat(false);
      setRoomLocked(false);
      if (room.type === "treasure") {
        addLog("🎁 You found a treasure chest! (+10 HP)");
        setInventory((prev) => [...prev, items[0]]);
        console.log("inventory", inventory);

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

  const moveToRoom = (nextRoomId: number | null) => {
    if (!nextRoomId) {
      return;
    }
    if (!map[currentRoomIndex].connections.includes(nextRoomId)) {
      addLog("❌ That room is not connected!");
      return;
    }
    enterRoom(nextRoomId);
  };

  const addToInventory = (number: number) => {
    setInventory((prev) => [...prev, items[number]]);
  };

  const handleBuyItem = (item: string) => {
    switch (item) {
      case "potion":
        if (player.gold >= 50) {
          addToInventory(0);
          setPlayer((prev) => ({
            ...prev,
            gold: prev.gold - 50,
          }));
          addLog(`You have bought a ${item}`);
        } else {
          addLog("Not enough gold");
        }

        break;
    }
  };

  const handleUseItem = (itemName: string) => {
    const itemIndex = inventory.findIndex((item) => item.name === itemName);
    if (itemIndex === -1) {
      addLog("Item not found in inventory");
      return;
    }

    switch (itemName) {
      case "potion":
        addLog("🎁 You Have used a potion! (+10 HP)");
        setPlayer((prev) => ({
          ...prev,
          hp: Math.min(prev.hp + 20, prev.maxHp),
        }));

        break;

      default:
        addLog("unknown Item");
        break;
    }

    setInventory((prev) => {
      const newInventory = [...prev];
      newInventory.splice(itemIndex, 1);
      return newInventory;
    });
  };

  const handleLeaveCombat = () => {
    const confirmed = confirm("Are you sure you want to run and leave combat?");
    if (!confirmed) return;

    addLog("🏃‍♂️ You fled from combat!");

    setCurrentEnemy(null);
    setInCombat(false);
    setRoomLocked(false);

    if (exploringDungeon) {
      if (previousRoomIndex !== null) {
        setCurrentRoomIndex(previousRoomIndex);
        addLog("🔙 You retreated to the previous room.");
      } else {
        addLog("⚠️ Could not retreat – no previous room found.");
      }
    } else {
      addLog("🔙 You returned to the arena/town.");
    }
  };

  const handleLeaveDungeon = () => {
    const confirmed = confirm("Are you sure you want to leave the dungeon?");
    if (!confirmed) return;

    addLog("🚪 You have left the dungeon.");
    setExploringDungeon(false);
    setInCombat(false);
    setCurrentEnemy(null);
    setMap([]);
    setCurrentRoomIndex(0);
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
      gold: 100,
      emoji: "🧙‍♂️",
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
        roomLocked,
        moveToRoom,
        inventory,
        // addToInventory,
        handleUseItem,
        handleBuyItem,
        handleLeaveCombat,
        handleLeaveDungeon,
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
