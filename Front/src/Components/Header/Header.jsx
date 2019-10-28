import * as React from "react";
import Button from "@skbkontur/react-ui/components/Button/Button";
import Logotype from "@skbkontur/react-ui/components/Logotype/Logotype";

import { Popup } from "../Popup/Popup";

import "./Header.css";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopupCreate: false
    };
  }

  openPopup() {
    this.setState({ visiblePopupCreate: true });
  }

  closePopup() {
    this.setState({ visiblePopupCreate: false });
  }

  render() {
    return (
      <div className="header">
        <div className="content header_content">
          <div className="headerLeftBlock">
            <div>
              <div className="logo">
                <Logotype
                  color="#D70C17"
                  textColor="#fff"
                  locale={{ prefix: "П", suffix: "следняя" }}
                />
                <span className="logo-suffix">миля</span>
                <span className="logo-separator" />
              </div>
            </div>
            <span className="projectName">Тест Драйв</span>
          </div>
          <Button
            onClick={() => this.openPopup()}
            use="primary"
            size="medium"
            width="250px"
          >
            Добавить сервис
          </Button>
          {this.state.visiblePopupCreate ? (
            <Popup
              close={this.closePopup.bind(this)}
              showSpinner={this.props.showSpinner}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
