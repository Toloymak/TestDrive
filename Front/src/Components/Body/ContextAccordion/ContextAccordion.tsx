import React, { useEffect, useState } from 'react';

import { BlockModel } from 'src/Components';
import { ItemAccordionPoint } from 'src/Components/Body/ContextAccordion/ItemAccordionPoints';
import { MAX_NUMBERS_CONTEXT_IN_ACCORDION } from '@const/index';

import { ItemAccordion } from './ItemAccordion';

interface Props {
    allBlocks: BlockModel[];
    setIdByAccordion(id: string): void;
}

export const ContextAccordion: React.FC<Props> = ({ allBlocks, setIdByAccordion }) => {
    const [actualBlocks, setActualBlocks] = useState([]);
    const [additionallyBlocks, setAdditionallyBlocks] = useState([]);

    useEffect(
        () => {
            if (allBlocks.length < MAX_NUMBERS_CONTEXT_IN_ACCORDION) {
                setActualBlocks(allBlocks);
            } else {
                setActualBlocks(allBlocks.slice(0, MAX_NUMBERS_CONTEXT_IN_ACCORDION));
                setAdditionallyBlocks(allBlocks.slice(MAX_NUMBERS_CONTEXT_IN_ACCORDION));
            }
        },
        [allBlocks]
    );

    return (
        <>
            {actualBlocks.map(item => (
                <ItemAccordion id={item.id} contextName={item.name} key={item.id} setIdByAccordion={setIdByAccordion} />
            ))}
            {additionallyBlocks.length > 0 && (
                <ItemAccordionPoint setIdByAccordion={setIdByAccordion} additionallyBlocks={additionallyBlocks} />
            )}
        </>
    );
};
