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
    let [R, C] = readLine().split(' ').map(Number);
    let lastRound = 0;
    let interest = 0;
    let participants = [];
    let toCheck = [];
    let toEliminate = [];
    let end = false;

    for (let i = 0; i < R; i++) {
      let row = readLine().split(' ').map(Number);
      participants.push([]);
      for (let j = 0; j < C; j++) {
        let p = {
          skills: row[j],
          pending: true,
          eliminated: false,
          u: null,
          d: null,
          l: null,
          r: null,
        };
        if (i > 0) {
          participants[i - 1][j].d = p;
          p.u = participants[i - 1][j];
        }
        if (j > 0) {
          participants[i][j - 1].r = p;
          p.l = participants[i][j - 1];
        }
        participants[i].push(p);
        toCheck.push(p);
        lastRound += row[j];
      }
    }

    while (!end) {
      end = true;
      for (let e = 0; e < toEliminate.length; e++) {
        let te = toEliminate[e];
        if (!te.eliminated) {
          lastRound -= te.skills;
        }

        te.eliminated = true;

        if (te.l) {
          te.l.r = te.r;
          if (!te.l.pending && !te.l.eliminated) {
            te.l.pending = true;
            toCheck.push(te.l);
          }
        }
        if (te.r) {
          te.r.l = te.l;
          if (!te.r.pending && !te.r.eliminated) {
            te.r.pending = true;
            toCheck.push(te.r);
          }
        }
        if (te.u) {
          te.u.d = te.d;
          if (!te.u.pending && !te.u.eliminated) {
            te.u.pending = true;
            toCheck.push(te.u);
          }
        }
        if (te.d) {
          te.d.u = te.u;
          if (!te.d.pending && !te.d.eliminated) {
            te.d.pending = true;
            toCheck.push(te.d);
          }
        }
      }
      interest += lastRound;
      toEliminate = [];
      while (toCheck.length) {
        let compassAvg = 0;
        let compassN = 0;
        let next = toCheck.pop();
        if (next.eliminated) {
          continue;
        }
        next.pending = false;

        if (next.l) {
          compassAvg += next.l.skills;
          compassN++;
        }
        if (next.r) {
          compassAvg += next.r.skills;
          compassN++;
        }
        if (next.u) {
          compassAvg += next.u.skills;
          compassN++;
        }
        if (next.d) {
          compassAvg += next.d.skills;
          compassN++;
        }
        compassAvg /= compassN;

        if (next.skills < compassAvg) {
          toEliminate.push(next);
          end = false;
        }
      }
    }
    console.log(`Case #${t + 1}: ${interest}`);
  }
}
