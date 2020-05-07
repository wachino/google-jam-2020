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
    let N = Number(readLine());
    let left = [];
    let right = [];
    let middle = '';
    let possible = true;
    for (let i = 0; i < N; i++) {
      let l = readLine().split('*');
      left.push(l[0]);
      right.push(l[l.length - 1].split('').reverse().join(''));
      middle += l.slice(1, l.length - 1).join('');
    }
    left.sort((a, b) => {
      if (a.length === b.length) {
        return a < b;
      }
      return b.length - a.length;
    });

    right.sort((a, b) => {
      if (a.length === b.length) {
        return a < b;
      }
      return b.length - a.length;
    });

    for (let i = 1; i < N; i++) {
      if (left[i] !== left[i - 1].substr(0, left[i].length)) {
        possible = false;
        break;
      }
      if (right[i] !== right[i - 1].substr(0, right[i].length)) {
        possible = false;
        break;
      }
    }

    let sol = left[0] + middle + right[0].split('').reverse().join('');

    console.log(`Case #${t + 1}: ${possible ? sol : '*'}`);
  }
}
