export function dragEnd(result, stateItems, setState): void {
    if (!result.destination) {
        return;
    }
    const newItems = reorder(stateItems, result.source.index, result.destination.index);
    setState(newItems);
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

// export function dragEndDual(result): void {
//     const { source, destination } = result;
//     if (!destination) {
//         return;
//     }
//
//     if (source.droppableId === destination.droppableId) {
//         const items = reorder(
//             this.getList(source.droppableId),
//             source.index,
//             destination.index
//         );
//
//         let state = { items };
//
//         if (source.droppableId === 'droppable2') {
//             state = { selected: items };
//         }
//
//         this.setState(state);
//     } else {
//         const result = move(
//             this.getList(source.droppableId),
//             this.getList(destination.droppableId),
//             source,
//             destination
//         );
//
//         this.setState({
//             items: result.droppable,
//             selected: result.droppable2
//         });
//     }
// };
