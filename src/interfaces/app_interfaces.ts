import { Dispatch, SetStateAction } from 'react'

export interface IShow {
  notes: boolean
  bin: boolean
  appstore: boolean
}

export interface IShowProps {
  setShow: Dispatch<SetStateAction<IShow>>
}
