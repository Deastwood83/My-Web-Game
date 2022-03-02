const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1885
canvas.height = 950

class Player {
    constructor(xStart, yStart, img) {
        //add x and y position for where the player starts
        this.position = {
            x: xStart,
            y: yStart
        }
        //add a velocity for when the player begins moving
        this.velocity = {
            x:0,
            y:0
        }
        
        const image = new Image()
        image.src = img
    
        this.image = image
        this.width = 200
        this.height = 200
    }

    //draw is a canvas function used to add elements to the canvas
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    //update function used to update x and y position of character when moving
    update(){
        if (this.image) {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        }
    }
}

const firstPlayer = new Player(150, 350, './assets/player 1 ship.png')
const secondPlayer = new Player(1500, 350, './assets/player 2 ship.png')

//create animate function to load image fast 
function animate(){
    //fillStyle and fillRect allow modification of canvas css
    c.fillStyle= 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    //requestAnimationFrame to repeatidly call the animate function
    window.requestAnimationFrame(animate)
    firstPlayer.draw()
    firstPlayer.update()
    secondPlayer.draw()
    secondPlayer.update()
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

addEventListener('keydown', ({key}) =>{
    switch (key) {
        case '4':
            secondPlayer.velocity.x = -5
            break
        case '6':
            secondPlayer.velocity.x = +5
            break
        case '5':
            secondPlayer.velocity.y = +5
            break
        case '8':
            secondPlayer.velocity.y = -5
            break
    }
})

addEventListener('keyup', ({key}) =>{
    switch (key) {
        case '4':
            secondPlayer.velocity.x = 0
            break
        case '6':
            secondPlayer.velocity.x = 0
            break
        case '5':
            secondPlayer.velocity.y = 0
            break
        case '8':
            secondPlayer.velocity.y = 0
            break
    }
})