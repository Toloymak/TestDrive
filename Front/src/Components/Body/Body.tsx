import * as React from "react";

import { AllServicesModel } from "../Content";

import { Cell } from "./Cell";
import style from "./Body.module.less";

interface BodyProps {
  allServices: AllServicesModel[];
  showSpinner(): void;
}

export const Body: React.FC<BodyProps> = ({allServices, showSpinner}) => {
  const { content, container } = style;
  return (
    <div className={style.content}>
      <div className={container}>
        {allServices.map((item, index) => (
          <Cell {...item} key={index} showSpinner={showSpinner} />
        ))}
      </div>
    </div>
  );
}
