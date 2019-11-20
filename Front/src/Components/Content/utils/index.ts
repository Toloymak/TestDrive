export enum Navigator {
    preview,
    next
}

export function counterNavi(action: Navigator, counterNavigation: number, dataLength: number): number {
    const lastIndex = dataLength - 1;
    let current = counterNavigation;
    action === Navigator.next ? current++ : current--;

    if (current > lastIndex) {
        return 0;
    }

    if (current < 0) {
        return lastIndex;
    }

    return current;
}
