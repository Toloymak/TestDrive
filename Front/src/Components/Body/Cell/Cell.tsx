import * as React from "react";
import { useState } from "react";
import Icon from "@skbkontur/react-icons";
import Link from "@skbkontur/react-ui/components/Link";

import { Popup } from "../../Popup/Popup";
import { WarningPopup } from "../../Popup/WarningPopup/WarningPopup";

import { MenuItem } from "./Menu/MenuItem";
import style from "./Cell.module.less";
import Tooltip from '@skbkontur/react-ui/Tooltip';

interface Props {
  showSpinner(): void;
}

export const Cell: React.FC<any> = ({
  id,
  url,
  service,
  description,
  showSpinner,
  delLink
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
    delLink(id);
  };

  const editParams = {
    editMode: true,
    id,
    url,
    service,
    description,
    showSpinner,
    delLink
  };

  const tooltipMessage = () => (<span>{url}</span>)

  return (
    <div className={style.cell}>
      <div className={style.cellEdit}>
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

      <div className={style.header}>
        <h2>{service}</h2>
        <span className={style.separatorHeader}/>
      </div>
      
      <Tooltip pos="top right" trigger={'hover'} render={tooltipMessage}>
        <div className={style.field}>
            <Link href={url} target="_blank">
              <span className={style.link}>
                <span>{url}</span>
                <span className={style.separatorField}/>
              </span>
            </Link>
        </div>
      </Tooltip>

      <textarea className={style.description} defaultValue={description} disabled={true}/>

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
