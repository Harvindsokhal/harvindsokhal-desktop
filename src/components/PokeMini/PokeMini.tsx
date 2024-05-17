import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Sprite, Boundary, Rectangle, Monster } from './classes'
import { collisions } from './data/collisions'
import { battleZonesData } from './data/battleZones'
import { audio } from './data/audio'
import { attacks } from './data/attacks'
import Draggable from 'react-draggable'
import gsap from 'gsap'
import './PokeMini.scss'
import { IShowProps } from '../../interfaces/app_interfaces'

const PokeMini: FunctionComponent<IShowProps> = ({ setShow }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [keys] = useState({ w: false, a: false, s: false, d: false })

  const dialogueBoxRef = useRef<HTMLDivElement>(null)
  const userInterfaceRef = useRef<HTMLDivElement>(null)
  const enemyHealthBarRef = useRef<HTMLDivElement>(null)
  const playerHealthBarRef = useRef<HTMLDivElement>(null)
  const attacksBoxRef = useRef<HTMLDivElement>(null)
  const attackTypeRef = useRef<HTMLHeadingElement>(null)

  const queueRef = useRef<(() => void)[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          keys.w = true
          break
        case 'a':
          keys.a = true
          break
        case 's':
          keys.s = true
          break
        case 'd':
          keys.d = true
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          keys.w = false
          break
        case 'a':
          keys.a = false
          break
        case 's':
          keys.s = false
          break
        case 'd':
          keys.d = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [keys])

  useEffect(() => {
    const handleDialogueBoxClick = (e: MouseEvent) => {
      const target = e.currentTarget
      if (queueRef.current && queueRef.current.length > 0) {
        queueRef.current[0]()
        queueRef.current.shift()
      } else {
        if (target instanceof HTMLDivElement) {
          target.style.display = 'none'
        }
      }
    }

    const dialogueBox = dialogueBoxRef.current
    if (dialogueBox) {
      dialogueBox.addEventListener('click', handleDialogueBoxClick)
    }

    return () => {
      if (dialogueBox) {
        dialogueBox.removeEventListener('click', handleDialogueBoxClick)
      }
    }
  }, [])

  useEffect(() => {
    if (
      !dialogueBoxRef.current ||
      !userInterfaceRef.current ||
      !enemyHealthBarRef.current ||
      !playerHealthBarRef.current ||
      !attacksBoxRef.current ||
      !attackTypeRef.current
    ) {
      return
    }

    const dialogueBox = dialogueBoxRef.current
    const userInterface = userInterfaceRef.current
    const enemyHealthBar = enemyHealthBarRef.current
    const playerHealthBar = playerHealthBarRef.current
    const attacksBox = attacksBoxRef.current
    const attackType = attackTypeRef.current

    const canvas = canvasRef.current
    if (canvas == null) return

    //Canvas dimensions
    canvas.width = 1024
    canvas.height = 576

    const ctx = canvas.getContext('2d')
    if (ctx == null) return

    const offset = {
      x: -735,
      y: -610,
    }

    const collisionsMap = []

    for (let i = 0; i < collisions.length; i += 70) {
      collisionsMap.push(collisions.slice(i, 70 + i))
    }

    const battleZonesMap = []

    for (let i = 0; i < battleZonesData.length; i += 70) {
      battleZonesMap.push(battleZonesData.slice(i, 70 + i))
    }

    const boundaries: Boundary[] = []

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          )
        }
      })
    })

    const battleZones: Boundary[] = []

    battleZonesMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          battleZones.push(
            new Boundary({
              position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y,
              },
            })
          )
        }
      })
    })

    const image = new Image()
    image.src = require('./assets/Pellet Town.png')

    const foregroundImage = new Image()
    foregroundImage.src = require('./assets/foreground.png')

    const playerDownImage = new Image()
    playerDownImage.src = require('./assets/ACharDown.png')

    const playerUpImage = new Image()
    playerUpImage.src = require('./assets/ACharUp.png')

    const playerLeftImage = new Image()
    playerLeftImage.src = require('./assets/ACharLeft.png')

    const playerRightImage = new Image()
    playerRightImage.src = require('./assets/ACharRight.png')

    const player = new Sprite({
      position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2,
      },
      image: playerDownImage,
      frames: {
        max: 4,
        hold: 10,
        elapsed: 0,
        val: 0,
      },
      sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage,
      },
    })

    const background = new Sprite({
      position: { x: offset.x, y: offset.y },
      image: image,
    })

    const foreground = new Sprite({
      position: { x: offset.x, y: offset.y },
      image: foregroundImage,
    })

    const movables = [background, ...boundaries, foreground, ...battleZones]

    function rectangularCollision({
      rectangle1,
      rectangle2,
    }: {
      rectangle1: Rectangle
      rectangle2: Rectangle
    }) {
      return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
      )
    }

    const battle = {
      initiated: false,
    }
    let animationId: number

    const battleBackgroundImage = new Image()
    battleBackgroundImage.src = require('./assets/battleBackground.png')

    const battleBackgrond = new Sprite({
      position: {
        x: 0,
        y: 0,
      },
      image: battleBackgroundImage,
    })

    const charmanderSprite = new Image()
    charmanderSprite.src = require('./assets/charmanderSprite.png')

    const weedleSprite = new Image()
    weedleSprite.src = require('./assets/weedleSprite.png')

    const charmander = new Monster({
      position: {
        x: 280,
        y: 325,
      },
      image: charmanderSprite,
      frames: {
        max: 4,
        hold: 30,
        val: 0,
        elapsed: 0,
      },
      animate: true,
      isEnemy: false,
      name: 'Charmander',
      attacks: [attacks.Tackle, attacks.Fireball],
    })

    const weedle = new Monster({
      position: {
        x: 800,
        y: 100,
      },
      image: weedleSprite,
      frames: {
        max: 4,
        hold: 30,
        val: 0,
        elapsed: 0,
      },
      animate: true,
      isEnemy: true,
      name: 'Weedle',
      attacks: [attacks.Tackle],
    })

    let buttonsCreated = false

    const createButtons = (
      battleAnimationId: number,
      renderedSprites: Sprite[]
    ) => {
      dialogueBox.style.display = 'none'
      attacksBox.replaceChildren()

      userInterface.style.display = 'block'
      enemyHealthBar.style.width = '100%'
      playerHealthBar.style.width = '100%'

      charmander.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name
        attacksBox.append(button)

        button.addEventListener('mouseenter', (e: MouseEvent) => {
          const selectedAttack =
            attacks[(e.currentTarget as HTMLButtonElement).innerHTML]
          attackType.innerHTML = selectedAttack.type
          attackType.style.color = selectedAttack.color
        })

        button.addEventListener('click', (e: MouseEvent) => {
          const selectedAttack =
            attacks[(e.target as HTMLButtonElement).innerHTML]
          charmander.attack({
            attack: selectedAttack,
            recipiant: weedle,
            renderedSprites,
            dialogueBox,
            playerHealthBar,
            enemyHealthBar,
          })

          if (weedle.health <= 0) {
            queueRef.current.push(() => {
              weedle.faint(dialogueBox)
              queueRef.current.pop()
            })

            queueRef.current.push(() => {
              gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(battleAnimationId)
                  dialogueBox.style.display = 'none'
                  userInterface.style.display = 'none'
                  animate()

                  gsap.to('#overlappingDiv', {
                    opacity: 0,
                  })
                },
              })
            })
            battle.initiated = false
            audio.Map.play()
          }

          const randomAttack =
            weedle.attacks[Math.floor(Math.random() * weedle.attacks.length)]

          queueRef.current.push(() => {
            weedle.attack({
              attack: randomAttack,
              recipiant: charmander,
              renderedSprites,
              dialogueBox,
              playerHealthBar,
              enemyHealthBar,
            })
          })

          if (charmander.health <= 0) {
            queueRef.current.push(() => {
              charmander.faint(dialogueBox)
            })
            queueRef.current.push(() => {
              gsap.to('#overlappingDiv', {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(battleAnimationId)
                  userInterface.style.display = 'none'
                  dialogueBox.style.display = 'none'
                  animate()

                  gsap.to('#overlappingDiv', {
                    opacity: 0,
                  })
                },
              })
            })
            battle.initiated = false
            audio.Map.play()
          }
        })
      })
    }

    const animateBattle = () => {
      const battleAnimationId = window.requestAnimationFrame(animateBattle)
      battleBackgrond.draw(ctx)
      const renderedSprites = [weedle, charmander]
      renderedSprites.forEach((sprites) => {
        sprites.draw(ctx)
      })

      if (battle.initiated) {
        userInterface.style.display = 'block'
      }

      if (!battle.initiated) {
        playerHealthBar.style.width = `${charmander.health}%`
        enemyHealthBar.style.width = `${weedle.health}%`
      }

      if (!buttonsCreated) {
        createButtons(battleAnimationId, renderedSprites)
        buttonsCreated = true
      }
    }

    const animate = () => {
      animationId = window.requestAnimationFrame(animate)
      background.draw(ctx)

      boundaries.forEach((boundary) => {
        boundary.draw(ctx)
      })
      battleZones.forEach((battleZone) => {
        battleZone.draw(ctx)
      })

      player.draw(ctx)
      foreground.draw(ctx)

      let moving = true
      player.animate = false

      if (battle.initiated) return

      if (keys.w || keys.a || keys.s || keys.d) {
        for (let i = 0; i < battleZones.length; i++) {
          const battleZone = battleZones[i]
          const overlappingArea =
            (Math.min(
              player.position.x + player.width,
              battleZone.position.x + Boundary.width
            ) -
              Math.max(player.position.x, battleZone.position.x)) *
            (Math.min(
              player.position.y + player.height,
              battleZone.position.y + Boundary.height
            ) -
              Math.max(player.position.y, battleZone.position.y))
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...battleZone,
                position: {
                  x: battleZone.position.x,
                  y: battleZone.position.y,
                },
                width: Boundary.width,
                height: Boundary.height,
              },
            }) &&
            overlappingArea > (player.width * player.height) / 2 &&
            Math.random() < 0.01
          ) {
            window.cancelAnimationFrame(animationId)

            audio.Map.stop()
            audio.initBattle.play()
            audio.battle.play()

            battle.initiated = true
            gsap.to('#overlappingDiv', {
              opacity: 1,
              repeat: 3,
              yoyo: true,
              duration: 0.4,
              onComplete() {
                gsap.to('#overlappingDiv', {
                  opacity: 1,
                  duration: 0.4,
                  onComplete() {
                    animateBattle()
                    gsap.to('#overlappingDiv', {
                      opacity: 0,
                      duration: 0.4,
                    })
                  },
                })
              },
            })
            break
          }
        }
      }

      if (keys.w) {
        player.animate = true
        player.image = player.sprites.up

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
                width: Boundary.width,
                height: Boundary.height,
              },
            })
          ) {
            moving = false
            break
          }
        }
        if (moving)
          movables.forEach((movable) => {
            movable.position.y += 3
          })
      }

      if (keys.a) {
        player.animate = true
        player.image = player.sprites.left

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
                width: Boundary.width,
                height: Boundary.height,
              },
            })
          ) {
            moving = false
            break
          }
        }

        if (moving)
          movables.forEach((movable) => {
            movable.position.x += 3
          })
      }

      if (keys.s) {
        player.animate = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
                width: Boundary.width,
                height: Boundary.height,
              },
            })
          ) {
            moving = false
            break
          }
        }
        if (moving) {
          movables.forEach((movable) => {
            movable.position.y -= 3
          })
        }
      }

      if (keys.d) {
        player.animate = true
        player.image = player.sprites.right

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
                width: Boundary.width,
                height: Boundary.height,
              },
            })
          ) {
            moving = false
            break
          }
        }

        if (moving)
          movables.forEach((movable) => {
            movable.position.x -= 3
          })
      }
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [keys, queueRef])

  return (
    <Draggable>
      <div className="pokemini-container">
        <div className="pokemini-taskbar">
          <div className="dots-container">
            <div
              id="dot-one"
              className="browser-dot"
              onClick={() =>
                setShow((prevState) => {
                  return { ...prevState, pokeMini: !prevState.pokeMini }
                })
              }
            />
            <div id="dot-two" className="browser-dot" />
            <div id="dot-three" className="browser-dot" />
          </div>
          <p>PokiMini</p>
        </div>
        <div style={{ display: 'inline-block', position: 'relative' }}>
          <div
            id="overlappingDiv"
            style={{
              backgroundColor: 'black',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          ></div>

          <canvas ref={canvasRef}></canvas>

          <div
            ref={userInterfaceRef}
            id="userInterface"
            style={{ display: 'none' }}
          >
            <div
              style={{
                backgroundColor: 'white',
                width: '250px',
                position: 'absolute',
                top: '50px',
                left: '50px',
                border: '4px black solid',
                padding: '12px',
              }}
            >
              <h1 style={{ fontSize: '16px' }}>Weedle</h1>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    height: '5px',
                    backgroundColor: 'red',
                    marginTop: '10px',
                  }}
                ></div>
                <div
                  ref={enemyHealthBarRef}
                  id="enemyHealthBar"
                  style={{
                    height: '5px',
                    backgroundColor: 'green',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                ></div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                width: '250px',
                position: 'absolute',
                top: '330px',
                right: '50px',
                border: '4px black solid',
                padding: '12px',
              }}
            >
              <h1 style={{ fontSize: '16px' }}>Charmander</h1>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    height: '5px',
                    backgroundColor: 'red',
                    marginTop: '10px',
                  }}
                ></div>
                <div
                  ref={playerHealthBarRef}
                  id="playerHealthBar"
                  style={{
                    height: '5px',
                    backgroundColor: 'green',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                ></div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: 'white',
                height: '140px',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderTop: '4px black solid',
              }}
            >
              <div
                ref={dialogueBoxRef}
                id="dialogueBox"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'white',
                  padding: '12px',
                  cursor: 'pointer',
                }}
              >
                test
              </div>
              <div
                ref={attacksBoxRef}
                id="attacksBox"
                style={{
                  width: '66.66%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              ></div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '33.33%',
                  borderLeft: '4px black solid',
                }}
              >
                <h1
                  ref={attackTypeRef}
                  id="attackType"
                  style={{ fontSize: '16px' }}
                >
                  Attack Type
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default PokeMini
