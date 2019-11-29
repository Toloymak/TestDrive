import React, { useEffect, useState } from 'react';

import { BlockModelWithLinks } from 'src/Components/Content/Content';
import { checkNumberColumn } from 'src/Components/Body/Context/utils/sortByColumn';

import { Cell } from '../Cell';

import style from './Context.module.less';

interface Props extends BlockModelWithLinks {}

export const Context: React.FC<Props> = ({ links, name }) => {
    const [linksState, setLinksState] = useState([]);
    const [columnLinks, setColumnLinks] = useState({
        0: [],
        1: [],
        2: []
    });

    const setLinksByColumn = () => {
        if (links.length) {
            const getNumber = checkNumberColumn();
            const newLinks = {
                0: [],
                1: [],
                2: []
            };
            links.forEach(item => {
                const column = getNumber();
                newLinks[column].push(item);
            });
            setColumnLinks(newLinks);
        }
    };

    useEffect(() => setLinksState(links), [links]);
    useEffect(
        () => {
            if (linksState.length > 1) {
                setLinksByColumn();
            }
        },
        [linksState]
    );

    return (
        <>
            {linksState.length < 2 ? (
                <div className={style.cellContainer}>
                    {linksState.map(item => (
                        <Cell {...item} key={item.id} />
                    ))}
                </div>
            ) : (
                <>
                    <div className={style.cellContainer}>
                        {columnLinks[0].map(item => (
                            <Cell {...item} key={item.id} />
                        ))}
                    </div>
                    <div className={style.cellContainer}>
                        {columnLinks[1].map(item => (
                            <Cell {...item} key={item.id} />
                        ))}
                    </div>
                    <div className={style.cellContainer}>
                        {columnLinks[2].map(item => (
                            <Cell {...item} key={item.id} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};
