import { Dispatch, SetStateAction } from 'react'

export interface IShow {
  notes: boolean
  bin: boolean
  appstore: boolean
  safari: boolean
  message: boolean
  pokeMini: boolean
  snakeGame: boolean
}

export interface IShowProps {
  setShow: Dispatch<SetStateAction<IShow>>
}
