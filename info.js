const dayNight = document.querySelector('.day-night')
const nav = document.querySelector('nav')
const infoPage = document.querySelector('.info-page')
const dayIcon = document.querySelector('.fa-umbrella-beach')
const nightIcon = document.querySelector('.fa-ghost')
const gamePlayInfo = document.querySelector('.game-play-info')
const highScoreList = document.querySelector('.high-score-list')
const scoreTable = document.querySelector('table')
const scoreList = document.querySelector('tbody')
const gameDateTable = document.querySelectorAll('.date-game')
const gameScoreTable = document.querySelectorAll('.game-score')
const gameTriesTable = document.querySelectorAll('.game-tries')

//local storage
let allGames = localStorage.getItem('all-player-games')
allGames = allGames.split(',')
allGames = JSON.parse(allGames)

//game table generator
if (allGames.length < 5) {
  for (let i = 0; i < allGames.length; i++) {
    let dateGame = document.createElement('td')
    dateGame.innerHTML = `${allGames[i].month}/${allGames[i].date}/${allGames[i].year} Game - ${allGames[i].game['game-number']}`
    let gameScore = document.createElement('td')
    gameScore.innerHTML = allGames[i].game['player-score']
    let gameTries = document.createElement('td')
    gameTries.innerHTML = allGames[i].game['player-tries']
    let newRow = document.createElement('tr')
    newRow.appendChild(dateGame)
    newRow.appendChild(gameScore)
    newRow.appendChild(gameTries)
    scoreList.appendChild(newRow)
  }
} else if (allGames.length > 5) {
  for (let i = 0; i < 5; i++) {
    let dateGame = document.createElement('td')
    dateGame.innerHTML = `${allGames[i].month}/${allGames[i].date}/${allGames[i].year} Game - ${allGames[i].game['game-number']}`
    dateGame.classList.add('date-game')
    let gameScore = document.createElement('td')
    gameScore.innerHTML = allGames[i].game['player-score']
    gameScore.classList.add('game-score')
    let gameTries = document.createElement('td')
    gameTries.innerHTML = allGames[i].game['player-tries']
    gameTries.classList.add('game-tries')
    let newRow = document.createElement('tr')
    newRow.appendChild(dateGame)
    newRow.appendChild(gameScore)
    newRow.appendChild(gameTries)
    console.log(newRow)
    scoreList.appendChild(newRow)
  }
}

//light dark mode
dayIcon.addEventListener('click', () => {
  nav.classList.toggle('nav-day')
  nightIcon.classList.toggle('fa-ghost-day')
  dayIcon.classList.toggle('fa-umbrella-beach-day')
  gamePlayInfo.classList.toggle('game-play-info-day')
  highScoreList.classList.toggle('high-score-list-day')
  infoPage.classList.toggle('info-page-day')
})

nightIcon.addEventListener('click', () => {
  nav.classList.toggle('nav-day')
  nightIcon.classList.toggle('fa-ghost-day')
  dayIcon.classList.toggle('fa-umbrella-beach-day')
  gamePlayInfo.classList.toggle('game-play-info-day')
  highScoreList.classList.toggle('high-score-list-day')
  infoPage.classList.toggle('info-page-day')
})
