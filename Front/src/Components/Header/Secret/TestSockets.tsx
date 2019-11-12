import * as React from 'react';
import {testSocket} from './utils';
import {useEffect, useState} from 'react';

interface Props {
    visibleListTestSocket: boolean;
}

export const TestSocket: React.FC<Props> = ({visibleListTestSocket}) => {

    const [link, setLink] = useState('');
    const [block, setBlock] = useState('');
    const [front, setFront] = useState('');

    useEffect(() => {
        const allSocket = testSocket();
        allSocket.link.getData(setLink)
        allSocket.block.getData(setBlock)
        allSocket.front.getData(setFront)
    }, [])



    console.log(link);
    console.log(block);
    console.log(front);

    return <div className="testSocket">
      <div className="testSocket_links">
          <h2>_links</h2>
          <span>{JSON.stringify(link)}</span>
      </div>
      <div className="testSocket_blocks">
          <h2>_blocks</h2>
          <span>{JSON.stringify(block)}</span>
      </div>
      <div className="testSocket_front">
          <h2>_front</h2>
          <span>{JSON.stringify(front)}</span>
      </div>
    </div>
}