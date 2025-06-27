"use client";
import { Character } from "@/app/types/player";
import { attack } from "@/app/utils/battle";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Turn = "player" | "monster";

type GameContextType = {
  player: Character;
  currentEnemy: Character;
  handlePlayerAttack: () => void;
  log: string[];
  turn: Turn;
  inCombat: boolean;
  setInCombat: (value: boolean) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const enemyPool: Character[] = [
  { name: "Bat", hp: 25, maxHp: 25, attack: 4, image: "/user.png" },
  { name: "Zombie", hp: 35, maxHp: 35, attack: 6, image: "/user.png" },
  { name: "Skeleton", hp: 40, maxHp: 40, attack: 7, image: "/user.png" },
];

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayer] = useState<Character>({
    name: "Hero",
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: "/user.png",
  });

  const [enemies, setEnemies] = useState<Character[]>(enemyPool);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const currentEnemy = enemies[currentEnemyIndex];

  const [inCombat, setInCombat] = useState(false);
  const [turn, setTurn] = useState<Turn>("player");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev]);
  };

  const handlePlayerAttack = () => {
    if (turn !== "player" || !currentEnemy || player.hp <= 0) return;

    const { updatedTarget, message } = attack(player, currentEnemy);
    const newEnemies = [...enemies];
    newEnemies[currentEnemyIndex] = updatedTarget;
    setEnemies(newEnemies);
    addLog(message);

    if (updatedTarget.hp > 0) {
      setTurn("monster");
      setTimeout(() => {
        handleMonsterTurn(updatedTarget);
      }, 1000);
    } else {
      addLog(`✅ ${currentEnemy.name} was defeated!`);

      if (currentEnemyIndex + 1 < enemies.length) {
        setCurrentEnemyIndex((i) => i + 1);
        setTurn("player");
      } else {
        addLog("🎉 You defeated all the enemies!");
        setInCombat(false);
      }
    }
  };

  const handleMonsterTurn = (enemy: Character) => {
    const { updatedTarget, message } = attack(enemy, player);
    setPlayer(updatedTarget);
    addLog(message);

    if (updatedTarget.hp > 0) {
      setTurn("player");
    }
  };

  const resetGame = () => {
    setPlayer({
      name: "Hero",
      hp: 100,
      maxHp: 100,
      attack: 10,
      image: "/user.png",
    });
    setEnemies(enemyPool);
    setCurrentEnemyIndex(0);
    setInCombat(false);
    setTurn("player");
    setLog([]);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        currentEnemy,
        handlePlayerAttack,
        log,
        turn,
        inCombat,
        setInCombat,
        resetGame,
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
