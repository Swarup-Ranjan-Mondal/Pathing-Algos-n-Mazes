export function heuristic(a, b) {
  /* Manhatten Distance */
  const dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  return dist;
}

export function getDirection(current, next) {
  if (current.y > next.y) {
    return "top";
  } else if (current.x < next.x) {
    return "right";
  } else if (current.y < next.y) {
    return "bottom";
  } else if (current.x > next.x) {
    return "left";
  }
}

export function generateId(num) {
  let charSet = [],
    id = "";

  for (let i = 33; i <= 126; i++) {
    const char = String.fromCharCode(i);
    charSet.push(char);
  }

  for (let i = 0; i < num; i++) {
    let randIndex = Math.floor(Math.random() * charSet.length);
    id += charSet[randIndex];
    charSet.splice(randIndex, 1);
  }

  return id;
}

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
