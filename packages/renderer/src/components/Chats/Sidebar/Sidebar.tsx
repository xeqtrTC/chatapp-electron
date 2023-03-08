import type {FC} from 'react';
import React, {useEffect, useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {BiLogOut} from 'react-icons/bi';
import {signOut} from 'firebase/auth';
import {auth, db} from '../../Hooks/firebaseConfig';
import {useNavigate} from 'react-router-dom';
import SearchUser from './SearchUser';
import {FiSettings} from 'react-icons/fi';
import {collection, where, query, onSnapshot, doc, deleteDoc} from 'firebase/firestore';
import type {chatArray} from '../../Hooks/stateInterface';
import UseChatContext from '../../Hooks/useChatContext';
import UploadImage from './UploadImage';

const Sidebar: FC = () => {
  const {idOfGroup, setIdOfGroup, imageUploadState, setImageUploadState} = UseChatContext();

  const truncate = (s: string, n: number) => {
    return s.length > n ? s.substring(0, n - 1) + '...' : s;
  };
  const navigate = useNavigate();
  const [chats, setChats] = useState<chatArray[]>([]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const groupCollection = collection(db, 'group');

  // const getGroups = async () => {
  //     console.log(auth?.currentUser?.uid)
  //     const q = query(groupCollection, where('members', 'array-contains', auth?.currentUser?.uid))
  //     let messages: chatArray[] = []
  //     const unsubcribe =  onSnapshot(q, (querySnapChat) => {
  //         querySnapChat.forEach((doc) => {
  //             messages.push({ ...doc.data(), id: doc.id});
  //         })
  //     });
  //     setChats(messages);
  //     return () => unsubcribe()
  // }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const q = query(groupCollection, where('members', 'array-contains', auth?.currentUser?.uid));
      const unsubcribe = onSnapshot(q, querySnapshot => {
        // eslint-disable-next-line prefer-const
        let messages: chatArray[] = [];
        querySnapshot.forEach(doc => {
          messages.push({...doc.data()});
        });
        setChats(messages);
      });
      return () => unsubcribe();
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  const onClickSetIdGroup = (id: string) => {
    setIdOfGroup(id);
  };

  const deleteChat = async (id: string) => {
    const chatDoc = doc(db, 'group', id);
    try {
      await deleteDoc(chatDoc);
      // await deleteDoc(messageDoc);
      setIdOfGroup('');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(idOfGroup);

  return (
    <>
      {imageUploadState && <UploadImage />}
      <div className="p-3 h-full">
        <div className="rounded-xl bg-[#242839] h-full py-5">
          <div className="overflow-y-scroll h-[90%] scrollbar">
            <SearchUser />
            {chats?.map(item => {
              return (
                <div
                  className={`${idOfGroup === item.id ? 'onFocusChat' : 'focusChat'} `}
                  key={item.id}
                >
                  <div
                    className={` ${
                      idOfGroup === item.id
                        ? 'bg-[#1C1F2C] rounded-l-xl'
                        : 'bg-[#2F3245] rounded-xl '
                    }  group cursor-pointer py-5  w-full px-5 flex items-center justify-between overflow-hidden`}
                    onClick={() => onClickSetIdGroup(item.id)}
                  >
                    <div className="w-10">
                      <img
                        src="https://www.pngkey.com/png/full/315-3151964_thinking-meme-png-funny-thinking-emoji-png.png"
                        className="min-w-10 h-10"
                      />
                    </div>
                    <div className="ml-3 overflow-hidden w-[80%]">
                      <div className="max-w-[10rem]  ">
                        <span className="text-white font-medium">
                          {item.createdBy === auth?.currentUser?.displayName
                            ? item.name
                            : item.createdBy}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-[#5C5E6D] font-semibold">
                          {truncate('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaacab', 10)}
                        </span>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in ">
                      <AiOutlineClose
                        className="text-white hover:scale-110 transition-all duration-200 ease-in-out"
                        onClick={() => deleteChat(item.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-5 flex justify-between items-center">
            <BiLogOut
              className="w-10 h-10 text-white cursor-pointer hover:scale-110 transition-all ease-in-out duration-200 bg-[#1C1F2C] p-2 rounded-full"
              title="Logout"
              onClick={logout}
            />
            <FiSettings
              className="w-10 h-10 text-white cursor-pointer hover:scale-110 transition-all ease-in-out duration-200 bg-[#1C1F2C] p-2 rounded-full"
              title="Settings"
              onClick={() => setImageUploadState(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
