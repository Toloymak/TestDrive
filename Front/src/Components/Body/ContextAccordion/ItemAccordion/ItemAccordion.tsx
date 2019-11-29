import React, { useMemo } from 'react';

import style from './ItemAccordion.module.less';

interface Props {
    contextName: string;
    id: string;
    setIdByAccordion(id: string): void;
}

export const ItemAccordion: React.FC<Props> = ({ contextName, setIdByAccordion, id }) => {
    const itemId = useMemo(() => id, [id]);
    const setCurrentId = () => {
        setIdByAccordion(itemId);
    };

    return (
        <div className={style.item} onClick={setCurrentId}>
            <span className={style.text}>{contextName}</span>
        </div>
    );
};
