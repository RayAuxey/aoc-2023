const alphaDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const input = await Bun.file("day1/input1.txt").text();
const inputArray = input.split("\n");

function getWordIndices(word: string) {
  const indices: number[] = [];
  for (let i = 0; i < alphaDigits.length; i++) {
    for (let j = 0; j < word.length; j++) {
      const index = word.indexOf(alphaDigits[i], j);
      indices[index] = i + 1;
    }
  }
  return indices;
}

function getNumberIndices(word: string) {
  const indices: number[] = [];
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (char >= "0" && char <= "9") {
      indices[i] = parseInt(char);
    }
  }
  return indices;
}

function mergeIndices(wordIndices: number[], numberIndices: number[]) {
  let length = wordIndices.length;
  if (numberIndices.length > length) {
    length = numberIndices.length;
  }

  const merged: number[] = [];
  for (let i = 0; i < length; i++) {
    if (wordIndices[i] !== undefined) {
      merged[i] = wordIndices[i];
    } else if (numberIndices[i] !== undefined) {
      merged[i] = numberIndices[i];
    }
  }
  return merged;
}

function getFinalNumber(mergedIndices: number[]) {
  let firstDigit: number = 0;
  let lastDigit: number = 0;
  for (let i = 0; i < mergedIndices.length; i++) {
    if (mergedIndices[i] !== undefined) {
      firstDigit = mergedIndices[i];
      break;
    }
  }
  for (let i = mergedIndices.length - 1; i >= 0; i--) {
    if (mergedIndices[i] !== undefined) {
      lastDigit = mergedIndices[i];
      break;
    }
  }

  return Number(`${firstDigit}${lastDigit}`);
}

function getNumberFromWord(word: string) {
  const wordIndices = getWordIndices(word);
  const numberIndices = getNumberIndices(word);
  const mergedIndices = mergeIndices(wordIndices, numberIndices);
  return getFinalNumber(mergedIndices);
}

let total = 0;
for (const line of inputArray) {
  const number = getNumberFromWord(line);
  total += number;
}
console.log("Total", total);
