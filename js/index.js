let playerCards = [];
let playerScore = 0;
let computerCards = [];
let computerScore = 0;
let currentTurn = 0;

function reset() {
  playerCards = [];
  playerScore = 0;
  computerCards = [];
  computerScore = 0;
  currentTurn = 0;
  removeGameOver();
  init();
}

function submitScore() {
  alert('Go do some backend now')
  reset();
}

function nextTurn() {
  currentTurn++;
  if (currentTurn < playerCards.length) {
    displayCards(currentTurn);
  } else {
    showGameOver(playerScore);
  }
}

function getCards(deck) {
  let handSize = 4
  let randomSeed = getRandomInt(0, deck.length - 2 * handSize - 1);

  for (let i = randomSeed; i < randomSeed + handSize; i++) {
    playerCards.push(deck[i]);
  }

  for (let i = randomSeed + handSize; i < randomSeed + 2 * handSize; i++) {
    computerCards.push(deck[i]);
  }
}

async function displayCards(turn) {
  let cardContainer = document.querySelector('.card-container');
  clearNode(cardContainer);
  showLoading(cardContainer);

  let playerCardData = await fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/bios/' + playerCards[turn].person.publicId)
                              .then(response => response.json());

  let computerCardData = await fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/bios/' + computerCards[turn].person.publicId)
                                .then(response => response.json());

  clearNode(cardContainer);
  cardContainer.appendChild(createCard(playerCardData, 'player-card'));
  cardContainer.appendChild(createCard(computerCardData, 'computer-card'));
  addEventsToCard();
  setTimeout(() => document.querySelector('.player-card').classList.add('flipped'), 200);
}

function gameTurn(playerStat) {
  let selectedStat = playerStat.getAttribute('data-stat');
  let playerStatValue = parseInt(playerStat.getAttribute('data-value'));
  let computerStat = document.querySelector('.computer-card__stat[data-stat=' + selectedStat + ']');
  let computerStatValue = parseInt(computerStat.getAttribute('data-value'));

  removeEventsFromCard();
  playerStat.classList.add('selected');
  computerStat.classList.add('selected');
  document.querySelector('.computer-card').classList.add('flipped');

  setTimeout(() => {
    if (playerStatValue > computerStatValue) {
      playerStat.classList.add('winner');
      computerStat.classList.add('loser');
      playerScore++;
    } else {
      playerStat.classList.add('loser');
      computerStat.classList.add('winner');
      computerScore++;
    }
    setTimeout(() => nextTurn(), 1000);
  }, 1000);
}

function init() {
  let cardContainer = document.querySelector('.card-container');
  clearNode(cardContainer);
  showLoading(cardContainer);

  fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/people/torrenegra/connections?limit=20')
    .then(response => response.json())
    .then(connections => {
      getCards(connections);
      displayCards(currentTurn);
    });

  // fetch leaderboard data then
  populateLeaderboard('Go do some backend');
}

init();
