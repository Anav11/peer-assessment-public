import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';

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

export const CreatePollPage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const message = useMessage();
    const { request } = useHttp();
    const [cards, setCard] = useState([0]);

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
            const data = await request('/api/poll/create', 'POST', 
                { projectAuthors: authors, cards: cards }, 
                { Authorization: `Bearer ${auth.token}` }
            );
            message(data.message);
            history.push('/');
        } catch(err) {
            console.log(err);
        }

    }

    return (
        <div>
            <h4>Авторы:</h4>
            <AuthorAddInput />

            <h4>Критерии оценки:</h4>
            <div className="criterion-cards-wrapper">
                <СreateCriterionCardList cardsId={ cards } setCard = { setCard }/>
                <div onClick={() => setCard([...cards, cards[cards.length-1]+1])} className="btn-floating btn-large criterion-cards-wrapper__add-button">
                    <i className="material-icons">add</i>
                </div>
            </div>
            <div className="create-poll-page__create-button">
                <NavLink to="/main"
                    className="create-poll-page__button-wrapper__create-button btn main-color_background"
                    onClick={CreatePollHandler}
                >
                    Создать
                </NavLink>
            </div>
        </div>
    )
}