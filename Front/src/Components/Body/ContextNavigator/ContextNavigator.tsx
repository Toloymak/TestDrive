import React, { useState } from 'react';
import Tooltip from '@skbkontur/react-ui/Tooltip';

import { classContainer, className, classNavi } from 'src/Components/Body/ContextNavigator/utils/ClassesElements';
import { Navigator } from 'src/Components/Content/utils';

interface Props {
    counterNavigation: number;
    serviceName: string;

    selectOtherBlock(action: Navigator): void;
}

export const ContextNavigator: React.FC<Props> = ({ serviceName, selectOtherBlock }) => {
    const [arrowColor, setArrowColor] = useState('#1D2439');
    const next = (): void => {
        selectOtherBlock(Navigator.next);
    };

    const preview = (): void => {
        selectOtherBlock(Navigator.preview);
    };

    const arrows = document.querySelectorAll(`.${classNavi}`);
    if (arrows.length) {
        arrows.forEach(item => {
            item.addEventListener('mousedown', () => {
                setArrowColor('#1D2439');
            });
            item.addEventListener('mouseup', () => {
                setArrowColor('#1D243996');
            });
        });
    }

    return (
        <div className={classContainer}>
            <Tooltip pos="left top" trigger={'hover'} render={() => 'Вправо'}>
                <span className={classNavi} onClick={next}>
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x="0.5"
                            y="40.5"
                            width="40"
                            height="40"
                            rx="20"
                            transform="rotate(-90 0.5 40.5)"
                            fill={arrowColor}
                            stroke="#313B60"
                        />
                        <path
                            d="M24 29L15 20L24 11"
                            stroke="#313B60"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </Tooltip>

            <span className={className}>{serviceName}</span>

            <Tooltip pos="right top" trigger={'hover'} render={() => 'Влево'}>
                <span className={classNavi} onClick={preview}>
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect
                            x="40.5"
                            y="0.5"
                            width="40"
                            height="40"
                            rx="20"
                            transform="rotate(90 40.5 0.5)"
                            fill={arrowColor}
                            stroke="#313B60"
                        />
                        <path
                            d="M17 12L26 21L17 30"
                            stroke="#313B60"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </Tooltip>
        </div>
    );
};
