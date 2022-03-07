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
    box.innerText = gameArray[randomSymbol]
    box.classList.add(gameArray[randomSymbol])
    usedSymbol = gameArray.splice(randomSymbol, 1)
    box.addEventListener('click', () => {
      if (pickOne === '') {
        pickOne = box.innerText
      } else if (pickOne !== '' && pickTwo === '') {
        pickTwo = box.innerText
        console.log(pickOne, pickTwo)
        if (pickOne.value !== pickTwo.value) {
          pickOne = ''
          pickTwo = ''
        } else if (pickOne.value === pickTwo.value) {
          box.querySelectorAll(`.${pickOne}`).disabled
          pickOne = ''
          pickTwo = ''
        }
      }
    })
  })
}

gameStart(gameButtons)

// for (let i = 0; i < gameButtons.length; i++) {
//   gameButtons[i].addEventListener('click', () => {
//     if (pickOne === '') {
//       pickOne = gameButtons[i].innerText
//     } else if (pickOne !== '' && pickTwo === '') {
//       pickTwo = gameButtons[i].innerText
//       console.log(pickOne, pickTwo)
//       matchCheck(pickOne, pickTwo)
//     }
//   })
// }

// const matchCheck = (pickOne, pickTwo) => {
//   if (pickOne.value !== pickTwo.value) {
//     pickOne = ''
//     pickTwo = ''
//   } else if (pickOne.value === pickTwo.value) {
//     document.querySelectorAll(`.${pickOne}`).disabled
//     pickOne = ''
//     pickTwo = ''
//   }
// }
