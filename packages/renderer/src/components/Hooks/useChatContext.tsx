import React, { useContext } from "react";
import { UseChatContextType } from "./chatContext";
import ChatContextProvider  from "./chatContext";


const UseChatContext = (): UseChatContextType => {
    return useContext(ChatContextProvider)
}

export default UseChatContext