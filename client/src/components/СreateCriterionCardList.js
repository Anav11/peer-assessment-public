import React from 'react';
import { СreateCriterionCard } from './СreateCriterionCard';

export const СreateCriterionCardList = ({ cardsId, setCard, cards }) => {
    return (
        cardsId.map((id) => <СreateCriterionCard 
            key ={ id } 
            id={ id } 
            allCards={ cardsId } 
            setCard={ setCard } 
            card={ cards ? cards[id] : {} }
        />)
    )
}