const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const W = canvas.width = window.innerWidth
const H = canvas.height = window.innerHeight

let screenCenter = { X: W/2, Y: H/2, }

// generate a random number of the given range min to max
function random(min, max) {
  return (Math.floor(Math.random()*(max - min)) + min)
}

let planets = []
let stars = []

// create the Sun, the Moon and a few planets
let sun = new SpaceObject(screenCenter, 40, 0, 0, 'yellow')
let mercury = new SpaceObject(sun, 4.9, 141, 4.15, 'grey')
let venus = new SpaceObject(sun, 12.1, 248, 1.62, 'khaki')
let earth = new SpaceObject(sun, 12.7, 332, 1, 'blue')
let moon = new SpaceObject(earth, 3.5, 25, 13.5, 'beige')
let mars = new SpaceObject(sun, 6.8, 483, 0.53, 'coral')

planets.push(...[sun, mercury, venus, earth, moon, mars])

// create lots of stars
while(stars.length < 1000) {
  let randomCenter = {
    X: random(-W/2, W/2),
    Y: random(-W/2, W/2),
  }
  stars.push(new SpaceObject(randomCenter, 1, 0, 0, 'white'))
}

// rotate the canvas
function rotate(objects) {
  ctx.save()
  ctx.translate(W/2, H/2)
  let angle = - Math.PI * ( count / 10000 )
  ctx.rotate(angle)
  draw(objects)
  ctx.restore()
}

// show objects
function draw(objects) {
  for(let object of objects) {
    object.render().update()
  }
}

// show the Time counter
let count = 0
function showTimePassed() {
  let totalDays = Math.ceil(count * 365 / 2000)
  let years = Math.floor(count / 2000)
  let days = totalDays - years * 365
  let yearText = years + ' year(s)'
  let dayText = days + ' day(s)'

  ctx.fillStyle = 'white'
  ctx.textAlign = 'right'
  ctx.textBaseline = 'top'
  ctx.font = '48px monospace'
  ctx.fillText(yearText, 300, 50)
  ctx.fillText(dayText, 300, 120)
  
  count++
}

// show the name of canvas
function showCanvasName() {
  ctx.fillStyle = 'white'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  ctx.font = '24px fantasy'
  ctx.fillText('Solar System Model', 20, H-50)
}

// clean the canvas
function cleanCanvas() {
  ctx.clearRect(0, 0, W, H)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, W, H)
} 

// launch the model
function loop() {
  cleanCanvas()

  draw(planets)
  rotate(stars)
  showTimePassed()
  showCanvasName()

  requestAnimationFrame(loop)
}

loop()
