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
        setTimeout(() => setShowMenu(false), 0);
    };

    const openMenu = (): void => {
        setShowMenu(true);
    };

    return (
        <div className={style.item} onClick={openMenu}>
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
