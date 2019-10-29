import * as React from "react";
import {useState} from "react";
import Button from "@skbkontur/react-ui/components/Button/Button";
import Logotype from "@skbkontur/react-ui/components/Logotype/Logotype";

import { Popup } from "../Popup/Popup";

import "./Header.less";

interface Props {
  showSpinner: Boolean;
}

export const Header: React.FC<Props> = ({showSpinner}) => {
  const [visiblePopupCreate, setVisiblePopupCreate] = useState(false);

  const openPopup = () => {
    setVisiblePopupCreate(true);
  }

  const closePopup = () => {
    setVisiblePopupCreate(false);
  }
  
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
          onClick={openPopup}
          use="primary"
          size="medium"
          width="250px"
        >
          Добавить сервис
        </Button>
        {visiblePopupCreate ? (
          <Popup
            close={closePopup}
            showSpinner={showSpinner}
          />
        ) : null}
      </div>
    </div>
  );
}
