function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function normalize(n) {
  let limitedNumber = (n >= 20) ? 20 : n;
  return limitedNumber/20;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
