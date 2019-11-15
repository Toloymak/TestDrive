import * as React from "react";

import { AllContextModel } from '../Content';
import { Cell } from "./Cell";
import style from "./Body.module.less";
import { ContextNavigator } from './ContextNavigator';
import { Context } from './Context';

interface BodyProps {
    allContext: AllContextModel[];
}

export const Body: React.FC<BodyProps> = ({allContext}) => {
    const { content, container } = style;
    return (
    <div className={content}>
        <ContextNavigator />
        <div className={container}>
        {
        allContext.map(item => (
            <Context {...item} key={item.id} />
        ))}
        </div>
    </div>
    );
}
