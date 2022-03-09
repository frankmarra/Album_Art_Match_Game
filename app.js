const gameButtons = document.querySelectorAll('.game-button')
const strikes = document.querySelector('.strikes')
const playAgain = document.querySelector('.play-again-button')
const score = document.querySelector('.score-number')
const strikeIcon = '<i class="fa-solid fa-xmark"></i>'
const albums = JSON.parse(localStorage.getItem('albums'))
const albumArt = document.querySelector('.album-art')
const albumTitle = document.querySelector('.album-title')
let totalScore = 0
//Main function of game
const gameStart = (buttons) => {
  //Reset if there was a previous game
  strikes.innerText = ''
  let pickOne = ''
  let pickTwo = ''
  let matchCount = 0
  let playerScore = totalScore
  let playerStrikes = 0
  let albumCount = 0
  score.innerText = playerScore
  playAgain.disabled = true
  playAgain.innerText = 'Good Luck!'
  let gameArray = [
    '<i class="fa-solid fa-music fa-beat"></i>',
    '<i class="fa-solid fa-music fa-beat"></i>',
    '<i class="fa-solid fa-compact-disc fa-spin"></i>',
    '<i class="fa-solid fa-compact-disc fa-spin"></i>',
    '<i class="fa-solid fa-headphones fa-beat"></i>',
    '<i class="fa-solid fa-headphones fa-beat"></i>',
    '<i class="fa-solid fa-volume-high fa-flip"></i>',
    '<i class="fa-solid fa-volume-high fa-flip"></i>',
    '<i class="fa-solid fa-guitar fa-flip"></i>',
    '<i class="fa-solid fa-guitar fa-flip"></i>',
    '<i class="fa-solid fa-play fa-flip"></i>',
    '<i class="fa-solid fa-play fa-flip"></i>',
    '<i class="fa-solid fa-drum fa-bounce" style="--fa-bounce-height: .5"></i>',
    '<i class="fa-solid fa-drum fa-bounce" style="--fa-bounce-height: .5"></i>',
    '<i class="fa-solid fa-microphone-lines fa-shake"></i>',
    '<i class="fa-solid fa-microphone-lines fa-shake"></i>'
  ]
  let usedSymbol = []
  //populate board with random boxes and add event listeners to each box
  buttons.forEach((box) => {
    box.classList.remove('matched')
    box.classList.remove('won')
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
          playerStrikes++
          strikes.innerHTML += `${strikeIcon}  `
          playerScore -= 5
          score.innerText = playerScore
          //Add a delay so player can see wrong choice
          const holdPlease = setTimeout(() => {
            if (playerStrikes === 6) {
              buttons.forEach((box) => (box.disabled = true))
              buttons.forEach((box) => (box.innerHTML = ''))
              playAgain.disabled = false
              playAgain.innerText = 'Play Again?'
              totalScore = 0
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
          pickOne.classList.add('matched')
          pickTwo.classList.add('matched')
          pickOne.innerHTML = ''
          pickTwo.innerHTML = ''
          pickOne = ''
          pickTwo = ''
          matchCount++
          playerScore += 10
          score.innerText = playerScore
          if (matchCount === 8) {
            playAgain.disabled = false
            playAgain.innerText = 'Next Album!'
            buttons.forEach((box) => box.classList.add('won'))
            playerScore += 50
            score.innerText = playerScore
            totalScore = playerScore
            albumCount++
          }
        }
      }
    })
  })
}

playAgain.addEventListener('click', () => {
  if (albumArt.childNodes.length > 0) {
    albumArt.removeChild(albumArt.children[0])
  }
  let randomNumber = Math.floor(Math.random() * albums.length)
  let gameAlbum = albums[randomNumber]
  let albumTitleName = Object.keys(gameAlbum).toString()
  let gameArt = Object.values(gameAlbum).toString()
  const imgMaker = document.createElement('img')
  imgMaker.classList.add('game-art')
  imgMaker.src = gameArt
  const holdAgain = setTimeout(() => {
    albumArt.appendChild(imgMaker)
  }, 300)
  gameStart(gameButtons)
})
