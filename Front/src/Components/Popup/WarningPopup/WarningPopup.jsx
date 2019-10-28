import * as React from "react";
import Button from "@skbkontur/react-ui/components/Button/Button";

import "./PopupWarning.css";

export class WarningPopup extends React.Component {
  componentDidMount() {
    document.addEventListener("mouseup", event => {
      const element = document.querySelector(".popupWarning-content");
      if (element && !element.contains(event.target)) {
        this.props.close();
      }
    });
  }

  deleteService() {
    this.props.close();
    this.props.delete(this.props.id);
  }

  render() {
    return (
      <div className="popup">
        <div className="popupWarning-content">
          <span className="popupWarning-header">
            Вы уверены что хотите удалить сервис из списка?
          </span>
          <span className="popupWarning-body">
            Это действие невозможно отменить
          </span>
          <div className="popupWarning-buttonGroup">
            <Button
              size="large"
              width={250}
              use="danger"
              onClick={() => this.deleteService()}
            >
              Удалить
            </Button>
            <Button
              size="large"
              width={250}
              use="primary"
              onClick={() => this.props.close()}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
