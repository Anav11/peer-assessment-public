import React from 'react';
import { CriterionCard } from '../components/CriterionCard';

export const CriterionCardList = ({ cards }) => {
    return (
        <div className="criterion-cards-wrapper">
            {
                cards.map((card, index) => {
                    return <CriterionCard key={ index } CriterionName={ card.criterionName } />
                })
            }
        </div>
    )
}