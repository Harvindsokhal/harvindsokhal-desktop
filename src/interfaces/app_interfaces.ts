import { Dispatch, SetStateAction } from 'react'

export interface IShow {
    notes: boolean
    bin: boolean
  }

export interface IShowProps {
    setShow: Dispatch<SetStateAction<IShow>>
  }