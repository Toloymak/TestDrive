import React from 'react';

import { BlockModel, BlockModelWithLinks } from 'src/Components';
import style from 'src/Components/Body/Cell/Menu/Menu.module.less';
import { TooltipMenu } from '@shared/Menu';

interface Props {
    additionallyContext: BlockModelWithLinks[];
    setIdByAccordion(id: string): void;
    close(): void;
    allBlocks: BlockModel[];
}

export const MenuItem: React.FC<Props> = ({ additionallyContext, setIdByAccordion, close, allBlocks }) => {
    return (
        <TooltipMenu close={close}>
            {additionallyContext.map(item => (
                <span key={item.id} onClick={() => setIdByAccordion(item.id)} className={style.item}>
                    {allBlocks.find(i => i.id === item.id).name}
                </span>
            ))}
        </TooltipMenu>
    );
};
