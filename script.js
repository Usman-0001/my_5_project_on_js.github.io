const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timelist = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#f2b3b3', '#6f64ed', '#64d4ed', '#64ed8b', '#d2ed64', '#ed8464']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add("up")
})
  
timelist.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute("data-time"))
    screens[1].classList.add("up")
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains("circle")) {
    score++
    event.target.remove()
    createRandomCircle()
  }
  
})


function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
 
}

function decreaseTime() {

  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }

  
}

function setTime(time) {
  timeEl.innerHTML = `00:${time}`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)

  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  const color1 = getRandomColor()
  const color2 = getRandomColor()
  const color3 = getRandomColor()


  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 47%, ${color3} 100%)`

  board.append(circle)

}


function getRandomNumber(min, max) {
  return Math.round(Math.random()*(max-min)+min)
}


function finishGame() {
  timeEl.parentNode.classList.add("hide")
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}