function changeInput() {
  let inputValue = document.querySelector('.search-input').value;
  setTimeout(() => {
    if (inputValue === document.querySelector('.search-input').value) {
      fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/people?q=' + inputValue + '&limit=10')
        .then(response => response.json())
        .then(data => {
          let firstCarousel = document.querySelector('.first-carousel');
          clearNode(firstCarousel);
          data.forEach(person => {
            firstCarousel.appendChild(createCard(person));
          })
        })
    }
  }, 1000);
}
