export const checkIfTheFieldsAreTakenByTheUser = (fields: string[], player: string) =>
    fields.every((field) => field === player) && fields.length > 0;

export const getCurrentPlayerWinRows = (fields: string[], currentPlayer: string, playingSize: number) => {
    // Checking the diagonal
    const elementsOftheDiagonal = fields.filter((_, index) => index % playingSize === Math.floor(index / playingSize));
    if (checkIfTheFieldsAreTakenByTheUser(elementsOftheDiagonal, currentPlayer))
        return elementsOftheDiagonal.map((_, index) => index * playingSize + index);

    // Checking the anti-diagonal
    const elementsOftheAntiDiagonal = fields.filter(
        (_, index) => (index % playingSize) + Math.floor(index / playingSize) === playingSize - 1,
    );
    // To get the correct indexes of the antidiagonal, we have to use the formula of index*playingSize + playingSize - index - 1 = playingSize*(index+1) - (index+1) = (playingSize - 1)*(index+1)
    if (checkIfTheFieldsAreTakenByTheUser(elementsOftheAntiDiagonal, currentPlayer))
        return elementsOftheAntiDiagonal.map((_, index) => (playingSize - 1) * (index + 1));

    for (let i = 0; i < playingSize; i++) {
        // Checking for the column
        const currentlyCheckedColumn = fields.filter((_, index) => index % playingSize === i);
        if (checkIfTheFieldsAreTakenByTheUser(currentlyCheckedColumn, currentPlayer))
            return [...Array(playingSize)].map((_, index) => playingSize * index + i);

        // Checking the rows
        const currentlyCheckedRow = fields.slice(i * playingSize, (i + 1) * playingSize);
        if (checkIfTheFieldsAreTakenByTheUser(currentlyCheckedRow, currentPlayer))
            return [...Array(playingSize)].map((_, index) => playingSize * i + index);
    }

    return [];
};

export const checkIfCurrentPlayerWins = (fields: string[], currentPlayer: string, playingSize: number) =>
    getCurrentPlayerWinRows(fields, currentPlayer, playingSize).length > 0;

export const getNewGameBoardState = (fields: string[], currentPlayer: string, value: number) =>
    fields.map((field, ind) => (ind === value ? currentPlayer : field));

export const switchThePlayer = (player: string) => (player === 'X' ? 'O' : 'X');

export const minimax = (fields: string[], depth: number, isMaximizing: boolean, playingSize: number): number => {
    if (checkIfCurrentPlayerWins(fields, 'X', playingSize)) return -10 + depth;
    if (checkIfCurrentPlayerWins(fields, 'O', playingSize)) return 10 - depth;
    if (fields.every((square) => square !== '')) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] === '') {
                fields[i] = 'O';
                best = Math.max(best, minimax(fields, depth + 1, false, playingSize));
                fields[i] = '';
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] === '') {
                fields[i] = 'X';
                best = Math.min(best, minimax(fields, depth + 1, true, playingSize));
                fields[i] = '';
            }
        }
        return best;
    }
};

export const findBestMove = (fields: string[], playingSize: number): number => {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] === '') {
            fields[i] = 'O';
            const moveVal = minimax(fields, 0, false, playingSize);
            fields[i] = '';
            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
};
