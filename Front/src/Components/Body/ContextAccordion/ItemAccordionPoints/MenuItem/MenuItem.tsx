import React from 'react';

import { BlockModel } from 'src/Components';
import style from 'src/Components/Body/Cell/Menu/Menu.module.less';
import { TooltipMenu } from '@shared/Menu';

interface Props {
    additionallyBlocks: BlockModel[];
    setIdByAccordion(id: string): void;
    close(): void;
}

export const MenuItem: React.FC<Props> = ({ additionallyBlocks, setIdByAccordion, close }) => {
    return (
        <TooltipMenu close={close}>
            {additionallyBlocks.map(item => (
                <span key={item.id} onClick={() => setIdByAccordion(item.id)} className={style.item}>
                    {item.name}
                </span>
            ))}
        </TooltipMenu>
    );
};
