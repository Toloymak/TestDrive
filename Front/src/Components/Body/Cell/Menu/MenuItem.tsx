import React, {useEffect} from 'react';

import style from "./Menu.module.less";

interface Props {
  close(): void;
  openPopup(): void;
  openWarningPopup(): void;
}

export const MenuItem: React.FC<Props> = ({close, openWarningPopup, openPopup}) => {

  useEffect(() => {
    document.addEventListener("mouseup", event => {
      const element = document.querySelector(".menuItem");
      if (element && !element.contains(event.target as Element)) {
        close();
      }
    });
  }, []);

  const deleteComponent = () => {
    close();
    openWarningPopup();
  }

  return (
    <div className={style.menuBlock}>
      <span onClick={openPopup} className={style.item}>
        Редактировать
      </span>
      <span className={style.item} onClick={deleteComponent}>
        Удалить
      </span>
    </div>
  );
}
