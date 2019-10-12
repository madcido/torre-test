function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function createCard(person) {
  let card = document.createElement('div');
  card.innerHTML = person.professionalHeadline;
  return card;
}
