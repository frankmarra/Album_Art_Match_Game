const gameButtons = document.querySelectorAll('.game-button')
const strikes = document.querySelector('.strike-number')
const playAgain = document.querySelector('.play-again-button')
const score = document.querySelector('.score-number')
const strikeIcon = '<i class="fa-solid fa-xmark"></i>'
const albumArt = document.querySelector('.album-art')
const currentAlbumChoice = document.querySelector('.current-album-title')
const dayNight = document.querySelector('.day-night')
const nav = document.querySelector('nav')
const gamePage = document.querySelector('.game-page')
const gameBoard = document.querySelector('.game-board')
const scoreBox = document.querySelector('.score-box')
const strikeBox = document.querySelector('.strike-box')
const dayIcon = document.querySelector('.fa-umbrella-beach')
const nightIcon = document.querySelector('.fa-ghost')
//search globals
const SEARCH_DOMAIN = 'https://api.discogs.com/database/search?'
const API_KEY = 'NFFuiOkGpBVELhAZbuku'
const SECRET_KEY = 'vuxkHlTcqAaVwlHKbSkgDqSXILszAMeW'

let albumArray = []
let playerScore = 0
let playerStrikes = 0
let pickOne = ''
let pickTwo = ''
let matchCount = 0
//Search page function
const albumArtList = (album) => {
  album.forEach((alb) => {
    let title = alb.title
    let albumArtwork = alb.cover_image
    let gameChoice = {
      [title]: albumArtwork
    }
    albumArray.push(gameChoice)
  })
}

const getAlbums = async () => {
  let response = await axios.get(
    `${SEARCH_DOMAIN}page=4&per_page=20&label=dischord&key=${API_KEY}&secret=${SECRET_KEY}`
  )
  let album = response.data.results
  albumArtList(album)
  response = await axios.get(
    `${SEARCH_DOMAIN}page=3&per_page=20&label='sargent house'&key=${API_KEY}&secret=${SECRET_KEY}`
  )
  album = response.data.results
  albumArtList(album)
  response = await axios.get(
    `${SEARCH_DOMAIN}page=5&per_page=20&label=desoto&key=${API_KEY}&secret=${SECRET_KEY}`
  )
  album = response.data.results
  albumArtList(album)
  response = await axios.get(
    `${SEARCH_DOMAIN}page=3&per_page=20&label='mystery circles'&key=${API_KEY}&secret=${SECRET_KEY}`
  )
  album = response.data.results
  albumArtList(album)
}

const gameLogic = (evt) => {
  console.log(evt)
  let gameBox = evt.srcElement
  if (pickOne === '') {
    pickOne = gameBox
    gameBox.innerHTML = gameBox.value
    pickOne.disabled = true
  } else if (pickOne !== '' && pickTwo === '') {
    playerStrikes++
    strikes.innerHTML = playerStrikes
    pickTwo = gameBox
    gameBox.innerHTML = gameBox.value
    pickTwo.disabled = true
    if (pickOne.value !== pickTwo.value) {
      playerScore -= 5
      score.innerText = playerScore
      //Add a delay so player can see wrong choice
      setTimeout(() => {
        pickOne.disabled = false
        pickTwo.disabled = false
        pickOne.innerHTML = ''
        pickTwo.innerHTML = ''
        pickOne = ''
        pickTwo = ''
      }, 300)
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
        gameButtons.forEach((box) => (box.disabled = true))
        gameButtons.forEach((box) => (box.innerHTML = ''))
        gameButtons.forEach((box) => box.classList.add('won'))
        currentAlbumChoice.style.display = 'block'
        playAgain.disabled = false
        playAgain.innerText = 'Next Album!'
        playerScore += 50
        score.innerText = playerScore
        const stats = {
          tries: playerStrikes,
          score: playerScore
        }
        window.localStorage.setItem('player-stats', JSON.stringify(stats))
      }
    }
  }
}
//Main function of game
const gameStart = (buttons) => {
  //Reset if there was a previous game
  pickOne = ''
  pickTwo = ''
  matchCount = 0
  playerScore = 0
  playerStrikes = 0
  strikes.innerText = 0
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
    //Remove existing event listeners, and add new event listeners to the boxes.
    box.removeEventListener('click', gameLogic)
    box.addEventListener('click', gameLogic)
  })
}

playAgain.addEventListener('click', () => {
  if (albumArt.childNodes.length > 0) {
    albumArt.removeChild(albumArt.children[0])
  }
  let randomNumber = Math.floor(Math.random() * albumArray.length)
  let gameAlbum = albumArray[randomNumber]
  let albumTitleName = Object.keys(gameAlbum).toString()
  currentAlbumChoice.innerHTML = albumTitleName
  currentAlbumChoice.style.display = 'none'
  let gameArt = Object.values(gameAlbum).toString()
  const imgMaker = document.createElement('img')
  imgMaker.classList.add('game-art')
  imgMaker.src = gameArt
  setTimeout(() => {
    albumArt.appendChild(imgMaker)
  }, 300)
  gameStart(gameButtons)
})

dayIcon.addEventListener('click', () => {
  nav.classList.toggle('nav-day')
  gamePage.classList.toggle('game-page-day')
  playAgain.classList.toggle('play-again-button-day')
  gameBoard.classList.toggle('game-board-day')
  gameButtons.forEach((but) => {
    but.classList.toggle('game-button-day')
  })
  scoreBox.classList.toggle('score-box-day')
  strikeBox.classList.toggle('strike-box-day')
  currentAlbumChoice.classList.toggle('current-album-title-day')
  nightIcon.classList.toggle('fa-ghost-day')
  dayIcon.classList.toggle('fa-umbrella-beach-day')
})

nightIcon.addEventListener('click', () => {
  nav.classList.toggle('nav-day')
  gamePage.classList.toggle('game-page-day')
  playAgain.classList.toggle('play-again-button-day')
  gameBoard.classList.toggle('game-board-day')
  gameButtons.forEach((but) => {
    but.classList.toggle('game-button-day')
  })
  scoreBox.classList.toggle('score-box-day')
  strikeBox.classList.toggle('strike-box-day')
  currentAlbumChoice.classList.toggle('current-album-title-day')
  nightIcon.classList.toggle('fa-ghost-day')
  dayIcon.classList.toggle('fa-umbrella-beach-day')
})

getAlbums()
