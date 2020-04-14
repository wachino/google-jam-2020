const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity,
});

async function* getGenerator() {
  for await (const line of rl) {
    yield line;
  }
}
const generator = getGenerator();

async function solve() {
  let line = await generator.next();
  const [T, B] = line.value.trim().split(' ').map(Number);

  for (let t = 0; t < T; t++) {
    const answer = await findAnswer(B);
    console.log(answer.join(''));
    line = await generator.next();

    let veredict = line.value;
    if (veredict === 'N') {
      break;
    }
  }

  rl.close();
  process.stdin.destroy();
}

async function findAnswer(B) {
  let ans = Array(B).fill(-1);
  let same = -1;
  let diff = -1;
  let query = 0;
  let left = -1;
  let right = B;
  let turn = 0;
  while (left < right - 1) {
    if (query && query % 10 === 0) {
      let rev = false;
      let comp = false;
      if (same !== -1) {
        let n = await queryPos(same + 1);
        if (ans[same] !== n) {
          comp = true;
        }
      } else {
        await queryPos(1);
      }
      if (diff !== -1) {
        let n = await queryPos(diff + 1);
        if ((ans[diff] !== n && !comp) || (ans[diff] === n && comp)) {
          rev = true;
        }
      } else {
        await queryPos(1);
      }

      if (rev) {
        ans = ans.reverse();
        tmp = B - right - 1;
        right = B - left - 1;
        left = tmp;
        if (turn) {
          turn = 0;
          left++;
          ans[left] = await queryPos(left + 1);
        }
      }
      if (comp) {
        ans = ans.map((c) => 1 - c);
      }
      continue;
    }
    if (turn === 0) {
      turn = 1;
      left++;
      ans[left] = await queryPos(left + 1);
    } else {
      turn = 0;
      right--;
      ans[right] = await queryPos(right + 1);

      if (same === -1 && ans[right] === ans[B - right - 1]) {
        same = B - right - 1;
      }
      if (diff === -1 && ans[right] !== ans[B - right - 1]) {
        diff = B - right - 1;
      }
    }
  }
  return ans;

  async function queryPos(p) {
    console.log(p);
    query++;
    return await readNum();
  }
}

async function readNum() {
  let tmp = await generator.next();
  return Number(tmp.value);
}

solve();
