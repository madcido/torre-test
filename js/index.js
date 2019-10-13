function submitScore() {
  let name = document.querySelector('.game-over__form input').value;
  fetch('https://cors-anywhere.herokuapp.com/https://tbcg.herokuapp.com/users',
    { headers: {"Content-Type": "application/json"},
      method: 'POST',
      body: JSON.stringify({ name: name, score: playerScore })
    })
    .then(response => gameReset());
}

async function fetchCards(turn) {
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

function fetchScores() {
  let scoreContainer = document.querySelector('.score-container');
  clearNode(scoreContainer);
  scoreContainer.appendChild(createScore());

  fetch('https://cors-anywhere.herokuapp.com/https://tbcg.herokuapp.com/users')
    .then(response => response.json())
    .then(result => {
      result.data.slice(0, 8).forEach(user => scoreContainer.appendChild(createScore(user.name, user.score)));
    });
}

function init() {
  let cardContainer = document.querySelector('.card-container');
  clearNode(cardContainer);
  showLoading(cardContainer);
  fetchScores();

  fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/people/torrenegra/connections?limit=20')
    .then(response => response.json())
    .then(connections => {
      getCards(connections);
      fetchCards(currentTurn);
    });
}

init();
