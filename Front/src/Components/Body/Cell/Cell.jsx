import * as React from "react";
import Icon from "@skbkontur/react-icons";
import Link from "@skbkontur/react-ui/components/Link";

import { Popup } from "../../Popup/Popup";
import { WarningPopup } from "../../Popup/WarningPopup/WarningPopup";

import { MenuItem } from "./Menu/MenuItem";

import "./Cell.css";

export class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      visiblePopupCreate: false,
      warningPopup: false
    };
  }

  openPopup() {
    this.setState({ visiblePopupCreate: true });
    this.closeMenu();
  }

  closePopup() {
    this.setState({ visiblePopupCreate: false });
  }

  openMenu() {
    this.setState({ showMenu: true });
  }

  closeMenu() {
    this.setState({ showMenu: false });
  }

  openWarningPopup() {
    this.setState({ warningPopup: true });
  }

  closeWarningPopup() {
    this.setState({ warningPopup: false });
  }

  toggleMenu() {
    this.state.showMenu ? this.closeMenu() : this.openMenu();
  }

  deleteService(id) {
    this.props.showSpinner();
    delService(id);
  }

  render() {
    const { id, url, service, description } = this.props;
    const editParams = {
      editMode: true,
      ...this.props
    };
    return (
      <div className="cell">
        <div className="columnUrl">
          <Link href={url}>{url}</Link>
        </div>
        <div className="columnService">{service}</div>
        <div className="columnDescription">{description}</div>
        <div className="columnEdit cellEdit">
          <span className={"activeElm"} onClick={() => this.toggleMenu()}>
            <Icon name={"MenuDots"} />
          </span>
          {this.state.showMenu && (
            <MenuItem
              {...editParams}
              openPopup={this.openPopup.bind(this)}
              close={this.closeMenu.bind(this)}
              openWarningPopup={this.openWarningPopup.bind(this)}
            />
          )}
        </div>
        {this.state.visiblePopupCreate ? (
          <Popup
            {...editParams}
            close={this.closePopup.bind(this)}
            showSpinner={this.props.showSpinner.bind(this)}
          />
        ) : null}
        {this.state.warningPopup ? (
          <WarningPopup
            id={id}
            close={this.closeWarningPopup.bind(this)}
            delete={this.deleteService.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
