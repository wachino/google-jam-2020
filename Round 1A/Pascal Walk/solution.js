const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((str) => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

function solution() {
  const T = Number(readLine());

  for (let t = 0; t < T; t++) {
    console.log(`Case #${t + 1}:`);

    let N = Number(readLine());
    let currPos = { r: 0, k: 1 };
    let pending = Math.min(30, N);
    let aprox = Math.max(0, N - 30);

    while (aprox) {
      currPos = nextRow(currPos);
      console.log(`${currPos.r} ${currPos.k}`);
      if (aprox % 2) {
        let row = fillRow(currPos);
        if (row.length) {
          currPos = row[row.length - 1];
        }
        for (let i = 0; i < row.length; i++) {
          console.log(`${row[i].r} ${row[i].k}`);
        }
      } else {
        pending--;
      }
      aprox >>= 1;
    }

    while (pending) {
      pending--;
      currPos = nextRow(currPos);
      console.log(`${currPos.r} ${currPos.k}`);
    }
  }
}

function nextRow(cell) {
  if (cell.k === 1) {
    return { k: 1, r: cell.r + 1 };
  } else if (cell.k === cell.r) {
    return { k: cell.k + 1, r: cell.r + 1 };
  } else {
    throw Error();
  }
}

function fillRow(start) {
  let path = [];
  if (start.k === 1) {
    for (let k = 2; k <= start.r; k++) {
      path.push({ k, r: start.r });
    }
  } else if (start.k === start.r) {
    for (let k = start.k - 1; k >= 1; k--) {
      path.push({ k, r: start.r });
    }
  } else {
    throw Error();
  }
  return path;
}
