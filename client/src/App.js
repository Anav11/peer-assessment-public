import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'materialize-css';

import logo from './PALogo.svg';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
    const {token, login, logout, userId, firstname, lastname, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if(!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated, firstname, lastname}}>
            <Router>
                {isAuthenticated ?
                    <Navbar />
                    :
                    <NavLink to="/">
                        <img src={logo} className="app-logo" alt="logo" />
                    </NavLink>
                }
                <div className="container">
                    {routes}
                </div>
                <footer>
                    
                </footer>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
