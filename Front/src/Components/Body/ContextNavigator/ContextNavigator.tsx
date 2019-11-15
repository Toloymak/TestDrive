import React from 'react';

import { classContainer, className } from 'src/Components/Body/ContextNavigator/utils/ClassesElements';

export const ContextNavigator: React.FC = () => {
    return (
        <div className={classContainer}>
            <span>Вправо</span>
            <span className={className}>Name context</span>
            <span>Влево</span>
        </div>
    );
};
