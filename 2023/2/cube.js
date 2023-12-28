import fs from "fs/promises";
import path from "path";

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

// Game
// {
//   id: 1,
//   hands: [
//     { red: 1, green: 2, blue: 3 },
//     { red: 4, blue: 5 }
//   ]
// }

export function parseGame(gameLineStr) {
  const re = /^Game (\d+): (.*)$/;
  const [, idStr, gameStr] = gameLineStr.match(re);

  const id = parseInt(idStr);

  const hands = gameStr.split("; ").map((hand) =>
    hand.split(", ").reduce((acc, colourStr) => {
      const [count, name] = colourStr.split(" ");
      return {
        ...acc,
        [name]: parseInt(count),
      };
    }, {})
  );

  return {
    id,
    hands,
  };
}

export function isPossible(hands) {
  return hands.reduce(
    (acc, hand) =>
      acc &&
      Object.entries(hand).reduce(
        (acc, [colour, count]) => acc && count <= maxCubes[colour],
        true
      ),
    true
  );
}

export function sumPossible(games) {
  return games.reduce((acc, g) => acc + (isPossible(g.hands) ? g.id : 0), 0);
}

export function minCubes(hands) {
  return hands.reduce(
    (acc, hand) => {
      const max = (colour) => Math.max(hand[colour] ?? 0, acc[colour]);
      return {
        red: max("red"),
        green: max("green"),
        blue: max("blue"),
      };
    },
    { red: 0, green: 0, blue: 0 }
  );
}

export function gameMinPower(hands) {
  const min = minCubes(hands);
  return min.red * min.green * min.blue;
}

export function sumPowers(games) {
  return games.reduce((acc, g) => acc + gameMinPower(g.hands), 0);
}

const input = await fs.readFile(path.resolve("2023/2/input.txt"), "utf-8");
const games = input.split("\n").map((g) => parseGame(g));

console.log(`Sum of possible game IDs: ${sumPossible(games)}`);
console.log(`Sum of game min powers: ${sumPowers(games)}`);
