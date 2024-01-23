import { Dispatch, SetStateAction } from 'react'

export interface IShow {
    notes: boolean
    bin: boolean
  }

export interface IShowProps {
    show: IShow
    setShow: Dispatch<SetStateAction<IShow>>
  }