const gameButtons = document.querySelectorAll('.game-button')

let pickOne = ''
let pickTwo = ''

const gameStart = (gameButtons) => {
  let gameArray = [
    'one',
    'one',
    'two',
    'two',
    'three',
    'three',
    'four',
    'four',
    'five',
    'five',
    'six',
    'six',
    'seven',
    'seven',
    'eight',
    'eight'
  ]
  let usedSymbol = []
  gameButtons.forEach((box) => {
    let randomSymbol = Math.floor(Math.random() * gameArray.length)
    // box.innerText = gameArray[randomSymbol]
    box.value = gameArray[randomSymbol]
    usedSymbol = gameArray.splice(randomSymbol, 1)
    box.addEventListener('click', () => {
      if (pickOne === '') {
        pickOne = box
        box.innerText = box.value
        pickOne.disabled = true
      } else if (pickOne !== '' && pickTwo === '') {
        pickTwo = box
        box.innerText = box.value
        pickTwo.disabled = true
        if (pickOne.value !== pickTwo.value) {
          const holdPlease = setTimeout(() => {
            pickOne.disabled = false
            pickTwo.disabled = false
            pickOne.innerText = ''
            pickTwo.innerText = ''
            pickOne = ''
            pickTwo = ''
          }, 500)
          // pickOne.disabled = false
          // pickTwo.disabled = false
          // pickOne.innerText = ''
          // pickTwo.innerText = ''
          // pickOne = ''
          // pickTwo = ''
        } else if (pickOne.value === pickTwo.value) {
          pickOne = ''
          pickTwo = ''
        }
      }
    })
  })
}

gameStart(gameButtons)
