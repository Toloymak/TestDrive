import Link from '@skbkontur/react-ui/components/Link';
import React, { useState } from 'react';
import Tooltip from '@skbkontur/react-ui/Tooltip';

import { LinkModel } from 'src/Components/Content/Content';
import { CreateOrEditMenu } from 'src/Components/CreateOrEditMenu/CreateOrEditMenu';
import { DeleteConfirmedPopup } from 'src/Components/CreateOrEditMenu/DeleteConfirmedPopup/DeleteConfirmedPopup';

import { MenuItem } from './Menu/MenuItem';
import style from './Cell.module.less';

interface Props extends LinkModel {}

export const Cell: React.FC<Partial<Props>> = ({ id, url, description, title, blockId }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [visiblePopupCreate, setVisiblePopupCreate] = useState(false);
    const [warningPopup, setWarningPopup] = useState(false);

    const closeMenu = (): void => {
        setTimeout(() => setShowMenu(false), 0);
    };

    const openPopup = (): void => {
        setVisiblePopupCreate(true);
        closeMenu();
    };

    const closePopup = (): void => {
        setVisiblePopupCreate(false);
    };

    const openMenu = (): void => {
        setShowMenu(true);
    };

    const openWarningPopup = (): void => {
        setWarningPopup(true);
    };

    const closeWarningPopup = (): void => {
        setWarningPopup(false);
    };

    const toggleMenu = (): void => {
        showMenu ? closeMenu() : openMenu();
    };

    const editParams = {
        editMode: true,
        id,
        url,
        description,
        blockId,
        title
    };

    const tooltipMessage = () => <span>{url}</span>;
    const renderName = (name: string) => (
        <div className={style.fieldName}>
            <span>{name}</span>
        </div>
    );

    return (
        <div className={style.cell}>
            <div className={style.cellEdit}>
                <span className={'activeElm'} onClick={toggleMenu}>
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L11 11L21 1" stroke="#6879AE" />
                    </svg>
                </span>
                {showMenu && (
                    <MenuItem
                        {...editParams}
                        openPopup={openPopup}
                        close={closeMenu}
                        openWarningPopup={openWarningPopup}
                    />
                )}
            </div>

            <div className={style.cellFields}>
                {url.length > 0 && (
                    <Tooltip pos="left bottom" trigger={'hover'} render={tooltipMessage} className={style.tooltip}>
                        {renderName('URL')}
                        <div className={style.field}>
                            <Link href={url} target="_blank">
                                <span className={style.link}>
                                    <span>{url}</span>
                                    <span className={style.separator} />
                                </span>
                            </Link>
                        </div>
                    </Tooltip>
                )}
                {title.length > 0 && (
                    <div className={style.fieldsMargin}>
                        {renderName('Заголовок')}
                        <div className={style.field}>
                            <span>{title}</span>
                            <span className={style.separator} />
                        </div>
                    </div>
                )}
                {description.length > 0 && (
                    <div className={style.fieldsMargin}>
                        {renderName('Описание')}
                        <div className={style.field}>
                            <span>{description}</span>
                            <span className={style.separator} />
                        </div>
                    </div>
                )}
            </div>

            {visiblePopupCreate ? <CreateOrEditMenu {...editParams} close={closePopup} /> : null}
            {warningPopup ? <DeleteConfirmedPopup id={id} close={closeWarningPopup} /> : null}
        </div>
    );
};
