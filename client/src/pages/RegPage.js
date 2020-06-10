import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const RegPage = () => {
    const history = useHistory();
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
            history.push('/main');
        } catch (err) {}
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
            loginHandler();
        } catch (err) {}
    }

    return (
        <div className="card__login">
            <div className="card">
                <div className="card-content">
                    <span className="card-title center">Создание аккаунта</span>
                    <div className="input-field">
                        <input
                            id="firstname"
                            name="firstname"
                            className="validate"
                            type="text"
                            minLength="1"
                            onChange={changeHandler}
                        />
                        <label htmlFor="firstname">Имя</label>
                    </div>
                    <div className="input-field">
                        <input
                            id="lastname"
                            name="lastname"
                            className="validate"
                            type="text"
                            minLength="1"
                            onChange={changeHandler}
                        />
                        <label htmlFor="lastname">Фамилия</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="user@mail.ru"
                            id="email"
                            name="email"
                            className="validate"
                            type="email"
                            onChange={changeHandler}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="********"
                            id="password"
                            name="password"
                            className="validate"
                            type="password"
                            minLength="6"
                            onChange={changeHandler}
                        />
                        <label htmlFor="password">Пароль</label> 
                        <div>
                            <a href="/">У меня уже есть аккаунт</a>
                        </div>
                    </div>
                </div>
                <div className="card-action center">
                    <button
                        className="btn blue card-action__btn_margin-6"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    )
}