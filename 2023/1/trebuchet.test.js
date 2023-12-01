import { calibration, calibrationLine } from "./trebuchet";

describe("trebuchet", () => {
  describe("calibrationLine ", () => {
    test.each([
      ["1abc2", 12],
      ["pqr3stu8vwx", 38],
      ["a1b2c3d4e5f", 15],
      ["treb7uchet", 77],
    ])("input of %s returns %i", (input, expected) => {
      expect(calibrationLine(input)).toEqual(expected);
    });

    test.each([
      ["two1nine", 29],
      ["eightwothree", 83],
      ["abcone2threexyz", 13],
      ["xtwone3four", 24],
      ["4nineeightseven2", 42],
      ["zoneight234", 14],
      ["7pqrstsixteen", 76],
      ["eighthree", 83],
      ["sevenine", 79],
    ])("input of %s returns %i", (input, expected) => {
      expect(calibrationLine(input)).toEqual(expected);
    });
  });

  describe("calibration", () => {
    test("adds lines correctly part one", () => {
      const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

      expect(calibration(input)).toEqual(142);
    });

    test("adds lines correctly part two", () => {
      const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

      expect(calibration(input)).toEqual(281);
    });
  });
});
