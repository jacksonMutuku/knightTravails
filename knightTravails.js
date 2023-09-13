class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

function isInsideBoard(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function knightMoves(start, end) {
  const dx = [2, 2, 1, 1, -1, -1, -2, -2];
  const dy = [1, -1, 2, -2, 2, -2, 1, -1];
  const queue = new Queue();
  const visited = new Array(8).fill(null).map(() => new Array(8).fill(false));
  const path = [];

  queue.enqueue({ x: start[0], y: start[1], moves: 0, path: [start] });
  visited[start[0]][start[1]] = true;

  while (!queue.isEmpty()) {
    const { x, y, moves, pathSoFar } = queue.dequeue();

    if (x === end[0] && y === end[1]) {
      return `You made it in ${moves} moves! Here's your path:\n${pathSoFar
        .map((point) => `[${point.join(", ")}]`)
        .join("\n")}`;
    }

    for (let i = 0; i < 8; i++) {
      const newX = x + dx[i];
      const newY = y + dy[i];

      if (isInsideBoard(newX, newY) && !visited[newX][newY]) {
        visited[newX][newY] = true;
        const newPath = [...pathSoFar, [newX, newY]];
        queue.enqueue({ x: newX, y: newY, moves: moves + 1, path: newPath });
      }
    }
  }

  return "No valid path found!";
}

// // Example usage:
// console.log(knightMoves([3, 3], [4, 3]));
