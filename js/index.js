function changeInput() {
  // let inputValue = document.querySelector('.search-input').value;
  // setTimeout(() => {
    // if (inputValue === document.querySelector('.search-input').value) {
      fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/people?q=fabio%20carmo&limit=1')
        .then(response => response.json())
        .then(data => {
          let cardContainer = document.querySelector('.card-container');
          clearNode(cardContainer);
          data.forEach(person => {
            fetch('https://cors-anywhere.herokuapp.com/https://bio.torre.co/api/bios/' + person.publicId)
              .then(response => response.json())
              .then(fullInfo => cardContainer.appendChild(createCard(fullInfo)));
          })
        })
    // }
  // }, 500);
}

changeInput();
