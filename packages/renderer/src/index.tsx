import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ChatContextProvider} from './components/Hooks/chatContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>,
);
