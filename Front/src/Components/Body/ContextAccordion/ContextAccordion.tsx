import React, { useEffect, useState } from 'react';

import { BlockModel } from 'src/Components';

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
            if (allBlocks.length < 6) {
                setActualBlocks(allBlocks);
            } else {
                setActualBlocks(allBlocks.slice(0, 6));
                setAdditionallyBlocks(allBlocks.slice(6));
            }
        },
        [allBlocks]
    );

    return (
        <>
            {actualBlocks.map(item => (
                <ItemAccordion id={item.id} contextName={item.name} key={item.id} setIdByAccordion={setIdByAccordion} />
            ))}
        </>
    );
};
