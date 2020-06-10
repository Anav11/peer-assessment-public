import React, { useContext, useState, useCallback, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';

import { Loader } from '../components/Loader';
import { NotFoundPage } from '../components/NotFoundPage';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { AuthorAddInput } from '../components/AuthorAddInput';
import { СreateCriterionCardList } from '../components/СreateCriterionCardList';

function getAuthorsArray(data) {
    const arr = [];
    data.forEach(element => {
        arr.push(element.childNodes[0].data);
    });

    return arr;
}

function getCardsArray(data) {
    const arr = [];
    data.forEach(element => {
        arr.push(element.value);
    });

    return arr;
}

export const ChangePollPage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const { request, loading } = useHttp();
    const [cards, setCard] = useState([0]);
    const [poll, setPoll] = useState(null);
    const [assessments, setAssessments] = useState(null);
    const pollId = useParams().id;

    const getPoll = useCallback( async () => {
        try {
           const fetched =  await request(`/api/poll/${pollId}`, 'GET', null, { Authorization: `Bearer ${auth.token}` });
           setPoll(fetched);
           setCard([...Array(fetched.cards.length).keys()]);
        } catch(err) {
            console.log(err)
        }
    }, [auth.token, pollId, request]);

    useEffect(() => {
        getPoll()
    }, [getPoll]);

    const getAssessment = useCallback( async () => {
        try {
            const fetched =  await request(`/api/poll/getassessment/${pollId}`, 'GET', null, { Authorization: `Bearer ${auth.token}` });
            fetched.length === 0 ? setAssessments(null) : setAssessments(fetched);
        } catch(err) {
            console.log(err)
        }
    }, [auth.token, pollId, request]);
    
    useEffect(() => {
        getAssessment()
    }, [getAssessment]);

    const CreatePollHandler = async event => {
        event.preventDefault();

        // Получаем всех записанных авторов
        const authors = getAuthorsArray(document.querySelectorAll('.chip'));
        // получаем все имена и веса карт-критериев
        const cardsTitle = getCardsArray(document.querySelectorAll('.criterion-card__title'));
        const cardsImportance = getCardsArray(document.querySelectorAll('.criterion-card__importance'));
        
        if(authors.length === 0) {
            message('Вы не добавили ни одного автора');
            return;
        }

        // Формируем массив карт критериев
        let cards = [];
        for(let i = 0; i < cardsTitle.length; i++) {
            let importanceNum = Number(cardsImportance[i]);

            if(isNaN(importanceNum) || importanceNum > 5 || importanceNum < 0) {
                importanceNum = 0;
            }   

            cards.push({
                criterionName: cardsTitle[i],
                importance: importanceNum
            })
        }

        try {
            const data = await request(`/api/poll/change/${pollId}`, 'POST', 
                { 
                    projectAuthors: authors, 
                    cards: cards 
                }, 
                { Authorization: `Bearer ${auth.token}` }
            );
            message(data.message);
            history.push('/');
        } catch(err) {
            console.log(err);
        }

    }

    if(loading) {
        return <Loader />
    }

    return (
        (!loading && poll && poll !== 404)
        ?
            <div>
                <h4>Авторы:</h4>
                <AuthorAddInput authors = {poll.projectAuthors}/>

                <h4>Критерии оценки:</h4>
                <div className="criterion-cards-wrapper">
                    <СreateCriterionCardList cardsId={ cards } setCard = { setCard } cards={ poll.cards }/>
                        <div onClick={() => setCard([...cards, cards[cards.length-1]+1])} 
                            className={`btn-floating btn-large criterion-cards-wrapper__add-button ${assessments ? "disabled" : ''}`}
                        >
                            <i className="material-icons">add</i>
                        </div>
                        {assessments ? 
                            <div className="hint-cannot-add-criteria">
                                <span>Оценки по данному протоколу уже были получены.</span><br/>
                                <span>Возможность добавления критериев отсутствует.</span>
                            </div>
                        :
                            <div></div>
                        }
                </div>
                <div className="create-poll-page__create-button">
                    <NavLink to="/main"
                        className="create-poll-page__button-wrapper__create-button btn main-color_background"
                        onClick={CreatePollHandler}
                    >
                        Обновить
                    </NavLink>
                </div>
            </div>
        :
            poll === 404 ? <NotFoundPage /> : <div></div>
    )
}