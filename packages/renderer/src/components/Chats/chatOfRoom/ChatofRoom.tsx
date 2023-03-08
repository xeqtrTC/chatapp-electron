import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import React, { FC, useState, FormEvent, useEffect, useRef } from "react";
import { AiOutlineArrowUp } from 'react-icons/ai'
import { auth, db } from "../../Hooks/firebaseConfig";
import { messageArray } from "../../Hooks/stateInterface";
import UseChatContext from "../../Hooks/useChatContext";
import Loader from "../../Loader/Loader";
import Messages from "./Messages";

const ChatofRoom: FC = () => {

    const {idOfGroup, setIdOfGroup} = UseChatContext();
    const [messageSent, setMessageSent] = useState<string>('');
    const [messageArray, setMessageArray] = useState<messageArray[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    console.log(loading);
    const fetchData = async () => {
        const messageCollection = collection(db, 'messages', idOfGroup, 'messages');
        const q = query(messageCollection, orderBy('sentAt'))
        setLoading(true);
        const unsubscribe = onSnapshot(q, (querySnapchat) => {
            let messagePush: messageArray[] = []
            querySnapchat.forEach((doc) => {
                messagePush.push({...doc.data(), id: doc.id})
            })
            setMessageArray(messagePush);
            setLoading(false);
        })
        return () => unsubscribe()
    }

    const addMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const sendMessageCollection = collection(db, 'messages', idOfGroup, 'messages');
        if ( messageSent ) {
            try {
                await addDoc(sendMessageCollection, {
                    messageText: messageSent,
                    sentAt: serverTimestamp(),
                    sendBy: auth?.currentUser?.displayName,
                    photoOfSender: auth.currentUser?.photoURL ? auth.currentUser.photoURL : 'https://www.pngkey.com/png/full/315-3151964_thinking-meme-png-funny-thinking-emoji-png.png'
                })
                setMessageSent('');
            } catch (error) {
                
            }
        }
    }
        
    const writeMessage = (e: FormEvent<HTMLInputElement>) => {
        setMessageSent(e.currentTarget.value)
    }

    useEffect(() => {
        if (idOfGroup.length > 0) {
            fetchData()
        }
    }, [idOfGroup])
    console.log(idOfGroup);
    let content;
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        //  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
         scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, []);
    // useEffect(() => {
    //     if (scrollRef.current)
    //             scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    //   }, []);
    if (loading) {
        content = (
            <div className="p-10  w-full flex justify-center items-center ">
                <Loader />
            </div>
        )
    } else {
        content =  (
            <div className="px-3 py-3 w-full ">
                <div className="py-5 h-full ">

               
            {
                idOfGroup.length === 0 ? (
                    <p>nema nista</p>
                ) : (
                    <>   
                        <div className="py-10 overflow-hidden overflow-y-scroll h-[90%] scrollbar "> 
                                {
                                    messageArray.map((item, index) => {
                                        const { sendBy, sentAt, messageText, photoOfSender } = item; 
                                        return (
                                            <Messages key={index} sendBy={sendBy} messageText={messageText} photoOfSender={photoOfSender}  />
                                        )
                                    })
                                }
                        </div>
                        
                        <form onSubmit={addMessage} className='h-[10%] flex items-center  w-full'>
                            <div className="py-5 flex items-center w-full ">
                                    <input type='text' className="bg-[#303347] py-3 px-5 w-full text-white rounded-xl outline-none" value={messageSent} onChange={writeMessage} placeholder="Messages..." />
                                    <div className="px-3">
                                        <button className="bg-[#FB6793] py-2 px-5 rounded-xl text-white"><AiOutlineArrowUp className="w-5 h-5" /></button>
                                    </div>
                            </div>
                        </form>   
                    </>
                )
            }
             </div>
       </div>
        )
    }


    return content
} 

export default ChatofRoom