import * as React from 'react';

import shared from '@shared/Styles/StylesShared.module.less';

import { AllContextModel } from '../Content';

import style from './Body.module.less';
import { ContextNavigator } from './ContextNavigator';
import { Context } from './Context';

interface BodyProps {
    allContext: AllContextModel[];
}

export const Body: React.FC<BodyProps> = ({ allContext }) => {
    const { content, container } = style;
    const { flexCenter } = shared;
    return (
        <div className={content}>
            <ContextNavigator />
            <div className={flexCenter}>
                <div className={container}>
                    {allContext.map(item => (
                        <Context {...item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
