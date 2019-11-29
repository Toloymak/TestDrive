import React from 'react';

import shared from '@shared/Styles/StylesShared.module.less';
import { Navigator } from 'src/Components/Content/utils';

import { BlockModel, BlockModelWithLinks } from '../Content';

import style from './Body.module.less';
import { ContextNavigator } from './ContextNavigator';
import { Context } from './Context';
import { ContextAccordion } from './ContextAccordion';

interface BodyProps {
    context: BlockModelWithLinks;
    counterNavigation: number;
    selectOtherBlock(action: Navigator): void;
    allBlocks: BlockModel[];
    setIdByAccordion(id: string): void;
    allContext: BlockModelWithLinks[];
}

export const Body: React.FC<BodyProps> = ({
    context,
    counterNavigation,
    selectOtherBlock,
    setIdByAccordion,
    allBlocks,
    allContext
}) => {
    const { content, container } = style;
    const { flexCenter } = shared;
    return (
        <div className={content}>
            <div className={flexCenter}>
                <div className={container}>
                    <ContextAccordion
                        setIdByAccordion={setIdByAccordion}
                        allBlocks={allBlocks}
                        currentIdBlock={context.id}
                        allContext={allContext}
                    />
                </div>
            </div>
            <ContextNavigator
                counterNavigation={counterNavigation}
                selectOtherBlock={selectOtherBlock}
                serviceName={context.name}
            />
            <div className={flexCenter}>
                <div className={container}>
                    <Context {...context} />
                </div>
            </div>
        </div>
    );
};
