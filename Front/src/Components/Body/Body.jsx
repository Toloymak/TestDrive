import * as React from "react";

import {Cell} from './Cell/Cell';

import "./Body.css";

export class Body extends React.Component {


  render() {
    return <div className="body">
      <div className="content">
        <div className="serviceTable">
          <div className="serviceTableHeader">
            <div className="columnUrl">URL</div>
            <div className="columnService">СЕРВИС</div>
            <div className="columnDescription">ОПИСАНИЕ</div>
            <div className="columnEdit"/>
          </div>
          <div className="serviceTableBody">
            {
              this.props.allServices.map((item, index) => <Cell {...item} key={index}
                                                                showSpinner={this.props.showSpinner}/>)
            }
          </div>
        </div>
      </div>
    </div>
  }
}