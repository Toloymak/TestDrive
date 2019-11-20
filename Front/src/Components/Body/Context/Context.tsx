import React from 'react';

import { BlockModelWithLinks } from 'src/Components/Content/Content';

import { Cell } from '../Cell';

interface Props extends BlockModelWithLinks {}

export const Context: React.FC<Props> = ({ links, name }) => {
    return (
        <>
            {links.map(item => (
                <Cell {...item} key={item.id} serviceName={name} />
            ))}
        </>
    );
};
