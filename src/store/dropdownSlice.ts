import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DropwdownState {
  section: string | null
}

const initialState: DropwdownState = {
  section: null,
}

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<string | null>) => {
      state.section = action.payload
    },
  },
})

export const { setSection } = dropdownSlice.actions
export default dropdownSlice.reducer
