import React, { FC, useRef, useEffect } from "react";
import { auth } from "../../Hooks/firebaseConfig";
import { messageProps } from "../../Hooks/stateInterface";

const Messages = ({ sendBy, messageText, photoOfSender }: messageProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        //  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
         scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, []);
    return (
        <div className="flex  ">
            {/* <div className=" py-2">
                <img src={sendBy === auth.currentUser?.displayName ? auth.currentUser?.photoURL : 'https://www.pngkey.com/png/full/315-3151964_thinking-meme-png-funny-thinking-emoji-png.png'} alt='photo' className="w-10 h-10 rounded-full object-cover" />
            </div> */}
            <div className="ml-2"  ref={scrollRef}>
                <div className="py-2">
                    <span className="text-[#a6a6a6] text-sm ">{sendBy}:</span>
                </div>
                <div className="bg-[#2F3245]/40 break-all text-white px-5 py-2 rounded-2xl">
                    <span>{messageText}</span>
                </div>
            </div>
        </div>
    )
}

export default Messages