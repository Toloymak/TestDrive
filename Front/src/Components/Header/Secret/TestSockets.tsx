import React, { useEffect, useState } from 'react';

import { testSocket } from './utils';

interface Props {
    toggleVisibleListTestSocket(): void;
}

export const TestSocket: React.FC<Props> = ({ toggleVisibleListTestSocket }) => {
    const [link, setLink] = useState('');
    const [block, setBlock] = useState('');
    const [front, setFront] = useState('');

    useEffect(() => {
        const allSocket = testSocket();
        allSocket.link.getData(setLink);
        allSocket.block.getData(setBlock);
    }, []);

    const closeTest = () => {
        toggleVisibleListTestSocket();
    };

    return (
        <div className="testSocket" onClick={closeTest}>
            <div className="testSocket_links">
                <h2>_links</h2>
                <span>{JSON.stringify(link, null, '\t')}</span>
            </div>
            <div className="testSocket_blocks">
                <h2>_contexts</h2>
                <span>{JSON.stringify(block, null, '\t')}</span>
            </div>
        </div>
    );
};
