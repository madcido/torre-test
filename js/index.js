let playerCards = [];
let playerScore = 0;
let computerCards = [];
let computerScore = 0;
let currentTurn = 0;

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

function displayCards(turn) {
  let cardContainer = document.querySelector('.card-container');
  clearNode(cardContainer);
  fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/bios/' + playerCards[turn].person.publicId)
    .then(response => response.json())
    .then(data => {
      cardContainer.prepend(createCard(data, 'player-card'));
      addEventsToCard();
    });
  fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/bios/' + computerCards[turn].person.publicId)
    .then(response => response.json())
    .then(data => {
      cardContainer.appendChild(createCard(data, 'computer-card'))
    });
}

function gameTurn(target) {
  let selectedStat = target.getAttribute('data-stat');
  let playerCardValue = parseInt(target.getAttribute('data-value'));
  let computerCardValue = parseInt(document.querySelector('.computer-card__stat[data-stat=' + selectedStat + ']').getAttribute('data-value'));
  if (playerCardValue > computerCardValue) {
    playerScore++;
  } else {
    computerScore++;
  }
  currentTurn++;
  if (currentTurn < playerCards.length) {
    displayCards(currentTurn);
  } else {
    alert(`Game Over!\n\nPlayer score: ${playerScore}\nComputer score: ${computerScore}`)
  }
}

function init() {
  fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/people/torrenegra/connections?limit=20')
    .then(response => response.json())
    .then(connections => {
      getCards(connections);
      displayCards(currentTurn);
    });
}

init();
