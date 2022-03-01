const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1800
canvas.height = 900

class Player1 {
    constructor() {
        this.position = {
            x: 200,
            y: 200
        }
        this.velocity = {
            x:0,
            y:0
        }
        
        const image = new Image()
        image.src = './assets/player 1 ship.png'
    
        this.image = image
        this.width = 250
        this.height = 250
    }


    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        if (this.image) {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        }
    }
}

const firstPlayer = new Player1()
firstPlayer.draw()

//create animate function to load image fast 
function animate(){
    //fillStyle and fillRect allow modification of canvas css
    c.fillStyle= 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    window.requestAnimationFrame(animate)
    firstPlayer.draw()
    firstPlayer.update()
}
animate()

//switch case for cleaner code 
addEventListener('keydown', ({key}) =>{
    switch (key) {
        case 'a':
            firstPlayer.velocity.x = -5
            break
        case 'd':
            firstPlayer.velocity.x = +5
            break
        case 's':
            firstPlayer.velocity.y = +5
            break
        case 'w':
            firstPlayer.velocity.y = -5
            break
    }
})

addEventListener('keyup', ({key}) =>{
    switch (key) {
        case 'a':
            firstPlayer.velocity.x = 0
            break
        case 'd':
            firstPlayer.velocity.x = 0
            break
        case 's':
            firstPlayer.velocity.y = 0
            break
        case 'w':
            firstPlayer.velocity.y = 0
            break
    }
})