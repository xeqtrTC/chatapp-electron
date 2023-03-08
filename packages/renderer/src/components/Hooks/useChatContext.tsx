import {useContext} from 'react';
import type {UseChatContextType} from './chatContext';
import ChatContextProvider from './chatContext';

const UseChatContext = (): UseChatContextType => {
  return useContext(ChatContextProvider);
};

export default UseChatContext;
