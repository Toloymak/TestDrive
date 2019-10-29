import * as React from "react";

import { Cell } from "./Cell/Cell";
import {AllServicesModel} from "../Content";

import "./Body.less";

interface BodyProps {
  allServices: AllServicesModel[];
  showSpinner: boolean;
}

export class Body extends React.Component<BodyProps, {}> {
  render() {
    return (
      <div className="body">
        <div className="content">
          <div className="serviceTable">
            <div className="serviceTableBody">
              {this.props.allServices.map((item, index) => (
                <Cell
                  {...item}
                  key={index}
                  showSpinner={this.props.showSpinner}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
