import React from 'react';
import { useParams } from 'react-router-dom';

export const NotFoundPage = () => {
    const pollId = useParams().id;
    
    return (
        <div>
            <a href="/main">
                <i className="material-icons not-found-page__arrow-assistant">
                    arrow_upward
                </i>
            </a>
            <div className="not-found-err">
                <span className="not-found-err__text">
                    4<i className="material-icons not-found-err__bad-face">mood_bad</i>4
                </span>
            </div>
            <div className="not-found-err not-found-err__additional-text">
                Протокол "{pollId}" не найден!
            </div>
        </div>
    )
}