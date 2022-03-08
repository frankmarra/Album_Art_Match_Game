const gameButtons = document.querySelectorAll('.game-button')
const strikes = document.querySelector('.strikes')
const playAgain = document.querySelector('.play-again-button')
const score = document.querySelector('.score-number')
const strikeIcon = '<i class="fa-solid fa-xmark" style="font-size: 45px"></i>'

//Main function of game
const gameStart = (buttons) => {
  //Reset if there was a previous game
  strikes.innerText = ''
  let pickOne = ''
  let pickTwo = ''
  let matchCount = 0
  let playerScore = 0
  let playerStrikes = 0
  score.innerText = playerScore
  playAgain.disabled = true
  playAgain.innerText = 'Good Luck!'
  let gameArray = [
    '<i class="fa-solid fa-music fa-beat" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-music fa-beat" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-compact-disc fa-spin" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-compact-disc fa-spin" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-headphones fa-beat" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-headphones fa-beat" style="font-size: 100px"></i>',
    '<i class="fa-brands fa-spotify fa-spin" style="font-size: 100px"></i>',
    '<i class="fa-brands fa-spotify fa-spin" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-guitar fa-flip" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-guitar fa-flip" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-play fa-flip" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-play fa-flip" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-drum fa-bounce" style="font-size: 100px; --fa-bounce-height: .5"></i>',
    '<i class="fa-solid fa-drum fa-bounce" style="font-size: 100px; --fa-bounce-height: .5"></i>',
    '<i class="fa-solid fa-microphone-lines fa-shake" style="font-size: 100px"></i>',
    '<i class="fa-solid fa-microphone-lines fa-shake" style="font-size: 100px"></i>'
  ]
  let usedSymbol = []
  //populate board with random boxes and add event listeners to each box
  buttons.forEach((box) => {
    box.style = 'background: black'
    box.style = ''
    box.disabled = false
    box.innerHTML = 'border: 2px solid #36d860;'
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
            strikes.innerHTML += `${strikeIcon}  `
            playerStrikes++
            if (playerStrikes === 6) {
              buttons.forEach((box) => (box.disabled = true))
              buttons.forEach((box) => (box.innerHTML = ''))
              playAgain.disabled = false
              playAgain.innerText = 'Play Again?'
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
          pickOne.style = 'background: transparent'
          pickTwo.style = 'background: transparent'
          pickOne.innerHTML = ''
          pickTwo.innerHTML = ''
          pickOne = ''
          pickTwo = ''
          matchCount++
          playerScore += 10
          score.innerText = playerScore
          if (matchCount === 8) {
            playAgain.disabled = false
            playAgain.innerText = 'Play Again?'
            buttons.forEach(
              (box) => (box.style = 'border: none; background: transparent')
            )
          }
        }
      }
    })
  })
}

playAgain.addEventListener('click', () => gameStart(gameButtons))
