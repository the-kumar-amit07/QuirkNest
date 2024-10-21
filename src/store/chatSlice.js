import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    messages:[],
    loading: false,
    error: null
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state,action) => {
            state.loading = false;
            state.error = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
            state.loading = false;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
            state.loading = false
        },
        clearMessage: (state,action) => {
            state.messages = state.messages.filter(
                (message)=> message.id !== action.payload
            )
            state.loading = false
        },
        updateMessage: (state, action) => {
            const index = state.messages.findIndex(
                (message) => message.id === action.payload.id
            )
            if (index !== -1) {
                state.messages[index] = action.payload
            }
            state.loading = false
        }
    }
})

export const {
    setLoading,
    setError,
    setMessages,
    addMessage,
    clearMessage,
    updateMessage,
} = chatSlice.actions
    
export default chatSlice.reducer