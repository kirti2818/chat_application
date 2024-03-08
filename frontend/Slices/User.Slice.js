import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {},
    OtherMemberId : "",
    RecentChatData : {},
}

const ChatSlice = createSlice({
    name : "Chat_Slice",
    initialState,
    reducers : ({
        AddOtherMemberId : (state,action)=>{
            state.OtherMemberId = action.payload
        },
        RecentChatData : (state,action)=>{
            state.RecentChatData = action.payload
        }
    })
})

export const {AddOtherMemberId,RecentChatData} = ChatSlice.actions;
export default ChatSlice.reducer;