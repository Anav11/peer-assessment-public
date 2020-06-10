import React from 'react';

export const StatisticAuthorDropdownList = ({authors, setAuthor}) => {
    return (
        <select className="browser-default author-dropdown-list" defaultValue="default" onChange={(event) => setAuthor(event.target.value)}>
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