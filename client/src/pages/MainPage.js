import React, { useState, useContext, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { PollsList } from '../components/PollsList';

export const MainPage = () => {
    const [ polls, setPolls ] = useState([]);
    const [ link, setLink ] = useState(null);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchPolls = useCallback(async () => {
        try {
            const fetched = await request('/api/poll', 'GET', null, {Authorization: `Bearer ${token}`});
            setPolls(fetched);
        } catch(err) {
            console.log(err);
        }
    }, [token, request]);

    useEffect(() => {
        fetchPolls()
        return () => {}
    }, [fetchPolls]);

    const inputChangeHandler = (event) => {
        setLink(event.target.value);
    }

    if(loading) {
        return <Loader />
    }

    return (
        <div className="main-page">
            <h4 style={{marginTop:"40px"}}>Подключиться для оценки</h4>
            <div className="row main-page__connection-form">
                <div className="col s12 main-page__input-form">
                    <input onChange={inputChangeHandler} className="main-page__connection-form_input" type="text" style={{fontSize:"20px"}} placeholder="Код протокола ..." />
                </div>
                <a className="waves-effect waves-light btn main-page__connection-form__button" href={`/poll/${link}`}>
                    Подключиться
                </a>
            </div>

            {!loading && <PollsList polls={polls} fetchPolls={fetchPolls}/>}

            <NavLink to="/createPoll"
                className="main-page__create-button btn main-color_background"
            >
                <strong>Создать протокол</strong> <i className="material-icons">add</i>
            </NavLink>
        </div>
    )
}
