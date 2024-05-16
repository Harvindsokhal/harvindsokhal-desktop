interface Attack {
  name: string
  damage: number
  type: string
  color: string
}

export const attacks: { [key: string]: Attack } = {
  Tackle: {
    name: 'Tackle',
    damage: 10,
    type: 'Normal',
    color: 'black',
  },

  Fireball: {
    name: 'Fireball',
    damage: 25,
    type: 'Fire',
    color: 'red',
  },
}
