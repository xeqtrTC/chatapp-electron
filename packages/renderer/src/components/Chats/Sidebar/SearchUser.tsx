/* eslint-disable prefer-const */
import type {FC, FormEvent} from 'react';
import React, {useEffect, useState} from 'react';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {AiOutlineSearch} from 'react-icons/ai';
import {auth, db} from '../../Hooks/firebaseConfig';
import type {onClickSearchProps, searchUserArray} from '../../Hooks/stateInterface';
import Error from '../../Error/Error';

const SearchUser: FC = () => {
  const searchUserRef = collection(db, 'users');
  const [searchUserArray, setSearchUserArray] = useState<searchUserArray[]>([]);
  const [searchUserValue, setSearchUserValue] = useState<string>('');
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getUserSearch = async () => {
    const lowerCase = searchUserValue.toLowerCase();
    try {
      const q = query(searchUserRef, where('displayName', '==', lowerCase));
      const data = await getDocs(q);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
      }));
      setSearchUserArray(filteredData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserSearch();
  }, [searchUserValue]);

  const onChangeValue = (e: FormEvent<HTMLInputElement>): void => {
    setSearchUserValue(e.currentTarget.value);
  };

  const onClickSaveUser = async ({displayName, uid}: onClickSearchProps) => {
    const groupCollectionRef = collection(db, 'group');
    const idOfCurrentUser = auth?.currentUser?.uid;
    const nameOfCurrentUser = auth?.currentUser?.displayName;

    if (uid === idOfCurrentUser) {
      return 0;
    }

    const testas = collection(db, 'group');
    console.log(testas);
    // const testas = query(groupCollectionRef, where('createdBy', '==', auth?.currentUser?.displayName), where('name', '==', displayName))
    // console.log(testas, 'OVOOOOOOOOOOO')
    // const unsubcribe = onSnapshot(testas, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         const testas = doc.data();

    //     })
    // });
    try {
      const result = await addDoc(groupCollectionRef, {
        createdBy: nameOfCurrentUser,
        type: 1,
        name: displayName,
      });
      const as = result.id;
      const groupTobeUpdated = doc(db, 'group', as);
      await updateDoc(groupTobeUpdated, {
        members: arrayUnion(uid, idOfCurrentUser),
        id: as,
        createdAt: serverTimestamp(),
      });
      setSearchUserValue('');
    } catch (error) {
      console.log(error);
    }
  };

  let content;

  const onBlurGone = () => {
    if (searchUserArray.length > 0 || searchUserValue.length > 3) {
      setSearchFocus(true);
    } else {
      setSearchFocus(false);
    }
  };

  let searchButtonError = null;
  if (error) {
    searchButtonError = <Error error={error} />;
  }

  let searchButton = null;
  if (searchUserValue.length > 3 && searchFocus && searchUserArray) {
    searchButton = (
      <div className=" bg-[#2F3245]  mt-4 rounded-xl py-3 px-5 flex flex-col">
        {searchUserArray.length === 0 ? (
          <span className="text-white text-medium cursor-pointer">Username doesn't exist</span>
        ) : (
          searchUserArray?.map(item => {
            const {uid, displayName} = item;
            return (
              <div
                className="py-1"
                key={uid}
                onClick={() => onClickSaveUser({uid, displayName})}
              >
                <span className="text-white text-medium cursor-pointer">{displayName}</span>
              </div>
            );
          })
        )}
      </div>
    );
  }

  const combinedButtons = (
    <>
      {searchButtonError}
      {searchButton}
    </>
  );

  content = (
    <div className="p-5">
      <div className="bg-[#2F3245] flex p-4 items-center rounded-xl">
        <div>
          <AiOutlineSearch className="text-[#5C5E6D] w-6 h-6" />
        </div>
        <div
          className="ml-3"
          onBlur={onBlurGone}
        >
          <input
            type="text"
            onFocus={() => setSearchFocus(true)}
            className="bg-transparent outline-none text-[#5C5E6D] font-medium placeholder:text-[#5C5E6D] placeholder:font-medium"
            placeholder="Search user"
            onChange={onChangeValue}
            value={searchUserValue}
          />
        </div>
      </div>
      {combinedButtons}
    </div>
  );

  return content;
};

export default SearchUser;
