function createCard(fullInfo, type) {
  let noPictureURL = 'http://www.williamscactus.co.uk/Graphics/NoImage.jpg';
  let avatar = fullInfo.person.picture ? fullInfo.person.picture : noPictureURL;
  let name = fullInfo.person.name;
  let strengths = fullInfo.stats.strengths ? fullInfo.stats.strengths : 0;
  let jobs = fullInfo.stats.jobs ? fullInfo.stats.jobs : 0;
  let projects = fullInfo.stats.projects ? fullInfo.stats.projects : 0;
  let education = fullInfo.stats.education ? fullInfo.stats.education : 0;

  let card = document.createElement('div');
  card.className = type + ' card';
  card.innerHTML = `<div class='card-face front col center'>
                      <div class='person-avatar'>
                        <svg viewbox='0 0 100 120'>
                          <defs>
                            <clipPath id='hexagon_clip'>
                              <path id='hexagon'
                                d='M 44, 9
                                A 12 12 0 0 1 56, 9
                                L 91, 28
                                A 12 12 0 0 1 97, 40
                                L 97, 80
                                A 12 12 0 0 1 91, 92
                                L 56, 111
                                A 12 12 0 0 1 44, 111
                                L 9, 92
                                A 12 12 0 0 1 3, 80
                                L 3, 40
                                A 12 12 0 0 1 9, 28
                                Z' />
                            </clipPath>
                          </defs>
                          <image href='${avatar}' width='100' height='120' clip-path='url(#hexagon_clip)' />
                          <use href='#hexagon' stroke='white' stroke-width='6' fill='transparent' />
                        </svg>
                      </div>
                      <div class='person-info col center'>
                        <p class='person-info__head'>${name}</p>
                        <div class='person-info__stat ${type}__stat' data-stat='strengths' data-value='${strengths}'>
                          <p class='stat-name'>Strengths: </p>
                          <div class='stat-bar'><span style='width: ${normalize(strengths) * 100}%'></span></div>
                          <p class='stat-value'>${strengths}</p>
                        </div>
                        <div class='person-info__stat ${type}__stat' data-stat='jobs' data-value='${jobs}'>
                          <p class='stat-name'>Jobs: </p>
                          <div class='stat-bar'><span style='width: ${normalize(jobs) * 100}%'></span></div>
                          <p class='stat-value'>${jobs}</p>
                        </div>
                        <div class='person-info__stat ${type}__stat' data-stat='projects' data-value='${projects}'>
                          <p class='stat-name'>Projects: </p>
                          <div class='stat-bar'><span style='width: ${normalize(projects) * 100}%'></span></div>
                          <p class='stat-value'>${projects}</p>
                        </div>
                        <div class='person-info__stat ${type}__stat' data-stat='education' data-value='${education}'>
                          <p class='stat-name'>Education: </p>
                          <div class='stat-bar'><span style='width: ${normalize(education) * 100}%'></span></div>
                          <p class='stat-value'>${education}</p>
                        </div>
                      </div>
                    </div>
                    <div class='card-face back row center justify-center'>
                      <img src='https://www.torre.co/hubfs/logo.png' alt='Torre logo' width='150'>
                    </div>`;

  return card;
}

function createScore(name = 'Name', score = 'Score') {
  let scoreRow = document.createElement('div');
  scoreRow.className = 'score row';
  scoreRow.innerHTML = `<p>${name}</p>
                     <p>${score}</p>`;
  return scoreRow;
}

function showLoading(parentNode) {
  parentNode.innerHTML = `<div class='loader row center justify-center'><div></div></div>`;
}

function showGameOver(score) {
  document.querySelector('.game-over__message').innerHTML = `You score was: ${score}`;
  document.querySelector('.game-over').classList.add('game-over__show');
}

function removeGameOver(score) {
  document.querySelector('.game-over').classList.remove('game-over__show');
}

let handleClick = () => gameTurn(event.currentTarget);

function addEventsToCard() {
  document.querySelectorAll('.player-card__stat').forEach(node => node.addEventListener('click', handleClick));
}

function removeEventsFromCard() {
  document.querySelectorAll('.player-card__stat').forEach(node => node.removeEventListener('click', handleClick));
}
