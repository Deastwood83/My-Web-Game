const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1905
canvas.height = 750

class Projectile {
    constructor({ position, velocity, radius, color }) {
        this.velocity = velocity
        this.position = position

        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Projectile {
    constructor({ position, velocity }) {
        this.velocity = velocity
        this.position = position

        const image1 = new Image()
        image1.src = './assets/Explosion_1_006.png'

        this.image = image1
        this.width = 75
        this.height = 75

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}



class Player {
    constructor(xStart, yStart, img) {
        //add x and y position for where the player starts
        this.position = {
            x: xStart,
            y: yStart
        }
        //add a velocity for when the player begins moving
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = img

        this.image = image
        this.width = 150
        this.height = 150
        this.opacity = 1
    }

    //draw is a canvas function used to add elements to the canvas
    draw() {
        c.globalAlpha = this.opacity
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    //update function used to update x and y position of character when moving
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
    }
}

const firstPlayer = new Player(150, 250, './assets/player 1 ship.png')
const secondPlayer = new Player(1500, 250, './assets/player 2 ship.png')
const projectiles = []
const particles = []
let game = {
    over1: false,
    over2: false

}



//create animate function to repeatidly load images
function animate() {
    if (game.over1 == true || game.over2 == true) {
        if (game.over1 == true && game.over2 == false) { 
            var div2 = document.createElement('div')
            div2.style.width = '940px'
            div2.style.height = '200px'
            div2.style.color = 'blue'
            div2.style.background = "url('./assets/Space-PNG-Pic.gif'"
            div2.innerHTML = 'Player 2 Wins'
            div2.style.fontSize = '90px'
            div2.style.textAlign = 'center'
            div2.style.position = 'absolute'
            div2.style.top = '765px'
            div2.style.left = '973px'
            document.body.appendChild(div2)
        return
        }
        else if(game.over2 == true && game.over1 == false){
            var div1 = document.createElement('div')
        div1.style.width = '940px'
        div1.style.height = '200px'
        div1.style.color = 'red'
        div1.style.background = "url('./assets/Space-PNG-Pic.gif'"
        div1.innerHTML = 'Player 1 Wins'
        div1.style.fontSize = '90px'
        div1.style.textAlign = 'center'
        div1.style.position = 'absolute'
        div1.style.top = '765px'
        div1.style.left = '9px'
        document.body.appendChild(div1)
        return
        }
    }
    else {
        //fillStyle and fillRect allow modification of canvas css
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        //requestAnimationFrame to repeatidly call the animate function
        window.requestAnimationFrame(animate)
        firstPlayer.update()
        secondPlayer.update()
        //use forEach on the projectiles array to keep adding projectiles when needed
        projectiles.forEach(Projectile => {
            Projectile.update()
        })

        projectiles.forEach((projectile, index) => {
            if (projectile.position.x > firstPlayer.position.x + firstPlayer.width / 1.5 ||
                projectile.position.x + projectile.width / 1.5 < firstPlayer.position.x ||
                projectile.position.y > firstPlayer.position.y + firstPlayer.height / 1.5 ||
                projectile.position.y + projectile.height / 1.5 < firstPlayer.position.y) {
                //no collide
            }
            else {
                console.log('collided')
                projectiles.splice(index, 1)
                firstPlayer.opacity = 0
                setTimeout(function () {
                    game.over1 = true
                }, 50)

            }

        })

        projectiles.forEach((projectile, index) => {
            if (projectile.position.x > secondPlayer.position.x + secondPlayer.width / 1.5 ||
                projectile.position.x + projectile.width / 1.5 < secondPlayer.position.x ||
                projectile.position.y > secondPlayer.position.y + secondPlayer.height / 1.5 ||
                projectile.position.y + projectile.height / 1.5 < secondPlayer.position.y) {
                //no collide
            }
            else {
                console.log('collided')
                projectiles.splice(index, 1)
                secondPlayer.opacity = 0
                setTimeout(function () {
                    game.over2 = true
                }, 50)
            }
        })
    }
}
animate()

//switch case for cleaner code 
addEventListener('keydown', ({ key }) => {
    if (game.over1 || game.over2 === true) return
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
        case ' ':
            projectiles.push(new Projectile({
                position: {
                    //credit from chris courses on how to fire projectiles from player position
                    x: firstPlayer.position.x + firstPlayer.height / 2 + 100,
                    y: firstPlayer.position.y
                },
                velocity: {
                    x: 3,
                    y: 0
                }
            }))

    }
})

addEventListener('keyup', ({ key }) => {
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

addEventListener('keydown', ({ key }) => {
    if (game.over1 || game.over2 === true) return
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
        case 'Enter':
            projectiles.push(new Projectile({
                position: {
                    //credit from chris courses on how to fire projectiles from player position
                    x: secondPlayer.position.x + secondPlayer.height / 2 - 200,
                    y: secondPlayer.position.y
                },
                velocity: {
                    x: -3,
                    y: 0
                }
            }))
    }
})

addEventListener('keyup', ({ key }) => {
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