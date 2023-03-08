import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai'
import { v4 } from 'uuid';
import { auth, storage } from '../../Hooks/firebaseConfig';
import UseChatContext from '../../Hooks/useChatContext';

const UploadImage = () => {

    const [image, setImage] = useState<File | null>(null);
    const {imageUploadState, setImageUploadState} = UseChatContext();
    const uploadImagetest = (e: ChangeEvent<HTMLInputElement> ) => {
        if (e.target.files != null) {
            setImage(e.target.files[0])
        }
    }

    const uploadImageToFirebase =async () => {
        const storageRef = ref(storage, `images/${image?.name + v4()}`)
        try {
            if (image) {
                const test = await uploadBytes(storageRef, image)
                console.log(test);
                const as = await getDownloadURL(storageRef);
                console.log(as);
                if (auth.currentUser) {
                    await updateProfile(auth.currentUser, {
                        photoURL: as
                    })
                }
            }    
        } catch (error) {
            console.log(error);
        }
    }
    console.log(auth.currentUser?.photoURL);

    return (
        <div className='bg-black/60 fixed h-screen w-full flex justify-center items-center'>
            <div className='bg-[#262837] p-3  w-[20rem]'>
                <div className='flex justify-end '>
                    <AiOutlineClose className='text-white cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out h-5 w-5' onClick={() => setImageUploadState(false)} />
                </div>
                <div className='p-7'>
                    <div className='flex justify-center'>
                        <div className='flex flex-col'>
                            <div className='flex justify-center'>
                                <img src={auth?.currentUser?.photoURL ? auth?.currentUser?.photoURL : 'https://www.pngkey.com/png/full/315-3151964_thinking-meme-png-funny-thinking-emoji-png.png' } className='w-32 h-32 rounded-full object-cover' />
                            </div>
                            <div className='text-center py-1'>
                                <span className='text-white font-medium'>{auth?.currentUser?.displayName}</span>
                            </div>
                        </div>
                    </div>
                    <div className='py-1'>
                        <label htmlFor='inputFile' className='cursor-pointer text-white'><AiOutlineUpload className='w-10 h-10'/></label>
                        <input name='inputFile' id='inputFile' type='file' className='hidden' onChange={uploadImagetest}/>
                    </div>
                    <div className='py-5'>
                        <button className='bg-[#1C1F2C] w-full py-1 text-white font-medium rounded-xl' onClick={uploadImageToFirebase}>Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImage