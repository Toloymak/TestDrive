import React, { useMemo } from 'react';

import style from './ItemAccordion.module.less';

interface Props {
    contextName: string;
    id: string;
    setIdByAccordion(id: string): void;
    currentIdBlock: string;
}

export const ItemAccordion: React.FC<Props> = ({ contextName, setIdByAccordion, id, currentIdBlock }) => {
    const itemId = useMemo(() => id, [id]);
    const activeId = useMemo(() => currentIdBlock, [currentIdBlock]);
    const setCurrentId = () => {
        setIdByAccordion(itemId);
    };

    return (
        <div className={`${style.item} ${activeId === itemId ? style.active : ''}`} onClick={setCurrentId}>
            <span className={style.text}>{contextName}</span>
        </div>
    );
};
