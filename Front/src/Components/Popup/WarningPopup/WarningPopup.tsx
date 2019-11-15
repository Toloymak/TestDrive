import * as React from "react";
import Button from "@skbkontur/react-ui/components/Button/Button";

import "./PopupWarning.css";
import { string } from 'prop-types';

interface Props {
  id: string;
  close(): void;
  deleteService(id: string): void;
}

export const WarningPopup: React.FC<Props> = ({ id, close, deleteService }) => {
  React.useEffect(() => {
    document.addEventListener("mouseup", event => {
          const element = document.querySelector(".popupWarning-content");
          if (element && !element.contains(event.target as Element)) {
            close();
          }
        });
  }, []);

  const delService = (): void => {
    close();
    deleteService(id);
  }

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
            onClick={delService}
          >
            Удалить
          </Button>
          <Button
            size="large"
            width={250}
            use="primary"
            onClick={close}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}
