import React, { useEffect, useMemo, useState } from 'react';

import { createSocket, SocketModel } from 'src/utils';
import { ServiceActions } from 'src/enums/ServiceActions';
import { counterNavi, Navigator } from 'src/Components/Content/utils';

import { Body } from '../Body';
import { Header } from '../Header';
import { CustomSpinner } from '../CustomSpinner';

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
    linkAction(action: ServiceActions, data: string | LinkModel): void;
    blockAction(action: ServiceActions, data: Partial<BlockModel>): void;
    allBlocks: BlockModel[];
    currentIdBlock: string;
}

export const SocketContext = React.createContext<SocketModel>({} as SocketModel);
export const DataContext = React.createContext<InformationModel>({} as InformationModel);

export const Content: React.FC = () => {
    const SOCKETS = useMemo(() => createSocket(), []);

    const [allContext, setAllContext] = useState([]);
    const [allBlocks, setAllBlocks] = useState([]);
    const [counterNavigation, setCounterNavigation] = useState(0);
    const [currentIdBlock, setCurrentIdBlock] = useState('');

    const [showedSpinner, setShowedSpinner] = useState(true);

    const setBLocks = (data): void => {
        setAllBlocks(data);
    };

    useEffect((): void => {
        setShowedSpinner(true);
        SOCKETS.blocks.getData(setBLocks);
        SOCKETS.links.getData(setAllContext);
        setShowedSpinner(false);
    }, []);

    const showSpinner = (): void => {
        setShowedSpinner(true);
    };

    const hideSpinner = (): void => {
        setShowedSpinner(false);
    };

    const selectOtherBlock = (action: Navigator): void => {
        const nextBLock = counterNavi(action, counterNavigation, allContext.length);
        setCounterNavigation(nextBLock);
        setCurrentIdBlock(allBlocks[nextBLock].id);
    };

    const setIdByAccordion = (id: string) => {
        setCounterNavigation(allContext.findIndex(i => i.id === id));
        setCurrentIdBlock(id);
    };

    const linkAction = (action: ServiceActions, data: string | LinkModel) => {
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

    const blockAction = (action: ServiceActions, data: Partial<BlockModel>) => {
        if (action === ServiceActions.create) {
            SOCKETS.blocks.create(data);
        }
    };

    const data = {
        showSpinner,
        hideSpinner,
        linkAction,
        blockAction,
        allBlocks,
        currentIdBlock
    };

    return (
        <SocketContext.Provider value={SOCKETS}>
            <DataContext.Provider value={data}>
                <Header />
                {allContext.length ? (
                    <Body
                        context={allContext[counterNavigation]}
                        counterNavigation={counterNavigation}
                        selectOtherBlock={selectOtherBlock}
                        allBlocks={allBlocks}
                        setIdByAccordion={setIdByAccordion}
                    />
                ) : (
                    <CustomSpinner />
                )}
                {showedSpinner && <CustomSpinner />}
            </DataContext.Provider>
        </SocketContext.Provider>
    );
};
