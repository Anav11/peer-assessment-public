import React from 'react';

export const CriterionCard = ({ CriterionName }) => {
    return (
        <div className="criterion-card">
            <div className="col s12 m7">
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <p>{ CriterionName }</p>
                        </div>
                        <div className="card-action">
                            <form className="criterion-card__action" action="#">
                                <label className="card-action__radio">
                                    <input name="card-radio-group" value="0" type="radio" />
                                    <span>0</span>
                                </label>
                                <label className="card-action__radio">
                                    <input name="card-radio-group" value="1" type="radio" />
                                    <span>1</span>
                                </label>

                                <label className="card-action__radio">
                                    <input name="card-radio-group" value="2" type="radio" />
                                    <span>2</span>
                                </label>

                                <label className="card-action__radio">
                                    <input name="card-radio-group" value="3" type="radio"  />
                                    <span>3</span>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}