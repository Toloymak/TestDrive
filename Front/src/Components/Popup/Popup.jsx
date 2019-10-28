import * as React from "react";
import Icon from "@skbkontur/react-icons";
import Button from "@skbkontur/react-ui/components/Button/Button";

import "./Popup.css";
import { addAndUpdate } from "../../utils";

export class Popup extends React.Component {
  constructor() {
    super();
    this.textareaRef =  React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mouseup", event => {
      const element = document.querySelector(".popup-content");
      if (element && !element.contains(event.target)) {
        this.props.close();
      }
    });
  }

  field(name, mode = "input") {
    const defaultValue = this.props.editMode
      ? name === "URL"
        ? this.props.url
        : this.props.service
      : "";

    const placeholder =
      name === "URL" ? "domain:port" : "Введите название сервиса";
    return (
      <div className="popup_blockField">
        <span className="popup_nameField">{name}</span>
        {mode === "input" ? (
          <input
            ref={name === "URL" ? "url" : "service"}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type="text"
            className="popup_field"
          />
        ) : (
          <textarea
            ref={(el)=> this.textareaRef = el}
            defaultValue={this.props.editMode ? this.props.description : ""}
            placeholder="Введите описание"
            className="popup_fieldArea"
          />
        )}
      </div>
    );
  }

  addAndUpdateService() {
    this.props.showSpinner();
    const method = this.props.editMode ? UPDATE_DATA : CREATE_DATA;
    const url = this.refs.url.value;
    const service = this.refs.service.value;
    const description = this.refs.description.value;
    const id = this.props.id !== undefined ? this.props.id : null;
    addAndUpdate(method, { id, url, service, description });
    this.props.close();
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-content">
          <div className="popup_header">
            <span>{`${
              this.props.editMode ? "Редактирование" : "Добавление"
            } сервиса`}</span>
            <span
              className="popup_header_close"
              onClick={() => this.props.close()}
            >
              <Icon name={"Delete"} />
            </span>
          </div>
          <div className="popup_body">
            <div className="popup_bodyRow">
              {this.field("URL")}
              {this.field("СЕРВИС")}
            </div>
            {this.field("ОПИСАНИЕ", "area")}
          </div>
          <div className="popup_footer">
            <Button
              onClick={() => this.addAndUpdateService()}
              use={`${this.props.editMode ? "success" : "primary"}`}
              size="large"
              width="250px"
            >{`${this.props.editMode ? "Сохранить" : "Добавить"}`}</Button>
          </div>
        </div>
      </div>
    );
  }
}
