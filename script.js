let n;

function startSimulation() {
  n = parseInt(document.getElementById('orderInput').value);
  if (isNaN(n) || n % 2 === 0 || n < 3) {
    alert("홀수이며 3 이상의 수를 입력해주세요.");
    return;
  }

  document.getElementById('inputModal').style.display = 'none';
  generateMagicSquare(n);
}

function generateMagicSquare(n) {
  let container = document.getElementById("magicSquareContainer");
  container.innerHTML = ""; // 초기화

  let table = document.createElement("table");
  let square = Array.from({ length: n }, () => Array(n).fill(0));

  let num = 1, i = 0, j = Math.floor(n / 2);
  while (num <= n * n) {
    square[i][j] = num++;
    let [prevI, prevJ] = [i, j];
    i = (i - 1 + n) % n;
    j = (j + 1) % n;
    if (square[i][j] !== 0) {
      i = (prevI + 1) % n;
      j = prevJ;
    }
  }

  for (let r = 0; r < n; r++) {
    let tr = document.createElement("tr");
    for (let c = 0; c < n; c++) {
      let td = document.createElement("td");
      td.id = `cell-${r}-${c}`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  container.appendChild(table);

  // 바운스 애니메이션 숫자 삽입
  let delay = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      let td = document.getElementById(`cell-${r}-${c}`);
      td.textContent = square[r][c];
      gsap.from(td, {
        scale: 0,
        y: -50,
        opacity: 0,
        duration: 0.5,
        delay: delay,
        ease: "bounce.out"
      });
      delay += 0.05;
    }
  }

  // 합 표시 (딜레이를 고려)
  setTimeout(() => {
    showSums(square);
  }, delay * 1000 + 800);
}

function showSums(square) {
  let n = square.length;
  let container = document.getElementById("magicSquareContainer");

  // 가로 합
  for (let r = 0; r < n; r++) {
    let sum = square[r].reduce((a, b) => a + b, 0);
    let label = document.createElement("div");
    label.className = "sum-label";
    label.textContent = `행 ${r + 1} 합: ${sum}`;
    container.appendChild(label);
  }

  // 세로 합
  for (let c = 0; c < n; c++) {
    let sum = 0;
    for (let r = 0; r < n; r++) sum += square[r][c];
    let label = document.createElement("div");
    label.className = "sum-label";
    label.textContent = `열 ${c + 1} 합: ${sum}`;
    container.appendChild(label);
  }

  // 대각선 합
  let d1 = 0, d2 = 0;
  for (let i = 0; i < n; i++) {
    d1 += square[i][i];
    d2 += square[i][n - 1 - i];
  }
  let diag1 = document.createElement("div");
  diag1.className = "sum-label";
  diag1.textContent = `↘ 대각선 합: ${d1}`;
  container.appendChild(diag1);

  let diag2 = document.createElement("div");
  diag2.className = "sum-label";
  diag2.textContent = `↙ 대각선 합: ${d2}`;
  container.appendChild(diag2);
}

function resetPage() {
  location.reload();
}
