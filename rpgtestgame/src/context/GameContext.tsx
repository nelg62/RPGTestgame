"use client";
import { Character } from "@/app/types/player";
import { attack } from "@/app/utils/battle";
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
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// create enemies
const enemyPool: Character[] = [
  { name: "Bat", hp: 25, maxHp: 25, attack: 4, image: "/user.png" },
  { name: "Zombie", hp: 35, maxHp: 35, attack: 6, image: "/user.png" },
  { name: "Skeleton", hp: 40, maxHp: 40, attack: 7, image: "/user.png" },
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

  //   state to handle if in combat or not
  const [inCombat, setInCombat] = useState(false);
  //   handle player and monster turns
  const [turn, setTurn] = useState<Turn>("player");
  //   state for logs
  const [log, setLog] = useState<string[]>([]);

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
        handleMonsterTurn(updatedTarget);
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
  const handleMonsterTurn = (enemy: Character) => {
    const { updatedTarget, message } = attack(enemy, player);
    setPlayer(updatedTarget);
    addLog(message);

    // check if player health is more then 0
    if (updatedTarget.hp > 0) {
      setTurn("player");
    } else {
      addLog("You were defeated");
      setInCombat(false);
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
