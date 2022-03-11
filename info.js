const dayNight = document.querySelector('.day-night')
const nav = document.querySelector('nav')
const infoPage = document.querySelector('.info-page')
const dayIcon = document.querySelector('.fa-umbrella-beach')
const nightIcon = document.querySelector('.fa-ghost')
const gamePlayInfo = document.querySelector('.game-play-info')
const highScoreList = document.querySelector('.high-score-list')

//local storage

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
