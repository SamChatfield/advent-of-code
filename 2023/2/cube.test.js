import {
  parseGame,
  isPossible,
  sumPossible,
  minCubes,
  gameMinPower,
  sumPowers,
} from "./cube";

describe("cube", () => {
  const games = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ].map((g) => parseGame(g));

  describe("parseGame", () => {
    test("parses line of text to game object array", () => {
      expect(
        parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
      ).toEqual({
        id: 1,
        hands: [
          { blue: 3, red: 4 },
          { red: 1, green: 2, blue: 6 },
          { green: 2 },
        ],
      });
    });
  });

  describe("isPossible", () => {
    test.each([
      ["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", true],
      [
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        true,
      ],
      [
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        false,
      ],
      [
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        false,
      ],
      ["Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green", true],
    ])("input of %s returns %s", (gameLine, expected) => {
      expect(isPossible(parseGame(gameLine).hands)).toEqual(expected);
    });
  });

  describe("sumPossible", () => {
    expect(sumPossible(games)).toEqual(8);
  });

  describe("minCubes", () => {
    test.each([
      [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        { red: 4, green: 2, blue: 6 },
      ],
      [
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        { red: 1, green: 3, blue: 4 },
      ],
      [
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        { red: 20, green: 13, blue: 6 },
      ],
      [
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        { red: 14, green: 3, blue: 15 },
      ],
      [
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        { red: 6, green: 3, blue: 2 },
      ],
    ])("input of %s returns %s", (gameLine, expected) => {
      const game = parseGame(gameLine);
      expect(minCubes(game.hands)).toEqual(expected);
    });
  });

  describe("gameMinPower", () => {
    test.each([
      ["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", 48],
      ["Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", 12],
      [
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        1560,
      ],
      [
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        630,
      ],
      ["Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green", 36],
    ])("input of %s returns %s", (gameLine, expected) => {
      const game = parseGame(gameLine);
      expect(gameMinPower(game.hands)).toEqual(expected);
    });
  });

  describe("sumPowers", () => {
    expect(sumPowers(games)).toEqual(2286);
  });
});
