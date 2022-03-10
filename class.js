//credit to chris courses on how to create and add moving particles on a canvas
class Particle {
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
