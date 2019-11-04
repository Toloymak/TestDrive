import * as React from "react";
import { useState } from "react";
import Icon from "@skbkontur/react-icons";
import Link from "@skbkontur/react-ui/components/Link";

import { Popup } from "../../Popup/Popup";
import { WarningPopup } from "../../Popup/WarningPopup/WarningPopup";

import { MenuItem } from "./Menu/MenuItem";
import style from "./Cell.module.less";

interface Props {
  showSpinner(): void;
}

export const Cell: React.FC<any> = ({
  id,
  url,
  service,
  description,
  showSpinner,
  delService
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [visiblePopupCreate, setVisiblePopupCreate] = useState(false);
  const [warningPopup, setWarningPopup] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const openPopup = () => {
    setVisiblePopupCreate(true);
    closeMenu();
  };

  const closePopup = () => {
    setVisiblePopupCreate(false);
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const openWarningPopup = () => {
    setWarningPopup(true);
  };

  const closeWarningPopup = () => {
    setWarningPopup(false);
  };

  const toggleMenu = () => {
    showMenu ? closeMenu() : openMenu();
  };

  const deleteService = id => {
    showSpinner();
    delService(id);
  };

  const editParams = {
    editMode: true,
    id,
    url,
    service,
    description,
    showSpinner,
    delService
  };

  return (
    <div className={style.cell}>
      <div>
        <Link href={url}>
          <span className={style.colorLink}>{url}</span>
        </Link>
      </div>
      <div>{service}</div>
      <div>{description}</div>
      <div>
        <span className={"activeElm"} onClick={toggleMenu}>
          <Icon name={"MenuDots"} />
        </span>
        {showMenu && (
          <MenuItem
            {...editParams}
            openPopup={openPopup}
            close={closeMenu}
            openWarningPopup={openWarningPopup}
          />
        )}
      </div>
      {visiblePopupCreate ? (
        <Popup {...editParams} close={closePopup} showSpinner={showSpinner} />
      ) : null}
      {warningPopup ? (
        <WarningPopup
          id={id}
          close={closeWarningPopup}
          delete={deleteService}
        />
      ) : null}
    </div>
  );
};
