import React from 'react';

import { TooltipMenu } from '@shared/Menu';

import style from './Menu.module.less';

interface Props {
    close(): void;
    newContext(): void;
    newLink(): void;
}

export const MenuItem: React.FC<Props> = ({ close, newLink, newContext }) => {
    return (
        <TooltipMenu close={close}>
            <span onClick={newContext} className={style.item}>
                new Context
            </span>
            <span className={style.item} onClick={newLink}>
                new Link
            </span>
        </TooltipMenu>
    );
};
