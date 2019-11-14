import * as React from "react";

import { ContextModel } from '../Content';
import { Cell } from "./Cell";
import style from "./Body.module.less";

interface BodyProps {
    allServices: ContextModel[];
    showSpinner(): void;
    delLink(id: string): void;
}

export const Body: React.FC<BodyProps> = ({allServices, showSpinner, delLink}) => {
    const { content, container } = style;
    return (
    <div className={style.content}>
        <div className={container}>
        {allServices.map((item, index) => (
            <Cell {...item} key={index} showSpinner={showSpinner} delLink={delLink}/>
        ))}
        </div>
    </div>
    );
}
