import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/landingpage/landingPage.js';
import LogInPage from './pages/login/login.js';
import SignUpPage from './pages/signup/signup.js';
import MainApp from './MainApp.js';
import VerifyAccount from './pages/verifyAccount/verifyAccount.js';
import PasswordRecovery from './pages/passwordRecovery/passwordRecovery.js';
import PasswordRecoveryUpdate from './pages/passwordRecoveryUpdate/passwordRecoveryUpdate.js';
import { Provider } from "react-redux";
import store from "./state/store";
import NotFound from './pages/NotFound/NotFound.js';

const AppWrapper = () => {

    return (
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LogInPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path="/app/*" element={<MainApp />} />
                <Route path="/verify-account/:token" element={<VerifyAccount />} />
                <Route path="/password-recovery-update/:token" element={<PasswordRecoveryUpdate />} />
                <Route path="/password-recovery" element={<PasswordRecovery />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Provider>
    )
}

export default AppWrapper;