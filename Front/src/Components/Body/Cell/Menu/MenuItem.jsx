import * as React from "react";

import "./Menu.css";

export class MenuItem extends React.Component {
  componentDidMount() {
    document.addEventListener("mouseup", event => {
      const element = document.querySelector(".menuItem");
      if (element && !element.contains(event.target)) {
        this.props.close();
      }
    });
  }

  deleteComponent() {
    this.props.close();
    this.props.openWarningPopup();
  }

  render() {
    return (
      <div className={"menuItem"}>
        <span onClick={() => this.props.openPopup()} className="menuItem_item">
          Редактировать
        </span>
        <span className="menuItem_item" onClick={() => this.deleteComponent()}>
          Удалить
        </span>
      </div>
    );
  }
}
