class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        framesCurrent = 0,
        framesElapsed = 0,
        framesHold = 5,
        offset = { x: 0, y: 0 },
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = framesCurrent
        this.framesElapsed = framesElapsed
        this.framesHold = framesHold
        this.offset = offset
    }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        imageSrc,
        scale = 1,
        framesMax = 1,
        framesCurrent = 0,
        framesElapsed = 0,
        framesHold = 5,
        offset = { x: 0, y: 0 },
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            framesCurrent,
            framesElapsed,
            framesHold,
            offset,
        })

        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 100,
            height: 50,
            offset,
        }
        this.isAttacking
        this.health = 100
    }

    update() {
        this.draw()
        this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (
            this.position.y + this.height + this.velocity.y >=
            canvas.height - 96
        ) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}