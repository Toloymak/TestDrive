import React, { useContext, useState } from 'react';
import Icon from '@skbkontur/react-icons';
import Button from '@skbkontur/react-ui/components/Button/Button';

import { ServiceActions } from 'src/enums/ServiceActions';

import { BlockModel, DataContext, LinkModel } from '../Content/Content';

import { Services } from './Services';

import './CreateOrEditMenu.css';

interface Props extends LinkModel {
    close(): void;
    editMode: boolean;
    isBlockCreate?: boolean;
}

export const CreateOrEditMenu: React.FC<Partial<Props>> = ({
    id = null,
    close,
    url,
    editMode,
    description,
    blockId,
    title,
    isBlockCreate = false
}) => {
    const refsElements = React.useRef({
        urlRef: null,
        tittleRef: null,
        priorityRef: null,
        serviceRef: null,
        textareaRef: null
    });
    const { linkAction, blockAction } = useContext(DataContext);

    const useButton = React.useMemo(() => (editMode ? 'success' : 'primary'), [editMode]);

    const { allBlocks, currentIdBlock } = useContext(DataContext);
    const blocks = allBlocks.map(item => {
        return { id: item.id, name: item.name };
    });

    const [currentService, setCurrentService] = useState(editMode ? blockId : currentIdBlock || blocks[0].id);

    const field = (name, mode = 'input') => {
        const defaultValue = editMode ? (name === 'URL' ? url : title) : '';
        const placeholder = name === 'URL' ? 'domain:port' : 'Введите название сервиса';
        return (
            <div className="popup_nameBlock">
                <span className="popup_nameField">{name}</span>
                {mode === 'input' ? (
                    <input
                        ref={field =>
                            name === 'URL'
                                ? (refsElements.current.urlRef = field)
                                : name === 'ПРИОРИТЕТ'
                                    ? (refsElements.current.priorityRef = field)
                                    : (refsElements.current.tittleRef = field)
                        }
                        defaultValue={isBlockCreate && name === 'ПРИОРИТЕТ' ? 0 : defaultValue}
                        placeholder={placeholder}
                        type={`${name === 'ПРИОРИТЕТ' ? 'number' : 'text'}`}
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
        linkAction(ServiceActions.create, linkData);
    };

    const editLink = (linkData: LinkModel): void => {
        linkAction(ServiceActions.edit, linkData);
    };

    const createBlock = (blockData: Partial<BlockModel>): void => {
        blockAction(ServiceActions.create, blockData);
    };

    const addAndUpdateService = () => {
        if (isBlockCreate) {
            const priority = parseInt(refsElements.current.priorityRef.value);
            const title = refsElements.current.tittleRef.value;
            createBlock({ priority, name: title });
            close();
            return;
        }

        const title = refsElements.current.tittleRef.value;
        const url = refsElements.current.urlRef.value;
        const priority = parseInt(refsElements.current.priorityRef.value);
        const description = refsElements.current.textareaRef.value;
        const blockId = currentService;

        editMode
            ? editLink({ id, url, title, description, priority, blockId })
            : createLink({ url, title, description, priority, blockId });
        close();
    };

    return (
        <div className="popup">
            <div className={`popup-content ${isBlockCreate ? 'popup_createBlock' : ''}`}>
                {isBlockCreate ? (
                    <>
                        <div className="popup_header">
                            <span>{`Добавление контекста`}</span>
                            <span className="popup_header_close" onClick={close}>
                                <Icon name={'Delete'} />
                            </span>
                        </div>
                        <div className="popup_body">
                            <div className="popup_bodyRow">
                                {field('ИМЯ')}
                                {field('ПРИОРИТЕТ')}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="popup_header">
                            <span>{`${editMode ? 'Редактирование' : 'Добавление'} сервиса`}</span>
                            <span className="popup_header_close" onClick={close}>
                                <Icon name={'Delete'} />
                            </span>
                        </div>
                        <div className="popup_body">
                            <div className="popup_bodyRow">
                                <Services
                                    setCurrentService={setCurrentService}
                                    currentIdBlock={currentIdBlock}
                                    blocks={blocks}
                                />
                                {field('ЗАГОЛОВОК')}
                            </div>
                            <div className="popup_bodyRow">
                                {field('URL')}
                                {field('ПРИОРИТЕТ')}
                            </div>
                            {field('ОПИСАНИЕ', 'area')}
                        </div>
                    </>
                )}
                <div className="popup_footer">
                    <Button onClick={addAndUpdateService} use={useButton} size="large" width="250px">{`${
                        editMode ? 'Сохранить' : 'Добавить'
                    }`}</Button>
                </div>
            </div>
        </div>
    );
};
