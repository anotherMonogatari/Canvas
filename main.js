'use strict'

const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const c = canvas.getContext('2d')
const PI = Math.PI

// //rect
// c.fillStyle = 'red'
// c.fillRect(50, 50, 30, 30)
// c.fillStyle = 'black'
// c.fillRect(150, 250, 30, 30)
// c.fillStyle = 'blue'
// c.fillRect(250, 150, 30, 30)
// c.fillStyle = 'green'
// c.fillRect(350, 50, 30, 30)

// //lines
// c.beginPath()
// c.moveTo(150,55)
// c.lineTo(100,100)
// c.lineTo(200,500)
// c.lineTo(500,20)
// c.strokeStyle = 'orange'
// c.stroke()

// //arc

// c.beginPath()
// c.arc(550,550,50,0,Math.PI*2)
// c.strokeStyle = 'green'
// c.stroke()


// //for
// for (let i = 0; i < 50; i++) {
//   let x = Math.random() * window.innerWidth
//   let y = Math.random() * window.innerHeight
//   let radius = (Math.random() * 60).toFixed(1)
//   let color = ['red','green','blue','black']

//   c.beginPath()
//   c.arc(x,y,radius,0,Math.PI*2)
//   c.strokeStyle = color[(Math.random()*4).toFixed()]
//   c.stroke()
// }

//interacting
let mouseCoord = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function(event) {
  mouseCoord.x = event.x
  mouseCoord.y = event.y
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  recreateCanvas()
})

const colors = [
  '#BDF7F1',
  '#A32F22',
  '#FFD07A',
  '#007C6E',
  '#76ABBF'
]

function Circle(x,y,r,dx,dy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.minRad = r;
  this.maxRad = r*6;
  this.dx = dx;
  this.dy = dy;
  this.color = colors[(Math.random() * colors.length).toFixed()]

  this.draw = function() {
    c.beginPath()
    c.arc(this.x,this.y,this.r,0,PI*2)
    c.stroke()
    c.fillStyle = this.color
    c.fill()
  }

  this.update = function() {
    if(this.x + this.r > innerWidth || this.x - this.r < 0) {
      this.dx = -this.dx
    }
    if(this.y + this.r > innerHeight || this.y - this.r < 0) {
      this.dy = -this.dy
    }
    if (mouseCoord.x - this.x < 50 && mouseCoord.x - this.x > -50 && mouseCoord.y - this.y < 50 && mouseCoord.y - this.y > -50) {
      if (this.r < this.maxRad) {
        this.r += 3
      }
       
    } else if (this.r > this.minRad) {
      this.r -= 0.5
    }
    this.x += this.dx
    this.y += this.dy
  }
}

let cArray = []

function recreateCanvas() {
  cArray = [];

  for (let i = 0; i < 300; i++) {
    let r = (Math.random() * 4) + 2
    let x = Math.random() * (innerWidth - 2*r) + r
    let y = Math.random() * (innerHeight -2*r) + r
    let dx = (Math.random() - 0.5) * 2
    let dy = (Math.random() - 0.5) * 2
    
    
    let circle = new Circle(x,y,r,dx,dy)
    cArray.push(circle)
  }
}

recreateCanvas()

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0,0,innerWidth,innerHeight)

  for (let i = 0; i < cArray.length; i++) {
    cArray[i].draw()
    cArray[i].update()
  }
}
animate()


