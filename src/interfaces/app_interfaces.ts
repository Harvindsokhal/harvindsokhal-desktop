import { Dispatch, SetStateAction } from 'react'

export interface IShow {
  notes: boolean
  bin: boolean
  appstore: boolean
  safari: boolean
}

export interface IShowProps {
  setShow: Dispatch<SetStateAction<IShow>>
}
