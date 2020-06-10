import React, { useContext, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../PALogo.svg';
import M from "materialize-css/dist/js/materialize.min.js";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    useEffect(() => {
        var elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }, [])

    return (
        <div>
            <nav>
                <div className="navbar nav-wrapper light-blue lighten-3">
                    <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                    <NavLink to="/">
                        <img src={logo} className="nav__app-logo" alt="logo" width="10px"/>
                    </NavLink>

                    
                    <div className="navbar__user-name hide-on-med-and-down">
                        <span className="navbar__user-name__expert">Эксперт: </span>{auth.firstname + ' ' + auth.lastname}
                    </div>

                    <ul className="right hide-on-med-and-down navbar__button-panel">
                        <a href="/" onClick={logoutHandler} style={{fontSize:"19px", padding:"0 30px 0 30px"}}>Выйти</a>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <div className="navbar__user-name">
                    <span className="navbar__user-name__expert">Эксперт: </span>{auth.firstname + ' ' + auth.lastname}
                </div>
                <li><NavLink to="/main">Мои протоколы</NavLink></li>
                <li><NavLink to="/createPoll">Создать протокол</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
            </ul>
        </div>
    );
}