import fs from "fs/promises";
import path from "path";

const re = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function calibrationLine(lineStr) {
  const matches = [...lineStr.matchAll(re)];
  let [, firstDigit] = matches[0];
  let [, lastDigit] = matches.slice(-1)[0];

  firstDigit = numberMap[firstDigit] ?? firstDigit;
  lastDigit = numberMap[lastDigit] ?? lastDigit;

  return parseInt(`${firstDigit}${lastDigit}`);
}

export function calibration(input) {
  return input
    .split("\n")
    .reduce((acc, line) => acc + calibrationLine(line), 0);
}

const input = await fs.readFile(path.resolve("./2023/1/input.txt"), "utf-8");

const answer = calibration(input);

console.log(`Answer: ${answer}`);
