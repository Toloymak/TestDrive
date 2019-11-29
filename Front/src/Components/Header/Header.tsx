import React, { useState } from 'react';
import Logotype from '@skbkontur/react-ui/components/Logotype/Logotype';

import { CreateOrEditMenu } from '../CreateOrEditMenu/CreateOrEditMenu';

import { TestSocket } from './Secret/TestSockets';
import { MenuItem } from './Menu/MenuItem';

import './Header.less';

export const Header: React.FC = () => {
    const [visiblePopupCreate, setVisiblePopupCreate] = useState(false);
    const [visibleListTestSocket, setVisibleListTestSocket] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isBlockCreate, setIsBlockCreate] = useState(false);

    const closeMenu = (): void => {
        setShowMenu(false);
    };

    const openPopup = () => {
        closeMenu();
        setVisiblePopupCreate(true);
    };

    const closePopup = () => {
        setVisiblePopupCreate(false);
        setIsBlockCreate(false);
    };

    const createBlock = () => {
        setIsBlockCreate(true);
        openPopup();
    };

    const toggleVisibleListTestSocket = () => {
        setVisibleListTestSocket(!visibleListTestSocket);
    };

    const openMenu = (): void => {
        setShowMenu(true);
    };

    const toggleMenu = (): void => {
        showMenu ? closeMenu() : openMenu();
    };

    return (
        <div className="header">
            <div className="content header_content">
                <div className="headerLeftBlock">
                    <div>
                        <div className="logo">
                            <Logotype color="#D70C17" textColor="#fff" locale={{ prefix: 'П', suffix: 'следняя' }} />
                            <span className="logo-suffix">миля</span>
                            <span className="logo-separator" />
                        </div>
                    </div>
                    <span className="projectName">
                        Тест Др
                        <span onClick={toggleVisibleListTestSocket}>а</span>
                        йв
                    </span>
                </div>
                <div className="createBlock">
                    <span className={'activeElm'} onClick={toggleMenu}>
                        <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L11 11L21 1" stroke="#6879AE" />
                        </svg>
                    </span>
                    {showMenu && <MenuItem newContext={createBlock} newLink={openPopup} close={closeMenu} />}
                </div>

                {visiblePopupCreate ? <CreateOrEditMenu close={closePopup} isBlockCreate={isBlockCreate} /> : null}
            </div>
            {visibleListTestSocket && <TestSocket toggleVisibleListTestSocket={toggleVisibleListTestSocket} />}
        </div>
    );
};
