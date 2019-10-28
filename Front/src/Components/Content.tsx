import * as React from "react";
import Spinner from "@skbkontur/react-ui/Spinner";

import { getData } from "src/utils/";

import { Header } from "./Header/Header";
import { Body } from "./Body/Body";

import "../style.css";

interface ContentState {
  allServices: any[];
  showedSpinner: boolean;
}

export class Content extends React.Component<{}, ContentState> {
  constructor(props) {
    super(props);
    this.state = {
      allServices: [],
      showedSpinner: true
    };
  }

  componentDidMount() {
    getData(this.setState.bind(this));
  }

  showSpinner() {
    this.setState({ showedSpinner: true });
  }

  render() {
    return (
      <>
        <Header showSpinner={this.showSpinner.bind(this)} />
        <Body
          allServices={this.state.allServices}
          showSpinner={this.showSpinner.bind(this)}
        />
        {this.state.showedSpinner && (
          <span className="spinner">
            <span className="block-spinner">
              <Spinner type="big" caption={"Что то происходит"} />
            </span>
          </span>
        )}
      </>
    );
  }
}
