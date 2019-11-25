function* generateSequence() {
    yield 0;
    yield 1;
    return 2;
}

export function checkNumberColumn() {
    let generator = generateSequence();
    return () => {
        const { value } = generator.next();
        if (value === undefined) {
            generator = generateSequence();
            return generator.next().value;
        }
        return value;
    };
}
