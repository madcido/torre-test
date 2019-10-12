function clearNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function normalize(n) {
  let limitedNumber = (n >= 20) ? 20 : n;
  return limitedNumber/20;
}
