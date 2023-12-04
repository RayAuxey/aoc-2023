const input = await Bun.file("day1/input1.txt").text();
const inputArray = input.split("\n");

const calibrationValuesTotal = inputArray.reduce((acc, curr) => {
  const firstDigit = curr.split("").filter((c) => c > "0" && c <= "9")[0];
  const lastDigit = curr
    .split("")
    .filter((c) => c > "0" && c <= "9")
    .reverse()[0];
  const value = Number(`${firstDigit}${lastDigit}`);
  return acc + value;
}, 0);

console.log(calibrationValuesTotal);
