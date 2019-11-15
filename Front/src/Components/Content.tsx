import React, { useState, useEffect, useMemo } from 'react';

import { createSocket, SocketModel } from 'src/utils';

import { Body } from './Body';
import { Header } from './Header';
import { CustomSpinner } from './CustomSpinner';

export interface AllContextModel extends BlockModel {
    links: LinkModel[];
}

export interface LinkModel {
    id: string;
    url: string;
    title: string;
    priority: number;
    blockId: string;
    description: string;
}

interface BlockModel {
    id: string;
    name: string;
    priority: number;
}

interface InformationModel {
    showSpinner(): void;
    hideSpinner(): void;
}

export const InformationContext = React.createContext<InformationModel>({} as InformationModel);
export const SocketContext = React.createContext<SocketModel>({} as SocketModel);

export const Content: React.FC = () => {
    const SOCKETS = useMemo(() => createSocket(), []);

    const [allContext, setAllContext] = useState([]);
    const [showedSpinner, setShowedSpinner] = useState(true);

    useEffect(
        (): void => {
            setShowedSpinner(true);
            SOCKETS.links.getData(setAllContext);
            setShowedSpinner(false);
        },
        [SOCKETS.links]
    );

    const showSpinner = (): void => {
        setShowedSpinner(true);
    };

    const hideSpinner = (): void => {
        setShowedSpinner(false);
    };

    const delContext = (id: string): void => {
        const filteredLink = allContext.filter(item => item.id !== id);
        setAllContext(filteredLink);
        SOCKETS.blocks.delete(id);
        setShowedSpinner(false);
    };

    const information = {
        showSpinner,
        hideSpinner
    };

    return (
        <SocketContext.Provider value={SOCKETS}>
            <Header showSpinner={showSpinner} />
            <InformationContext.Provider value={information}>
                <Body allContext={allContext} />
                {showedSpinner && <CustomSpinner />}
            </InformationContext.Provider>
        </SocketContext.Provider>
    );
};
