import React, { useEffect } from 'react';

import style from './TooltipMenu.module.less';

interface Props {
    close(): void;
}

export const TooltipMenu: React.FC<Props> = ({ close, children }) => {
    useEffect(() => {
        document.addEventListener('mouseup', event => {
            const element = document.querySelector(`.${style.menuBlock}`);
            if (element && !element.contains(event.target as Element)) {
                close();
            }
        });
    }, []);

    return <div className={style.menuBlock}>{children}</div>;
};
