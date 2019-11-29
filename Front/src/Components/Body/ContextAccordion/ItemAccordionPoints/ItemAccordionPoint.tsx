import React, { useState } from 'react';

import { BlockModel } from 'src/Components';

import style from './ItemAccordionPoint.module.less';
import { MenuItem } from './MenuItem';

interface Props {
    setIdByAccordion(id: string): void;
    additionallyBlocks: BlockModel[];
}

export const ItemAccordionPoint: React.FC<Props> = ({ setIdByAccordion, additionallyBlocks }) => {
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = (): void => {
        setShowMenu(false);
    };

    const openOrCloseMenu = (): void => {
        setShowMenu(prevState => !prevState);
    };

    return (
        <div className={style.item} onClick={openOrCloseMenu}>
            <span className={style.text}>...</span>
            {showMenu && (
                <MenuItem
                    additionallyBlocks={additionallyBlocks}
                    close={closeMenu}
                    setIdByAccordion={setIdByAccordion}
                />
            )}
        </div>
    );
};
