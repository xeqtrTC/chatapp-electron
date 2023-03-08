import type { ReactElement } from "react";
import React, { createContext, useState } from "react";

const ChatContext = () => {
    const [idOfGroup, setIdOfGroup] = useState<string>('')
    const [imageUploadState, setImageUploadState] = useState<boolean>(false);
    return { idOfGroup, setIdOfGroup, imageUploadState, setImageUploadState } 
}

export type UseChatContextType = ReturnType<typeof ChatContext>

const initState: UseChatContextType = {
    idOfGroup: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIdOfGroup: () => {},
    imageUploadState: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setImageUploadState: () => {}
}

const ChatContextCreate = createContext<UseChatContextType>(initState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ChatContextProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <ChatContextCreate.Provider value={ChatContext()}>
            {children}
        </ChatContextCreate.Provider>
    )
}

export default ChatContextCreate