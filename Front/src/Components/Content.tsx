import Spinner from '@skbkontur/react-ui/Spinner';
import React, { useState, useEffect, useRef } from 'react';

import { createSocket } from 'src/utils';
import { SocketHubs } from 'src/enums';

import { Body } from './Body';
import { Header } from './Header';
import '../style.css';

export interface ContextModel extends BlockModel{
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

export const Content: React.FC = () => {
    const socketRef = useRef(createSocket(SocketHubs.links));

    const [allServices, setAllServices] = useState([]);
    const [showedSpinner, setShowedSpinner] = useState(true);

    useEffect((): void => {
        setShowedSpinner(true);
        socketRef.current.getData(setAllServices);
        setShowedSpinner(false);
    }, []);

    const showSpinner = (): void => {
        setShowedSpinner(true);
    };

    const delLink = (id: string): void => {
        const filteredLink = allServices.filter(item => item.id !== id);
        setAllServices(filteredLink);
        socketRef.current.delete(id);
        setShowedSpinner(false);
    };

    return (
        <>
            <Header showSpinner={showSpinner} />
            <Body allServices={allServices} showSpinner={showSpinner} delLink={delLink} />
            {showedSpinner && (
                <span className="spinner">
                    <span className="block-spinner">
                        <Spinner type="big" caption={'Что то происходит'} />
                    </span>
                </span>
            )}
        </>
    );
};
