import Icon from '@skbkontur/react-icons';
import Link from '@skbkontur/react-ui/components/Link';
import React, { useState } from 'react';
import { LinkModel } from 'src/Components/Content';
import {Popup} from 'src/Components/Popup/Popup';

import { MenuItem } from "./Menu/MenuItem";
import style from "./Cell.module.less";
import Tooltip from '@skbkontur/react-ui/Tooltip';
import { WarningPopup } from 'src/Components/Popup/WarningPopup/WarningPopup';

interface CellsProps {
    showSpinner(): void;
    id: string;
    name: string;
    priority: number;
    links: LinkModel[];
    url: string;
    service: string;
    description: string;
    delLink(id: string): void;
}

export const Cell: React.FC<Partial<CellsProps>> = ({ id, url, service, description, showSpinner, delLink }) => {
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

    const deleteService = (id): void => {
        showSpinner();
        delLink(id);
    };

    const editParams = {
        editMode: true,
        id,
        url,
        service,
        description,
        showSpinner,
        delLink
    };

    const tooltipMessage = () => <span>{url}</span>;

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
                <h2>{service}</h2>
                <span className={style.separatorHeader} />
            </div>

            <Tooltip pos="top right" trigger={'hover'} render={tooltipMessage}>
                <div className={style.field}>
                    <Link href={url} target="_blank">
                        <span className={style.link}>
                            <span>{url}</span>
                            <span className={style.separatorField} />
                        </span>
                    </Link>
                </div>
            </Tooltip>

            <textarea className={style.description} defaultValue={description} disabled={true}/>

            {visiblePopupCreate ? (
                <Popup {...editParams} close={closePopup} showSpinner={showSpinner} />
            ) : null}
            {warningPopup ? (
                <WarningPopup
                id={id}
                close={closeWarningPopup}
                deleteService={deleteService}
                />
            ) : null}
        </div>
    );
};
