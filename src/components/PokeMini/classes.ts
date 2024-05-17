import { audio } from './data/audio'
import gsap from 'gsap'

export interface Rectangle {
  position: { x: number; y: number }
  width: number
  height: number
}

interface Position {
  x: number
  y: number
}

interface Frames {
  max: number
  hold: number
  val: number
  elapsed: number
}

interface Sprites {
  up: HTMLImageElement
  down: HTMLImageElement
  left: HTMLImageElement
  right: HTMLImageElement
}

interface SpriteOptions {
  position: Position
  image: HTMLImageElement
  frames?: Frames
  sprites?: Sprites
  animate?: boolean
  rotation?: number
}

interface Attack {
  name: string
  damage: number
}

interface MonsterOptions {
  position: Position
  image: HTMLImageElement
  frames?: Frames
  sprites?: {
    up: HTMLImageElement
    down: HTMLImageElement
    left: HTMLImageElement
    right: HTMLImageElement
  }
  animate?: boolean
  rotation?: number
  isEnemy?: boolean
  name: string
  attacks: Attack[]
}

export class Sprite {
  position: Position
  image: HTMLImageElement
  frames: Frames
  animate?: boolean
  sprites: Sprites
  opacity: number
  rotation: number
  width: number
  height: number

  constructor({
    position,
    image,
    frames = { max: 1, hold: 10, val: 0, elapsed: 0 },
    sprites,
    animate = false,
    rotation = 0,
  }: SpriteOptions) {
    this.position = position
    this.image = new Image()
    this.frames = { ...frames, val: 0, elapsed: 0 }

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.image.src = image.src

    this.animate = animate
    this.sprites = sprites!
    this.opacity = 1
    this.rotation = rotation
  }

  draw(c: CanvasRenderingContext2D) {
    c.save()
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    c.rotate(this.rotation)
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
    c.globalAlpha = this.opacity
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }
}

export class Monster extends Sprite {
  name: string
  isEnemy: boolean
  health: number
  attacks: Attack[]
  initialHealth: number

  constructor({
    position,
    image,
    frames = { max: 1, hold: 10, val: 0, elapsed: 0 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks,
  }: MonsterOptions) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
    })
    this.name = name
    this.isEnemy = isEnemy
    this.health = 100
    this.attacks = attacks

    this.initialHealth = this.health
  }

  resetStats() {
    this.health = this.initialHealth
  }

  faint(dialogueBox: HTMLElement) {
    dialogueBox.innerHTML = this.name + ' fainted!'
    gsap.to(this.position, {
      y: this.position.y + 20,
    })
    gsap.to(this, {
      opacity: 0,
      duration: 5,
      onComplete: () => {
        this.resetStats()
        gsap.to(this, {
          opacity: 1,
        })
        gsap.to(this.position, {
          y: this.position.y - 20,
        })
      },
    })
    audio.battle.stop()
    audio.victory.play()
  }

  attack({
    attack,
    recipiant,
    renderedSprites,
    dialogueBox,
    playerHealthBar,
    enemyHealthBar,
  }: {
    attack: Attack
    recipiant: Monster
    renderedSprites: Sprite[]
    dialogueBox: HTMLElement
    playerHealthBar: HTMLElement
    enemyHealthBar: HTMLElement
  }) {
    dialogueBox.style.display = 'block'
    dialogueBox.innerHTML = this.name + ' used ' + attack.name
    let healthBar = enemyHealthBar
    if (this.isEnemy) healthBar = playerHealthBar

    let rotation = 1
    if (this.isEnemy) rotation = -2.2

    recipiant.health -= attack.damage

    switch (attack.name) {
      case 'Fireball':
        audio.initFireball.play()
        const fireballImage = new Image()
        fireballImage.src = require('./assets/fireball.png')

        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10,
            val: 0,
            elapsed: 0,
          },
          animate: true,
          rotation,
        })

        renderedSprites.splice(1, 0, fireball)

        gsap.to(fireball.position, {
          x: recipiant.position.x,
          y: recipiant.position.y,
          onComplete: () => {
            audio.fireBallHit.play()
            gsap.to(healthBar, {
              width: recipiant.health + '%',
            })

            gsap.to(recipiant.position, {
              x: recipiant.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            })

            gsap.to(recipiant, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            })
            renderedSprites.splice(1, 1)
          },
        })

        break

      case 'Tackle':
        const tl = gsap.timeline()

        let movementDistance = 20
        if (this.isEnemy) movementDistance = -20

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              audio.tackleHit.play()
              gsap.to(healthBar, {
                width: recipiant.health + '%',
              })

              gsap.to(recipiant.position, {
                x: recipiant.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              })

              gsap.to(recipiant, {
                opacity: 0,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              })
            },
          })
          .to(this.position, {
            x: this.position.x,
          })

        break
    }
  }
}

export class Boundary {
  position: Position
  static width: number = 48
  static height: number = 48
  constructor({ position }: { position: Position }) {
    this.position = position
  }

  draw(c: CanvasRenderingContext2D) {
    c.fillStyle = 'rgba(255, 0, 0, 0)'
    c.fillRect(
      this.position.x,
      this.position.y,
      Boundary.width,
      Boundary.height
    )
  }
}
