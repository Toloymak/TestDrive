import * as React from 'react';
import Spinner from '@skbkontur/react-ui/Spinner';

import style from './style.module.less';

export const CustomSpinner: React.FC = () => {
    return (
        <span className={style.container}>
            <span className={style.spinner}>
                <Spinner type="big" caption={'Что то происходит'} />
            </span>
        </span>
    );
};
