const input = await Bun.file("day2/input.txt").text();
const lines = input.split("\n");

type Colour = "red" | "green" | "blue";

const gameMap = new Map<number, Map<Colour, number>>();

for (const line of lines) {
  const [game, rounds] = line.split(":");
  const gameId = Number(game.split(" ")[1]);
  console.log(gameId);
  const roundsArray = rounds.trim().split(";");
  const roundMap = new Map<Colour, number>();
  for (const round of roundsArray) {
    const takes = round.split(",");
    for (const take of takes) {
      let [value, color] = take.trim().split(" ");
      const colour = color as Colour;
      if (roundMap.has(colour)) {
        roundMap.set(colour, Math.max(roundMap.get(colour)!, Number(value)));
        continue;
      }
      roundMap.set(colour, Number(value));
    }
  }
  gameMap.set(gameId, roundMap);
}

const realBag = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

let totalGameIds = 0;

for (const [gameId, roundMap] of gameMap) {
  let impossible = false;
  for (const [color, value] of roundMap) {
    if (value > realBag[color]) {
      impossible = true;
      break;
    }
  }

  if (!impossible) {
    totalGameIds += gameId;
  }
}

console.log(totalGameIds);
