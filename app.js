const gameButtons = document.querySelectorAll('.game-button')
const strikes = document.querySelector('.strikes')
const playAgain = document.querySelector('.play-again-button')

//Main function of game
const gameStart = (buttons) => {
  strikes.innerText = ''
  let pickOne = ''
  let pickTwo = ''
  let matchCount = 0
  playAgain.disabled = true
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
  buttons.forEach((box) => {
    box.disabled = false
    box.innerText = ''
    box.value = 0
    let randomSymbol = Math.floor(Math.random() * gameArray.length)
    //give HTML button a value.  Once button is clicked, this value will display in the inner text of the button.
    box.value = gameArray[randomSymbol]
    //Remove the current value from the array so it wont be used more than once.
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
          //Add a delay so player can see wrong choice
          const holdPlease = setTimeout(() => {
            strikes.innerText += 'X'
            if (strikes.innerText === 'XXX') {
              buttons.forEach((box) => (box.disabled = true))
              playAgain.disabled = false
              pickOne.innerText = ''
              pickTwo.innerText = ''
            } else {
              pickOne.disabled = false
              pickTwo.disabled = false
              pickOne.innerText = ''
              pickTwo.innerText = ''
              pickOne = ''
              pickTwo = ''
            }
          }, 500)
        } else if (pickOne.value === pickTwo.value) {
          pickOne = ''
          pickTwo = ''
          matchCount++
          if (matchCount === 8) {
            playAgain.disabled = false
          }
        }
      }
    })
  })
}

playAgain.addEventListener('click', () => gameStart(gameButtons))

// gameStart(gameButtons)
