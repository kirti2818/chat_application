import { Input } from '@nextui-org/react'
import React from 'react'
import {io} from "socket.io-client"

const Chat = () => {
  return (
    <div>
      <Input/>
      <Button onClick={()=>socket.emit("Message","Hello")}>send</Button>
    </div>
  )
}

export default Chat
