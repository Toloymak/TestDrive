import * as React from "react";

import { Cell } from "./Cell/Cell";
import {AllServicesModel} from "../Content";

import style from "./Body.module.less";

interface BodyProps {
  allServices: AllServicesModel[];
  showSpinner: boolean;
}

export class Body extends React.Component<BodyProps, {}> {
  render() {
    const {content, container} = style;
    console.log(style)
    return (
      <div className={style.content}>
        <div className={container}>
              {this.props.allServices.map((item, index) => (
                <Cell
                  {...item}
                  key={index}
                  showSpinner={this.props.showSpinner}
                />
              ))}
        </div>
      </div>
    );
  }
}
