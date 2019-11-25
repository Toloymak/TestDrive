import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { dragEnd } from '@utils/DnDUtils';
import { BlockModelWithLinks } from 'src/Components/Content/Content';

import { Cell } from '../Cell';

interface Props extends BlockModelWithLinks {}

export const Context: React.FC<Props> = ({ links, name }) => {
    const [linksState, setLinksState] = useState(links);

    const onDragEnd = result => {
        dragEnd(result, linksState, setLinksState);
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? '#1c2134' : '',
        padding: 5,
        width: 320
    });

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {linksState.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {<Cell {...item} serviceName={name} />}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
