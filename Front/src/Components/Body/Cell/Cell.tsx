import Icon from '@skbkontur/react-icons';
import Link from '@skbkontur/react-ui/components/Link';
import React, { useState } from 'react';
import Tooltip from '@skbkontur/react-ui/Tooltip';

import { LinkModel } from 'src/Components/Content/Content';
import { CreateOrEditMenu } from 'src/Components/CreateOrEditMenu/CreateOrEditMenu';
import { DeleteConfirmedPopup } from 'src/Components/CreateOrEditMenu/DeleteConfirmedPopup/DeleteConfirmedPopup';

import { MenuItem } from './Menu/MenuItem';
import style from './Cell.module.less';

interface Props extends LinkModel {
    serviceName: string;
}

export const Cell: React.FC<Partial<Props>> = ({ id, url, description, title, serviceName, blockId }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [visiblePopupCreate, setVisiblePopupCreate] = useState(false);
    const [warningPopup, setWarningPopup] = useState(false);

    const closeMenu = (): void => {
        setShowMenu(false);
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

    const tooltipMessage = () => <span>{title}</span>;

    return (
        <div className={style.cell}>
            <div className={style.cellEdit}>
                <span className={'activeElm'} onClick={toggleMenu}>
                    <Icon name={'MenuDots'} />
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

            <div className={style.header}>
                <h2>{serviceName}</h2>
                <span className={style.separatorHeader} />
            </div>

            <Tooltip pos="bottom right" trigger={'hover'} render={tooltipMessage}>
                <div className={style.field}>
                    <Link href={url} target="_blank">
                        <span className={style.link}>
                            <span>{url}</span>
                            <span className={style.separatorField} />
                        </span>
                    </Link>
                </div>
            </Tooltip>

            <textarea className={style.description} value={description} disabled={true} />

            {visiblePopupCreate ? <CreateOrEditMenu {...editParams} close={closePopup} /> : null}
            {warningPopup ? <DeleteConfirmedPopup id={id} close={closeWarningPopup} /> : null}
        </div>
    );
};
