const gameButtons = document.querySelectorAll('.game-button')
const strikes = document.querySelector('.strikes')
const playAgain = document.querySelector('.play-again-button')

//Main function of game
const gameStart = (buttons) => {
  //Reset if there was a previous game
  strikes.innerText = ''
  let pickOne = ''
  let pickTwo = ''
  let matchCount = 0
  playAgain.disabled = true
  playAgain.innerText = 'Good Luck!'
  let gameArray = [
    '<i class="fa-solid fa-music" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-music" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-compact-disc" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-compact-disc" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-headphones" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-headphones" style="font-size: 100px"></i>',
    '<i class="fa-brands fa-spotify" style="font-size: 100px"></i>',
    '<i class="fa-brands fa-spotify" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-guitar" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-guitar" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-play" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-play" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-drum" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-drum" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-microphone-lines" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-microphone-lines" style="font-size: 100px"></i>'
  ]
  let usedSymbol = []
  //populate board with random boxes and add event listeners to each box
  buttons.forEach((box) => {
    box.disabled = false
    box.innerHTML = ''
    box.value = 0
    let randomSymbol = Math.floor(Math.random() * gameArray.length)
    //give HTML button a value.  Once button is clicked, this value will display in the inner text of the button.
    box.value = gameArray[randomSymbol]
    //Remove the current value from the array so it wont be used more than once.
    usedSymbol = gameArray.splice(randomSymbol, 1)
    box.addEventListener('click', () => {
      if (pickOne === '') {
        pickOne = box
        box.innerHTML = box.value
        pickOne.disabled = true
      } else if (pickOne !== '' && pickTwo === '') {
        pickTwo = box
        box.innerHTML = box.value
        pickTwo.disabled = true
        if (pickOne.value !== pickTwo.value) {
          //Add a delay so player can see wrong choice
          const holdPlease = setTimeout(() => {
            strikes.innerText += 'X'
            if (strikes.innerText === 'XXXX') {
              buttons.forEach((box) => (box.disabled = true))
              buttons.forEach((box) => (box.innerHTML = ''))
              playAgain.disabled = false
              playAgain.innerText = 'Play Again?'
              // pickOne.innerHTML = ''
              // pickTwo.innerHTML = ''
            } else {
              pickOne.disabled = false
              pickTwo.disabled = false
              pickOne.innerHTML = ''
              pickTwo.innerHTML = ''
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
            playAgain.innerText = 'Play Again?'
          }
        }
      }
    })
  })
}

playAgain.addEventListener('click', () => gameStart(gameButtons))
