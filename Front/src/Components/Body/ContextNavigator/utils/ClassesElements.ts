import shared from '@shared/Styles/StylesShared.module.less';
import { classFormat } from 'src/utils';

import style from '../ContextNavigator.module.less';

const { flexCenter } = shared;
const { contextNavigator, name } = style;

export const classContainer = classFormat(contextNavigator, flexCenter);
export const className = name;
