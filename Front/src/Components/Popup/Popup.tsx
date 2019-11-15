import * as React from "react";
import Icon from "@skbkontur/react-icons";
import Button from "@skbkontur/react-ui/components/Button/Button";

import { LinkModel } from "../Content";

import "./Popup.css";

interface Props extends LinkModel {
  close(): void;
  showSpinner(): void;
  editMode: boolean;
  service: string;
}

export const Popup: React.FC<Partial<Props>> = ({
  id,
  close,
  showSpinner,
  url,
  service,
  editMode,
  description
}) => {
  const refsElements = React.useRef({
    urlRef: null,
    serviceRef: null,
    textareaRef: null
  });

  const useButton = React.useMemo(() => (editMode ? "success" : "primary"), [
    editMode
  ]);

  React.useEffect(
    () => {
      document.addEventListener("mouseup", event => {
        const element = document.querySelector(".popup-content");
        if (element && !element.contains(event.target as Node)) {
          close();
        }
      });
    },
    [close]
  );

  const field = (name, mode = "input") => {
    const defaultValue = editMode ? (name === "URL" ? url : service) : "";

    const placeholder =
      name === "URL" ? "domain:port" : "Введите название сервиса";
    return (
      <div className="popup_blockField">
        <span className="popup_nameField">{name}</span>
        {mode === "input" ? (
          <input
            ref={field =>
              name === "URL"
                ? (refsElements.current.urlRef = field)
                : (refsElements.current.serviceRef = field)
            }
            defaultValue={defaultValue}
            placeholder={placeholder}
            type="text"
            className="popup_field"
          />
        ) : (
          <textarea
            ref={el => (refsElements.current.textareaRef = el)}
            defaultValue={editMode ? description : ""}
            placeholder="Введите описание"
            className="popup_fieldArea"
          />
        )}
      </div>
    );
  };

  const addAndUpdateService = () => {
    showSpinner();
    // const method = editMode ? SOCKETS.UPDATE_DATA : SOCKETS.CREATE_DATA;
    const url = refsElements.current.urlRef.value;
    const service = refsElements.current.serviceRef.value;
    const description = refsElements.current.textareaRef.value;
    const idLink = id !== undefined ? id : null;
    // addAndUpdate(method, { idLink, url, service, description });
    close();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup_header">
          <span>{`${editMode ? "Редактирование" : "Добавление"} сервиса`}</span>
          <span className="popup_header_close" onClick={close}>
            <Icon name={"Delete"} />
          </span>
        </div>
        <div className="popup_body">
          <div className="popup_bodyRow">
            {field("URL")}
            {field("СЕРВИС")}
          </div>
          {field("ОПИСАНИЕ", "area")}
        </div>
        <div className="popup_footer">
          <Button
            onClick={addAndUpdateService}
            use={useButton}
            size="large"
            width="250px"
          >{`${editMode ? "Сохранить" : "Добавить"}`}</Button>
        </div>
      </div>
    </div>
  );
};
