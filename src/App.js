import React from 'react'
import {Routes, Route} from 'react-router-dom'
import '../src/Styles/App.css';
import GreetingPage from './pages/GreetingPage';
import RegistAuthPage from './pages/RegistAuthPage';
import MainPage from './pages/MainPage'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from './utils/store';
import './firebase.js';
import AccountPage from './pages/AccountPage';
import PrivateRoute from './utils/privateRoutes/privateRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <main>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> 
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/main' element={<MainPage></MainPage>}></Route>
              <Route path='/account' element={<AccountPage></AccountPage>}></Route>
            </Route>
            <Route path="/" element={<GreetingPage></GreetingPage>}></Route>
            <Route path='/authorization' element={<RegistAuthPage></RegistAuthPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </PersistGate>
      </Provider>
    </main>
  );
}

export default App;
