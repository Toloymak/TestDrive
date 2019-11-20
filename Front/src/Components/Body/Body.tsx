import React from 'react';

import shared from '@shared/Styles/StylesShared.module.less';
import { Navigator } from 'src/Components/Content/utils';

import { BlockModelWithLinks } from '../Content';

import style from './Body.module.less';
import { ContextNavigator } from './ContextNavigator';
import { Context } from './Context';

interface BodyProps {
    context: BlockModelWithLinks;
    counterNavigation: number;
    selectOtherBlock(action: Navigator): void;
}

export const Body: React.FC<BodyProps> = ({ context, counterNavigation, selectOtherBlock }) => {
    const { content, container } = style;
    const { flexCenter } = shared;
    return (
        <div className={content}>
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
