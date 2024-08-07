import {
    checkIfCurrentPlayerWins,
    checkIfTheFieldsAreTakenByTheUser,
    findBestMove,
    getCurrentPlayerWinRows,
    getNewGameBoardState,
    minimax,
    switchThePlayer,
} from '../TicTacToeMachine.helper';

describe('Tic Tac Toe Machine helper functions', () => {
    it('checks if all of the fields given are taken by the user', () => {
        expect(checkIfTheFieldsAreTakenByTheUser(['X', 'X'], 'X')).toBeTruthy();
        expect(checkIfTheFieldsAreTakenByTheUser(['X', 'O'], 'O')).toBeFalsy();
        expect(checkIfTheFieldsAreTakenByTheUser([], 'X')).toBeFalsy();
    });

    it('checks if there is a winning row on the board', () => {
        expect(checkIfCurrentPlayerWins(['X', 'X', 'O'], 'X', 2)).toBeTruthy();
        expect(checkIfCurrentPlayerWins(['X', 'O', '', ''], 'O', 2)).toBeFalsy();
        expect(checkIfCurrentPlayerWins(['X', 'O', 'X', ''], 'X', 2)).toBeTruthy();
        expect(checkIfCurrentPlayerWins(['O', 'X', '', 'X'], 'X', 2)).toBeTruthy();
        expect(checkIfCurrentPlayerWins(['X', 'O', '', 'X'], 'X', 2)).toBeTruthy();
        expect(checkIfCurrentPlayerWins(['O', 'X', 'X', ''], 'X', 2)).toBeTruthy();
    });

    it('return the indices of the winning row on the board', () => {
        expect(getCurrentPlayerWinRows(['X', 'X', 'O', ''], 'X', 2)).toEqual([0, 1]);
        expect(getCurrentPlayerWinRows(['X', 'O', '', ''], 'O', 2)).toEqual([]);
        expect(getCurrentPlayerWinRows(['X', 'O', 'X', ''], 'X', 2)).toEqual([0, 2]);
        expect(getCurrentPlayerWinRows(['O', 'X', '', 'X'], 'X', 2)).toEqual([1, 3]);
        expect(getCurrentPlayerWinRows(['X', 'O', '', 'X'], 'X', 2)).toEqual([0, 3]);
        expect(getCurrentPlayerWinRows(['O', 'X', 'X', ''], 'X', 2)).toEqual([1, 2]);
    });

    it('updates the game board state', () => {
        expect(getNewGameBoardState(['', '', '', '', '', '', '', '', ''], 'X', 1)[1]).toBe('X');
        expect(getNewGameBoardState(['', 'X', '', '', '', '', '', '', ''], 'O', 2)[2]).toBe('O');
        expect(getNewGameBoardState(['', 'X', 'O', '', '', '', '', '', ''], 'X', 3)[0]).toBe('');
    });

    it('switches the players turns', () => {
        expect(switchThePlayer('X')).toEqual('O');
        expect(switchThePlayer('O')).toEqual('X');
    });
});

describe('Tic Tac Toe Machine AI helper functions', () => {
    it('should find the best move for O to win', () => {
        const board = ['O', 'X', 'X', '', 'O', '', '', '', ''];
        const bestMove = findBestMove(board, 3);
        expect(bestMove).toBe(8);
    });

    it('should block X from winning', () => {
        const board = ['X', 'X', '', '', 'O', '', '', '', 'O'];
        const bestMove = findBestMove(board, 3);
        expect(bestMove).toBe(2);
    });

    it('should choose the center if it is available', () => {
        const board = ['X', '', '', '', '', '', '', '', ''];
        const bestMove = findBestMove(board, 3);
        expect(bestMove).toBe(4);
    });

    it('should find the best move for a nearly full board', () => {
        const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', ''];
        const bestMove = findBestMove(board, 3);
        expect(bestMove).toBe(8);
    });

    it('minimax should return the correct score for a winning board', () => {
        const board = ['O', 'O', 'O', 'X', 'X', '', '', '', ''];
        const score = minimax(board, 0, true, 3);
        expect(score).toBe(10);
    });

    it('minimax should return the correct score for a losing board', () => {
        const board = ['X', 'X', 'X', 'O', 'O', '', '', '', ''];
        const score = minimax(board, 0, false, 3);
        expect(score).toBe(-10);
    });

    it('minimax should return 0 for a tied board', () => {
        const board = ['X', 'O', 'X', 'X', 'O', 'X', 'O', 'X', 'O'];
        const score = minimax(board, 0, true, 3);
        expect(score).toBe(0);
    });
});
