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
    let S = readLine().split('').map(Number);
    let y = '';
    let c = 0;
    for (let i = 0; i < S.length; i++) {
      let d = S[i];
      while (c > d) {
        y += ')';
        c--;
      }
      while (c < d) {
        y += '(';
        c++;
      }
      y += d;
    }

    while (c) {
      y += ')';
      c--;
    }
    console.log(`Case #${t + 1}: ${y}`);
  }
}
