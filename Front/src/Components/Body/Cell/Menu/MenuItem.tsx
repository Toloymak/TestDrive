import React from 'react';

import { TooltipMenu } from '@shared/Menu';

import style from './Menu.module.less';

interface Props {
    close(): void;
    openPopup(): void;
    openWarningPopup(): void;
}

export const MenuItem: React.FC<Props> = ({ close, openWarningPopup, openPopup }) => {
    const deleteComponent = () => {
        close();
        openWarningPopup();
    };

    return (
        <TooltipMenu close={close}>
            <span onClick={openPopup} className={style.item}>
                Редактировать
            </span>
            <span className={style.item} onClick={deleteComponent}>
                Удалить
            </span>
        </TooltipMenu>
    );
};
