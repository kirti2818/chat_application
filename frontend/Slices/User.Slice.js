import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data : {},
    OtherMemberId : "",
    RecentChatData : {},
    ChatMessageData : [],
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
        },
        AddChatMessageData : (state,action)=>{
            state.ChatMessageData = [...state.ChatMessageData , action.payload]
        },
        GetChatMessageData : (state,action)=>{
            // forEach((el)=>)
            // if(state.RecentChatData._id == state.ChatMessageData._id){
               
            // }
        }
    })
})

export const {AddOtherMemberId,RecentChatData,AddChatMessageData} = ChatSlice.actions;
export default ChatSlice.reducer;