import React, { useContext, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import Modal from '../components/Modal';
import M from "materialize-css/dist/js/materialize.min.js";

export const PollsList = ({polls, fetchPolls}) => {
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const message = useMessage();

    const removeHandler = useCallback(async (pollId) => {
        try {
            const data = await request(`/api/poll/delete/${pollId}`, 'DELETE', {}, { Authorization: `Bearer ${token}`});
            message(data.message);
            fetchPolls();
        } catch(err) {
            console.log(err);
        }
    }, [token, request, message, fetchPolls]);

    useEffect(() => {
        let elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems);
    });

    return (
        !polls.length ?
        <div>
            <h4>Протоколы</h4>
            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>У вас пока нет ни одного протокола.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        : 
        <div>
            <h4>Протоколы</h4>
            <table>
                <thead>
                <tr>
                    <th style={{width:"10%"}}>№</th>
                    <th style={{width:"20%"}} className="poll-list__code">Код</th>
                    <th style={{width:"20%"}} className="poll-list__qr"></th>
                    <th style={{width:"30%"}} className="poll-list__results"></th>
                    <th style={{width:"15%"}} className="poll-list__date">Дата</th>
                    <th style={{width:"15%"}} className="poll-list__change"></th>
                    <th style={{width:"5%"}} className="poll-list__delete"></th>
                </tr>
                </thead>

                <tbody>
                { 
                    polls.map((poll, index, arr) => {
                        return (
                            <tr key={poll._id}>
                                <td>{ arr.length - index }</td>
                                <td><Link to={`poll/${poll._id}`}>{ poll._id }</Link></td>
                                <td>
                                    <img
                                        alt="qr"
                                        className="materialboxed" 
                                        width="40"
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://peer-assessment-online.ru/poll/${poll._id}`}
                                    />
                                </td>
                                <td ><Link to={`pollTable/${poll._id}`}><i className="medium material-icons">insert_chart</i></Link></td>
                                <td className="poll-list__date__value">{ new Date(poll.date).toLocaleDateString() }</td>
                                <td style={{textAlign:"center"}}>
                                    <Link to={`changePoll/${poll._id}`}>
                                        <i className="medium material-icons">settings</i>
                                    </Link>
                                </td>
                                <td><Modal removeHandler={ removeHandler } pollId={ poll._id }/></td>
                            </tr>
                        )
                    }).reverse()
                }
                </tbody>
            </table>
        </div>
    );
}