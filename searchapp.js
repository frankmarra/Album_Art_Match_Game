const SEARCH_DOMAIN =
  'https://api.discogs.com/database/search?page=1&per_page=20&'
const API_KEY = 'NFFuiOkGpBVELhAZbuku'
const SECRET_KEY = 'vuxkHlTcqAaVwlHKbSkgDqSXILszAMeW'
const searchButton = document.querySelector('.search-button')
const genreName = document.getElementById('search-input')
const searchResults = document.querySelector('.search-results')
let albumArray = []

//Search page function
const albumArtList = (album) => {
  album.forEach((alb) => {
    let title = alb.title
    let albumArt = alb.cover_image
    let gameChoice = {
      [title]: albumArt
    }
    albumArray.push(gameChoice)
    const wrapMaker = document.createElement('div')
    const divMaker = document.createElement('div')
    const titleMaker = document.createElement('h3')
    const imgMaker = document.createElement('img')
    divMaker.classList.add('album')
    wrapMaker.classList.add('wrapper')
    titleMaker.innerHTML = title
    imgMaker.src = albumArt
    wrapMaker.appendChild(imgMaker)
    divMaker.appendChild(titleMaker)
    divMaker.appendChild(wrapMaker)
    searchResults.appendChild(divMaker)
  })
  window.localStorage.setItem('albums', JSON.stringify(albumArray))
}

//Search page event listener
searchButton.addEventListener('click', async () => {
  window.localStorage.clear()
  albumArray.length = 0
  const albums = document.querySelectorAll('.album')
  for (let i = 0; i < albums.length; i++) {
    albums[i].remove()
  }
  let genreSearch = genreName.value
  let response = await axios.get(
    `${SEARCH_DOMAIN}label=${genreSearch}&key=${API_KEY}&secret=${SECRET_KEY}`
  )

  let album = response.data.results
  console.log(album)
  albumArtList(album)
})
