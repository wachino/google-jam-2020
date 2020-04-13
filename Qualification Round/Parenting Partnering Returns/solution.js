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
  let tasks;
  let N;
  let possible;
  for (let t = 0; t < T; t++) {
    N = Number(readLine());
    tasks = [];
    possible = true;
    for (let i = 0; i < N; i++) {
      let [s, e] = readLine().split(' ').map(Number);
      tasks.push({ s, e, i });
    }
    tasks.sort((tka, tkb) => {
      if (tka.s === tkb.s) {
        return tka.e - tkb.e;
      }
      return tka.s - tkb.s;
    });

    let lastA = -1;
    let lastB = -1;
    for (let i = 0; i < N; i++) {
      let tk = tasks[i];
      if (tk.s >= lastA) {
        lastA = tk.e;
        tk.ass = 0;
      } else if (tk.s >= lastB) {
        lastB = tk.e;
        tk.ass = 1;
      } else {
        possible = false;
        break;
      }
    }
    tasks.sort((tka, tkb) => tka.i - tkb.i);

    console.log(
      `Case #${t + 1}: ${
        possible ? tasks.map((u) => (u.ass === 0 ? 'C' : 'J')).join('') : 'IMPOSSIBLE'
      }`
    );
  }
}
