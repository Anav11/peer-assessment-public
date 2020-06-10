import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { CriterionCardList } from '../components/CriterionCardList';
import { NotFoundPage } from '../components/NotFoundPage';
import { AuthorDropdownList } from '../components/AuthorDropdownList';

export const PollPage = () => {
    const { firstname, lastname, token } = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [poll, setPoll] = useState(null);
    const pollId = useParams().id;
    const message = useMessage();

    const getPoll = useCallback( async () => {
        try {
           const fetched =  await request(`/api/poll/${pollId}`, 'GET', null, { Authorization: `Bearer ${token}` });
           setPoll(fetched);
        } catch(err) {
            console.log(err)
        }
    }, [token, pollId, request]);

    useEffect(() => {
        getPoll()
    }, [getPoll]);

    if(loading) {
        return <Loader />
    }

    const responseHandler = async () => {
        let radioButtons = document.getElementsByName('card-radio-group');

        const expert = `${lastname} ${firstname}`;
        let author = document.querySelector('.author-dropdown-list').value;
        const assessments = [];

        radioButtons.forEach(radio => {
            if(radio.checked) {
                assessments.push(radio.value);
            }
        });

        if(author === 'default') {
            message('Вы не выбрали автора');
            return;
        }

        if(radioButtons.length / 4 !== assessments.length) {
            message('Не все критерии получили оценку');
            return;
        }

        try {
            const data = await request('/api/poll/assessment', 'POST',
                {
                    expert: expert,
                    projectAuthor: author, 
                    marks: assessments,
                    owner: pollId
                },
                { Authorization: `Bearer ${token}` }
            );
            message(data.message);
        } catch(err) {
            message(err.message);
        }
    }

    return (
        // !TODO костыль. Переделать на HOC
        (!loading && poll && poll !== 404)
        ?
            <div>
                <h5>Выберите автора для оценки</h5>
                <AuthorDropdownList authors={ poll.projectAuthors } />
                <br/>

                <h5 style={{textAlign:"center"}}>Критерии:</h5>
                <CriterionCardList cards={ poll.cards }/>

                <div className="poll-page__button-wrapper">
                    <button 
                        className="btn waves-light poll-page__button-wrapper__response-button"
                        onClick={responseHandler}
                    >
                        Отправить <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>
        :
            poll === 404 ? <NotFoundPage /> : <div></div>
    )
}