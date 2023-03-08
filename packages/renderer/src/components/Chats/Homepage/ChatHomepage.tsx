import React, { FC } from 'react';
import { auth } from '../../Hooks/firebaseConfig';
import UseChatContext from '../../Hooks/useChatContext';
import ChatofRoom from '../chatOfRoom/ChatofRoom';
import Sidebar from '../Sidebar/Sidebar';

const ChatHomepage: FC = () => {
    console.log(auth.currentUser);
    
  
    return (
        <div className='flex h-screen w-full'>
            <div className='flex-[2] '>
                <Sidebar />
            </div>
            <div className='flex flex-[6] '>
                <ChatofRoom />
            </div>
        </div>
    )
}

export default ChatHomepage