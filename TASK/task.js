const symbols = ['🍕', '🎧', '🚀', '🐶', '🎮', '📱', '💎', '🌈'];
let cards = [...symbols, ...symbols];
let moves = 0, score = 0, flippedCards = [], matched = 0;
let timerInterval, seconds = 0;

const board = document.getElementById('game-board');
const movesEl = document.getElementById('moves');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerEl.textContent = '0s';
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = `${seconds}s`;
  }, 1000);
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${symbol}</div>
      <div class="card-back">?</div>
    </div>`;
  card.addEventListener('click', () => flipCard(card, symbol));
  return card;
}

function flipCard(card, symbol) {
  if (
    flippedCards.length >= 2 ||
    card.classList.contains('flip') ||
    card.classList.contains('matched')
  ) return;

  card.classList.add('flip');
  flippedCards.push({ card, symbol });

  if (flippedCards.length === 2) {
    moves++;
    movesEl.textContent = moves;

    if (flippedCards[0].symbol === flippedCards[1].symbol) {
      flippedCards.forEach(c => c.card.classList.add('matched'));
      matched += 2;
      score += 10;
      scoreEl.textContent = score;
      flippedCards = [];

      if (matched === cards.length) {
        clearInterval(timerInterval);
        board.style.transform = 'rotateY(360deg)';
        alert(`🎉 You won! Score: ${score}, Time: ${seconds}s`);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(c => c.card.classList.remove('flip'));
        flippedCards = [];
      }, 800);
    }
  }
}

function initGame() {
  shuffle(cards);
  board.innerHTML = '';
  matched = 0;
  moves = 0;
  score = 0;
  flippedCards = [];
  movesEl.textContent = '0';
  scoreEl.textContent = '0';
  board.style.transform = 'none';

  cards.forEach(symbol => {
    board.appendChild(createCard(symbol));
  });

  startTimer();
}

restartBtn.addEventListener('click', initGame);


