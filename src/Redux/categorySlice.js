import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    text : 'all'
}

const categorySlice = createSlice({
    name : 'category',
    initialState,
    reducers : {
        setCategory : (state , category) => {
            state.text = category
        }
    }
})

export const {setCategory} = categorySlice.actions
export default categorySlice.reducer