import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect( () => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.firstname, data.lastname);
            message(data.message);
        } catch (err) {}
    }

    return (
        <div className="card__login">
        <div className="card">
            <div className="card-content">
                <span className="card-title center">Войдите для экспертной оценки</span>
                <div className="input-field">
                    <input
                        placeholder="user@mail.ru"
                        id="email"
                        type="email"
                        name="email"
                        className="validate"
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <input
                        placeholder="********"
                        id="password"
                        type="password"
                        name="password"
                        className="validate"
                        minLength="6"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <label htmlFor="password">Пароль</label> 
                </div>
            </div>
            <div className="card-action ">
                <button
                    className="btn main-color_background card-action__btn_margin-15"
                    disabled={loading}
                    onClick={loginHandler}
                >
                    Войти
                </button>

                <NavLink to="/RegPage" 
                        className="btn blue btn__registration" 
                        disabled={loading}
                >
                    Регистрация
                </NavLink>
            </div>
        </div>
        </div>
    )
}