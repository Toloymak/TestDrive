import React, { useContext, useEffect } from 'react';
import Button from '@skbkontur/react-ui/components/Button/Button';

import './PopupWarning.css';

import { EditableDataContext } from 'src/Components/Content';
import { ServiceActions } from 'src/enums/ServiceActions';
interface Props {
    id: string;
    close(): void;
}

export const WarningPopup: React.FC<Props> = ({ id, close }) => {
    const { serviceControl } = useContext(EditableDataContext);

    useEffect(
        () => {
            document.addEventListener('mouseup', event => {
                const element = document.querySelector('.popupWarning-content');
                if (element && !element.contains(event.target as Element)) {
                    close();
                }
            });
        },
        [close]
    );

    const delService = (): void => {
        close();
        serviceControl(ServiceActions.del, id);
    };

    return (
        <div className="popup">
            <div className="popupWarning-content">
                <span className="popupWarning-header">Вы уверены что хотите удалить сервис из списка?</span>
                <span className="popupWarning-body">Это действие невозможно отменить</span>
                <div className="popupWarning-buttonGroup">
                    <Button size="large" width={250} use="danger" onClick={delService}>
                        Удалить
                    </Button>
                    <Button size="large" width={250} use="primary" onClick={close}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    );
};
