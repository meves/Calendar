import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../redux-store"

export interface ModalState {
    'new-task': boolean
    'submit-create': boolean
    'submit-update': boolean
    'submit-delete': boolean
    'task-data': boolean
}

export type ModalType = keyof ModalState

const initialState: ModalState = {
    'new-task': false,
    'submit-create': false,
    'submit-update': false,
    'submit-delete': false,
    'task-data': false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalOpen: (state, action: PayloadAction<ModalType>) => {
            state[action.payload] = true
        },
        setModalClose: (state, action: PayloadAction<ModalType>) => {
            state[action.payload] = false
        }
    }
})

export const {
    setModalOpen,
    setModalClose

} = modalSlice.actions

export default modalSlice.reducer

export const selectModal = (state: RootState) => state.modal