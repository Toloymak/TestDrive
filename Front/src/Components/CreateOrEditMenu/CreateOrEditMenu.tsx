import React, { useContext, useEffect, useMemo, useState } from 'react';
import Icon from '@skbkontur/react-icons';
import Button from '@skbkontur/react-ui/components/Button/Button';

import { ServiceActions } from 'src/enums/ServiceActions';

import { DataContext, LinkModel } from '../Content/Content';

import './CreateOrEditMenu.css';

interface Props extends LinkModel {
    close(): void;
    editMode: boolean;
}

export const CreateOrEditMenu: React.FC<Partial<Props>> = ({
    id = null,
    close,
    url,
    editMode,
    description,
    blockId,
    title
}) => {
    const refsElements = React.useRef({
        urlRef: null,
        tittleRef: null,
        serviceRef: null,
        textareaRef: null
    });
    const { serviceControl } = useContext(DataContext);

    const useButton = React.useMemo(() => (editMode ? 'success' : 'primary'), [editMode]);

    const { allBlocks, currentIdBlock } = useContext(DataContext);
    const blocks = allBlocks.map(item => {
        return { id: item.id, name: item.name };
    });

    const [currentService, setCurrentService] = useState(editMode ? blockId : currentIdBlock);

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

    const serviceOnChange = data => {
        setCurrentService(data.target.value);
    };

    const field = (name, mode = 'input') => {
        const defaultValue = editMode ? (name === 'URL' ? url : title) : '';
        const placeholder = name === 'URL' ? 'domain:port' : 'Введите название сервиса';
        return (
            <div className="popup_blockField">
                <span className="popup_nameField">{name}</span>
                {mode === 'input' ? (
                    <input
                        ref={field =>
                            name === 'URL'
                                ? (refsElements.current.urlRef = field)
                                : (refsElements.current.tittleRef = field)
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

    const service = () => {
        return (
            <div className="popup_blockField">
                <span className="popup_nameField">{'СЕРВИС'}</span>
                <select className="popup_field" onChange={serviceOnChange} defaultValue={currentIdBlock}>
                    {blocks.map(item => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
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
        const title = refsElements.current.tittleRef.value;
        const priority = 0;
        const description = refsElements.current.textareaRef.value;
        const blockId = currentService;

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
                    <div className="popup_bodyRight">{service()}</div>
                    <div className="popup_bodyRow">
                        {field('URL')}
                        {field('ВСПЛЫВАШКА')}
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
