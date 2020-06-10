import React, { useEffect } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";

export const AuthorAddInput = ({ authors }) => {
    const _authors = authors ? authors.map((author) => { return {tag: author} }) : '';

    const onChangeHandler = (e) => {
        if(e.target.value) {
            document.querySelector('.create-poll-page__prompt').innerHTML = 'Для добавления нажмите "Enter"';
        } else {
            document.querySelector('.create-poll-page__prompt').innerHTML = '';
        }
    }

    useEffect(() => { 
        let elems = document.querySelector('.chips');
        M.Chips.init(elems, {secondaryPlaceholder: '+ Автор', data: _authors});
    }, [_authors]);

    return (
        <div>
            <div className="chips">
                <input onChange={onChangeHandler} placeholder="Введите имя:" />
            </div>
            <p className="create-poll-page__prompt"></p>
        </div>
    )
}