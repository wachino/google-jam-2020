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
    const N = Number(readLine());
    let matrix = [];
    let k = 0;
    let r = 0;
    let c = 0;
    for (let n = 0; n < N; n++) {
      matrix.push(readLine().split(' ').map(Number));
      k += matrix[n][n];
    }
    for (let i = 0; i < N; i++) {
      let row = [];
      let fr = false;
      let col = [];
      let fc = false;
      for (let j = 0; j < N; j++) {
        let nr = matrix[i][j];
        let nc = matrix[j][i];
        if (!fr && row[nr]) {
          r++;
          fr = true;
        }
        if (!fc && col[nc]) {
          c++;
          fc = true;
        }
        row[nr] = true;
        col[nc] = true;
      }
    }

    console.log(`Case #${t + 1}: ${k} ${r} ${c}`);
  }
}
