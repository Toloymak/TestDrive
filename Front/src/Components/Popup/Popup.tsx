import React, { useContext, useEffect } from 'react';
import Icon from '@skbkontur/react-icons';
import Button from '@skbkontur/react-ui/components/Button/Button';

import { ServiceActions } from 'src/enums/ServiceActions';

import { EditableDataContext, LinkModel } from '../Content';

import './Popup.css';

interface Props extends LinkModel {
    close(): void;
    editMode: boolean;
}

export const Popup: React.FC<Partial<Props>> = ({ id = null, close, url, editMode, description }) => {
    const refsElements = React.useRef({
        urlRef: null,
        serviceRef: null,
        textareaRef: null
    });
    const { serviceControl } = useContext(EditableDataContext);

    const useButton = React.useMemo(() => (editMode ? 'success' : 'primary'), [editMode]);

    useEffect(
        () => {
            document.addEventListener('mouseup', event => {
                const element = document.querySelector('.popup-content');
                if (element && !element.contains(event.target as Node)) {
                    close();
                }
            });
        },
        [close]
    );

    const field = (name, mode = 'input') => {
        const defaultValue = editMode ? (name === 'URL' ? url : 'хуервис') : '';
        const placeholder = name === 'URL' ? 'domain:port' : 'Введите название сервиса';
        return (
            <div className="popup_blockField">
                <span className="popup_nameField">{name}</span>
                {mode === 'input' ? (
                    <input
                        ref={field =>
                            name === 'URL'
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
                        defaultValue={editMode ? description : ''}
                        placeholder="Введите описание"
                        className="popup_fieldArea"
                    />
                )}
            </div>
        );
    };

    const createLink = (linkData: LinkModel): void => {
        serviceControl(ServiceActions.create, linkData);
    };

    const editLink = (linkData: LinkModel): void => {
        serviceControl(ServiceActions.edit, linkData);
    };

    const addAndUpdateService = () => {
        const url = refsElements.current.urlRef.value;
        const title = refsElements.current.urlRef.value;
        const priority = 0;
        const blockId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
        const description = refsElements.current.textareaRef.value;
        // const service = refsElements.current.serviceRef.value;

        editMode
            ? editLink({ id, url, title, description, priority, blockId })
            : createLink({ url, title, description, priority, blockId });
        close();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <div className="popup_header">
                    <span>{`${editMode ? 'Редактирование' : 'Добавление'} сервиса`}</span>
                    <span className="popup_header_close" onClick={close}>
                        <Icon name={'Delete'} />
                    </span>
                </div>
                <div className="popup_body">
                    <div className="popup_bodyRow">
                        {field('URL')}
                        {field('СЕРВИС')}
                    </div>
                    {field('ОПИСАНИЕ', 'area')}
                </div>
                <div className="popup_footer">
                    <Button onClick={addAndUpdateService} use={useButton} size="large" width="250px">{`${
                        editMode ? 'Сохранить' : 'Добавить'
                    }`}</Button>
                </div>
            </div>
        </div>
    );
};
