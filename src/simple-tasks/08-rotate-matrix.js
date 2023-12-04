const { deepEqual } = require('../util/test');

// Напишите функцию, которая принимает матрицу 3х3 и переворачивает на 90 градусов по часовой стрелке.
// **Дополнительно**: Напишите еще 2 функции, которые переворачивают матрицу на 180 и 270 градусов.
// ```
// [1, 2, 3]    [7, 4, 1]
// [4, 5, 6] -> [8, 5, 2]
// [7, 8, 9]    [9, 6, 3]
// ```
// **Input**: Number[][]
// **Output**: Number[][]

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

function rotate(source) {
  const result = source[0].map(() => []);
  // const result = [
  //   [0, 0, 0],
  //   [0, 0, 0],
  //   [0, 0, 0]
  // ];
  const SIZE = 3;
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      result[j][SIZE - 1 - i] = source[i][j];
    }
  }
  return result;
}

function rotate180(source) {
  return rotate(rotate(source));
}

function rotate270(source) {
  return rotate(rotate180(source));
}

const target90 = [
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
];

const target180 = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1]
];

const target270 = [
  [3, 6, 9],
  [2, 5, 8],
  [1, 4, 7]
];


deepEqual(rotate(matrix), target90);
deepEqual(rotate180(matrix), target180);
deepEqual(rotate270(matrix), target270);
