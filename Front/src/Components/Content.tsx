import React, { useState, useEffect, useMemo } from 'react';

import { createSocket, SocketModel } from 'src/utils';
import { ServiceActions } from 'src/enums/ServiceActions';

import { Body } from './Body';
import { Header } from './Header';
import { CustomSpinner } from './CustomSpinner';

import './style.less';

export interface BlockModelWithLinks extends BlockModel {
    links: LinkModel[];
}

export interface LinkModel {
    id?: string;
    url: string;
    title: string;
    priority: number;
    blockId: string;
    description: string;
}

export interface BlockModel {
    id: string;
    name: string;
    priority: number;
}

interface InformationModel {
    showSpinner(): void;
    hideSpinner(): void;
    serviceControl(action: ServiceActions, data: string | LinkModel): void;
}

export const EditableDataContext = React.createContext<InformationModel>({} as InformationModel);
export const SocketContext = React.createContext<SocketModel>({} as SocketModel);

export const Content: React.FC = () => {
    const SOCKETS = useMemo(() => createSocket(), []);

    const [allContext, setAllContext] = useState([]);
    const [showedSpinner, setShowedSpinner] = useState(true);

    const showSpinner = (): void => {
        setShowedSpinner(true);
    };

    const hideSpinner = (): void => {
        setShowedSpinner(false);
    };

    useEffect((): void => {
        setShowedSpinner(true);
        SOCKETS.links.getData(setAllContext);
        setShowedSpinner(false);
    }, []);

    const serviceControl = (action: ServiceActions, data: string | LinkModel) => {
        if (action === ServiceActions.del) {
            SOCKETS.links.delete(data as string);
        }
        if (action === ServiceActions.edit) {
            SOCKETS.links.edit(data as LinkModel);
        }
        if (action === ServiceActions.create) {
            SOCKETS.links.create(data as LinkModel);
        }
    };

    const editableData = {
        showSpinner,
        hideSpinner,
        serviceControl
    };

    return (
        <SocketContext.Provider value={SOCKETS}>
            <EditableDataContext.Provider value={editableData}>
                <Header />
                <Body allContext={allContext} />
                {showedSpinner && <CustomSpinner />}
            </EditableDataContext.Provider>
        </SocketContext.Provider>
    );
};
