const { strictEqual } = require('./util/test');

// https://www.codewars.com/kata/52423db9add6f6fc39000354
//
// Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.
//
// The rules of the game are:
//
//   Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
//   Any live cell with more than three live neighbours dies, as if by overcrowding.
//   Any live cell with two or three live neighbours lives on to the next generation.
//   Any dead cell with exactly three live neighbours becomes a live cell.
//   Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore Neighborhood). The universe is infinite
//   in both the x and y dimensions and all cells are initially dead - except for those specified in the arguments.
//   The return value should be a 2d array cropped around all the living cells.
//   (If there are no living cells, then return [[]].)
//
// For illustration purposes, 0 and 1 will be represented as ░░ and ▓▓ blocks respectively
// You can take advantage of the htmlize function to get a text representation of the universe, e.g.:
//
// console.log(htmlize(cells));

// ▓░░
// ░▓▓
// ▓▓░
//
// ░▓░
// ░░▓
// ▓▓▓


function htmlize(arr) {
  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const line = new Array(arr[i].length);
    for (let j = 0; j < arr[i].length; j++) {
      // line[j] = arr[i][j] === 0 ? '░░' : '▓▓';
      line[j] = arr[i][j] === 0 ? '░' : '▓';
    }
    result[i] = line.join('') + '\n';
  }
  return result.join('');
}

// console.log('Glider \n' + htmlize([[1, 0, 0], [0, 1, 1], [1, 1, 0]]));

function getNeighboursCount(cells, i, j) {
  let neighboursCount = 0;
  for (let row = i - 1; row <= i + 1; row++) {
    if (row < 0) {
      continue;
    }
    if (row >= cells.length) {
      break;
    }
    for (let col = j - 1; col <= j + 1; col++) {
      if ((row === i) && (col === j)) {
        continue;
      }
      if (col < 0) {
        continue;
      }
      if (col >= cells.at(0).length) {
        break;
      }
      if (cells[row][col]) {
        neighboursCount = neighboursCount + 1;
      }
    }
  }
  return neighboursCount;
}

function getGeneration(cells, generations) {
  if (generations === 0) {
    return cells.slice().map((arr) => arr.slice());
  }

  let prevGeneration = cells.slice().map((arr) => arr.slice());
  let nextGeneration;
  let hasAlive;

  for (let genCount = 0; genCount < generations; genCount++) {
    hasAlive = false;
    nextGeneration = new Array(cells.length)
      .fill(null)
      .map(() => [new Array(cells[0].length).fill(null)]);

    for (let i = 0; i < prevGeneration.length; i++) {
      for (let j = 0; j < prevGeneration[i].length; j++) {
        const neighboursCount = getNeighboursCount(prevGeneration, i, j);

        //   Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        //   Any live cell with more than three live neighbours dies, as if by overcrowding.
        if ((neighboursCount < 2) || (neighboursCount > 3)) {
          nextGeneration[i][j] = 0;
        }

        //   Any live cell with two or three live neighbours lives on to the next generation.
        else if (neighboursCount === 2) {
          nextGeneration[i][j] = prevGeneration[i][j] === 1 ? 1 : 0;
        }

        //   Any dead cell with exactly three live neighbours becomes a live cell.
        else if (neighboursCount === 3) {
          nextGeneration[i][j] = 1;
        }

        hasAlive |= nextGeneration[i][j] === 1;
      }
    }
    prevGeneration = nextGeneration;
  }

  // If there are no living cells, then return [[]].
  return hasAlive ? nextGeneration : [[]];
}

// const src1 = [[1, 0, 0], [0, 1, 1], [1, 1, 0]];
// const target1 = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
// const resp1 = getGeneration(src1, 1);
// strictEqual(resp1, target1, `Expect \n${htmlize(resp1)} to equal \n${htmlize(target1)}`);

// const src2 = [[1, 0, 0], [0, 1, 1], [1, 1, 0]];
// const target2 = [[1, 0, 1], [0, 1, 1], [0, 1, 0]];
// const resp2 = getGeneration(src2, 2);
// strictEqual(resp2, target2, `Expect \n${htmlize(resp2)} to equal \n${htmlize(target2)}`);

// Debug
const src2 = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
console.log('src2= \n' + htmlize(src2));
const target2 = [[1, 0, 1], [0, 1, 1], [0, 1, 0]];
const resp2 = getGeneration(src2, 1);
strictEqual(resp2, target2, `Expect \n${htmlize(resp2)} to equal \n${htmlize(target2)}`);

// const oneGlider = [[1, 0, 0], [0, 1, 1], [1, 1, 0]];
// const sameResp = getGeneration(oneGlider, 0);
// strictEqual(sameResp, oneGlider, 'Zero iterations');
//
// const emptyGlider = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
// const emptyResp = getGeneration(emptyGlider, 1);
// strictEqual(emptyResp, [[]], 'Empty response [ [] ]');
