import React, { useEffect, useState } from 'react';

import { BlockModel, BlockModelWithLinks } from 'src/Components';
import { ItemAccordionPoint } from 'src/Components/Body/ContextAccordion/ItemAccordionPoints';
import { MAX_NUMBERS_CONTEXT_IN_ACCORDION } from '@const/index';

import { ItemAccordion } from './ItemAccordion';

interface Props {
    allBlocks: BlockModel[];
    setIdByAccordion(id: string): void;
    currentIdBlock: string;
    allContext: BlockModelWithLinks[];
}

export const ContextAccordion: React.FC<Props> = ({ allBlocks, setIdByAccordion, currentIdBlock, allContext }) => {
    const [actualContext, setActualContext] = useState([]);
    const [additionallyContext, setAdditionallyContext] = useState([]);

    useEffect(
        () => {
            if (allContext.length < MAX_NUMBERS_CONTEXT_IN_ACCORDION) {
                setActualContext(allContext);
            } else {
                setActualContext(allContext.slice(0, MAX_NUMBERS_CONTEXT_IN_ACCORDION));
                setAdditionallyContext(allContext.slice(MAX_NUMBERS_CONTEXT_IN_ACCORDION));
            }
        },
        [allBlocks]
    );

    return (
        <>
            {actualContext.length > 0 &&
                actualContext.map(item => (
                    <ItemAccordion
                        id={item.id}
                        contextName={allBlocks.find(i => i.id === item.id).name}
                        key={item.id}
                        setIdByAccordion={setIdByAccordion}
                        currentIdBlock={currentIdBlock}
                    />
                ))}
            {additionallyContext.length > 0 && (
                <ItemAccordionPoint
                    setIdByAccordion={setIdByAccordion}
                    additionallyContext={additionallyContext}
                    allBlocks={allBlocks}
                />
            )}
        </>
    );
};
