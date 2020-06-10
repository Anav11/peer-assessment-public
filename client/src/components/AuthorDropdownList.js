import React from 'react';

export const AuthorDropdownList = ({authors}) => {
    return (
        <select className="browser-default author-dropdown-list" defaultValue="default">
            <option disabled value="default">Выберите автора</option>
            { 
                authors.map((author, index) => {
                    return (
                        <option value={author} key={index}>{author}</option>
                    )
                })
            }
        </select>
    )
}