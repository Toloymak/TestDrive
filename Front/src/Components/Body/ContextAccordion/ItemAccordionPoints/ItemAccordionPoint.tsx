import React, { useState } from 'react';

import { BlockModel, BlockModelWithLinks } from 'src/Components';

import style from './ItemAccordionPoint.module.less';
import { MenuItem } from './MenuItem';

interface Props {
    setIdByAccordion(id: string): void;
    additionallyContext: BlockModelWithLinks[];
    allBlocks: BlockModel[];
}

export const ItemAccordionPoint: React.FC<Props> = ({ setIdByAccordion, additionallyContext, allBlocks }) => {
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
                    additionallyContext={additionallyContext}
                    close={closeMenu}
                    setIdByAccordion={setIdByAccordion}
                    allBlocks={allBlocks}
                />
            )}
        </div>
    );
};
