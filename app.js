const gameButtons = document.querySelectorAll('.game-button')
const strikes = document.querySelector('.strikes')
const playAgain = document.querySelector('.play-again-button')
const score = document.querySelector('.score-number')
const strikeIcon = '<i class="fa-solid fa-xmark"></i>'
const albumArt = document.querySelector('.album-art')
const currentArtChoice = document.querySelector('.current-art-choice')
const artMessage = 'Current art collection: '
const currentAlbumChoice = document.querySelector('.current-album-display')
const dayNight = document.querySelector('.day-night')
const nav = document.querySelector('nav')
const gamePage = document.querySelector('.game-page')
const gameBoard = document.querySelector('.game-board')
const scoreBox = document.querySelector('.score-box')
const dayIcon = document.querySelector('.fa-umbrella-beach')
const nightIcon = document.querySelector('.fa-ghost')
//search globals
const SEARCH_DOMAIN = 'https://api.discogs.com/database/search?'
const API_KEY = 'NFFuiOkGpBVELhAZbuku'
const SECRET_KEY = 'vuxkHlTcqAaVwlHKbSkgDqSXILszAMeW'
const rhymesayers = document.getElementById('rhymesayers')
const sargentHouse = document.getElementById('sargent-house')
const anti = document.getElementById('anti')
const mysteryCircles = document.getElementById('mystery-circles')
const desoto = document.getElementById('desoto')
const merge = document.getElementById('merge')
const epitaph = document.getElementById('epitaph')
const dischord = document.getElementById('dischord')

let albumArray = []

let totalScore = 0

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
  console.log(albumArray)
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
//event listeners
// rhymesayers.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
// `${SEARCH_DOMAIN}page=13&per_page=20&label=rhymesayers&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Rhymesayers`
//   albumArtList(album)
// })

// sargentHouse.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=3&per_page=20&label='sargent house'&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Sargent House`
//   albumArtList(album)
// })

// anti.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=13&per_page=20&label=anti&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}ANTI'`
//   albumArtList(album)
// })

// mysteryCircles.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=3&per_page=20&label='mystery circles'&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Mystery Circles`
//   albumArtList(album)
// })

// desoto.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=5&per_page=20&label=desoto&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Desoto`
//   albumArtList(album)
// })

// merge.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=9&per_page=20&label=merge&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Merge`
//   albumArtList(album)
// })

// epitaph.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=10&per_page=20&label=epitaph&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Epitaph`
//   albumArtList(album)
// })

// dischord.addEventListener('click', async () => {
//   albumArray.length = 0
//   let response = await axios.get(
//     `${SEARCH_DOMAIN}page=4&per_page=20&label=dischord&key=${API_KEY}&secret=${SECRET_KEY}`
//   )
//   let album = response.data.results
//   currentArtChoice.innerText = `${artMessage}Dischord`
//   albumArtList(album)
// })
//Main function of game
const gameStart = (buttons) => {
  //Reset if there was a previous game
  strikes.innerHTML = ''
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
  let randomNumber = Math.floor(Math.random() * albumArray.length)
  let gameAlbum = albumArray[randomNumber]
  let albumTitleName = Object.keys(gameAlbum).toString()
  // currentAlbumChoice.innerHTML = albumTitleName
  let gameArt = Object.values(gameAlbum).toString()
  const imgMaker = document.createElement('img')
  imgMaker.classList.add('game-art')
  imgMaker.src = gameArt
  const holdAgain = setTimeout(() => {
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
  nightIcon.classList.toggle('fa-ghost-day')
  dayIcon.classList.toggle('fa-umbrella-beach-day')
  dayIcon.disabled = true
  nightIcon.disabled = false
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
  nightIcon.classList.toggle('fa-ghost-day')
  dayIcon.classList.toggle('fa-umbrella-beach-day')
  dayIcon.disabled = false
  nightIcon.disabled = true
})

getAlbums()
console.log(albumArray)
