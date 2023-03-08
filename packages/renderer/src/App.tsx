import React from 'react';
import {Routes, Route, HashRouter} from 'react-router-dom';
import ChatHomepage from './components/Chats/Homepage/ChatHomepage';
import HomeScreen from './components/homescreen/Homescreen';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {GuardianLaSpage, SecondGuardianLaSpage} from './components/Hooks/guardian';
const App: React.FC = () => {
  return (
    <div className="bg-[#1C1F2C] overflow-hidden h-screen ">
      <HashRouter>
        <Routes>
          <Route element={<GuardianLaSpage />}>
            <Route path="chat">
              <Route
                index
                element={<ChatHomepage />}
              />
            </Route>
          </Route>

          <Route element={<SecondGuardianLaSpage />}>
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
          </Route>
          <Route
            path="/"
            element={<HomeScreen />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
