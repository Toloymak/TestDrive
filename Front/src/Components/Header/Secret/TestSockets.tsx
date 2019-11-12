import * as React from 'react';
import {testSocket} from './utils';
import {useEffect, useState} from 'react';

interface Props {
    visibleListTestSocket: boolean;
    toggleVisibleListTestSocket(): void;
}

export const TestSocket: React.FC<Props> = ({visibleListTestSocket, toggleVisibleListTestSocket}) => {

    const [link, setLink] = useState('');
    const [block, setBlock] = useState('');
    const [front, setFront] = useState('');

    useEffect(() => {
        const allSocket = testSocket();
        allSocket.link.getData(setLink)
        allSocket.block.getData(setBlock)
        allSocket.front.getData(setFront)
    }, [])
    
    const closeTest = () => {
        toggleVisibleListTestSocket();
    }

    return <div className="testSocket" onClick={closeTest}>
      <div className="testSocket_links">
          <h2>_links</h2>
          <span>{JSON.stringify(link, null, '\t')}</span>
      </div>
      <div className="testSocket_blocks">
          <h2>_blocks</h2>
          <span>{JSON.stringify(block, null, '\t')}</span>
      </div>
      <div className="testSocket_front">
          <h2>_front</h2>
          <span>{JSON.stringify(front, null, '\t')}</span>
      </div>
    </div>
}