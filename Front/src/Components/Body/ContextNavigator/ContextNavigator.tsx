import React from 'react';

import { classContainer, className, classNavi } from 'src/Components/Body/ContextNavigator/utils/ClassesElements';
import { Navigator } from 'src/Components/Content/utils';

interface Props {
    counterNavigation: number;
    serviceName: string;

    selectOtherBlock(action: Navigator): void;
}

export const ContextNavigator: React.FC<Props> = ({ serviceName, selectOtherBlock }) => {
    const next = (): void => {
        selectOtherBlock(Navigator.next);
    };

    const preview = (): void => {
        selectOtherBlock(Navigator.preview);
    };

    return (
        <div className={classContainer}>
            <span className={classNavi} onClick={next}>
                Вправо
            </span>
            <span className={className}>{serviceName}</span>
            <span className={classNavi} onClick={preview}>
                Влево
            </span>
        </div>
    );
};
