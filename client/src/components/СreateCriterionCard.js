import React from 'react';

export const СreateCriterionCard = ({ id, allCards, setCard, card }) => {

    const deleteHandler = (id) => {
        allCards.splice(allCards.indexOf(id), 1);
        setCard([...allCards]);
    }

    return (
        <div className="card horizontal" id={id}>
            <div className="card-stacked">
                {
                    id > 0
                    ?
                        <span className="Сreate-criterion-card__close-button"
                            onClick={() => deleteHandler(id)}
                        >
                            <i className="material-icons">close</i>
                        </span>
                    :
                        <div></div>
                }
                <div className="card-action">
                    <div className="row">
                        <div className="input-field col s12">
                        Наименование критерия:
                            <textarea
                                id="title"
                                type="text"
                                className="validate materialize-textarea criterion-card__title"
                                defaultValue={card ? card.criterionName : ''}
                            />
                        </div>
                        
                        <div className="col s12" style={{marginTop:"-20px"}}>
                            Вес критерия:
                            <div className="input-field inline">
                                <input
                                    id="importance"
                                    type="number"
                                    max="5"
                                    min="0"
                                    className="validate criterion-card__importance"
                                    style={{margin:"15px 0 0 10px"}}
                                    defaultValue={card ? card.importance : ''}
                                />
                                <label htmlFor="importance"></label>
                                <span className="helper-text" data-error="Ошибка" data-success="" style={{marginLeft:"10px"}} >От 0 до 5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}