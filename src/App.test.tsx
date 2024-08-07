import { fireEvent, render, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

expect.extend(toHaveNoViolations);

describe('Game button', () => {
    it('should have no a11y violations', async () => {
        const { container } = render(<App />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('loads the landing page by default', () => {
        const { getByText } = render(<App />);
        expect(getByText(/Tic tac toe/i));
        expect(getByText(/Enter the size of the game/i));
    });

    it('goes to the game after clicking the start 2x2 button', () => {
        const { getByText, getByLabelText } = render(<App />);
        expect(getByText(/Multiplayer/i));
        fireEvent.click(getByText(/Multiplayer/i));

        expect(getByText(/Player X turn/i));
        expect(getByLabelText('Tic Tac Toe Gameboard'));
        expect(getByText(/Surrender/i));
    });

    it('can surrender the match, see the history and return to the idle state', () => {
        const { getByText, getByLabelText } = render(<App />);
        expect(getByText(/Multiplayer/i));
        fireEvent.click(getByText(/Multiplayer/i));

        expect(getByText(/Surrender/i));
        fireEvent.click(getByText(/Surrender/i));

        expect(getByText(/Player O wins/i));
        expect(getByText(/Games history/i));
        expect(getByText(/Play again/i));

        fireEvent.click(getByText(/Games history/i));
        expect(getByLabelText(/History of the matches/i));
        expect(getByLabelText(/History of the matches/i).children).toHaveLength(1);

        fireEvent.click(getByText(/Play again/i));
        expect(getByText(/Enter the size of the game/i));
    });

    it('ends up the match with a draw in case it happens', () => {
        const { getByText, queryAllByLabelText } = render(<App />);
        expect(getByText(/Multiplayer/i));
        fireEvent.click(getByText(/Multiplayer/i));

        const gameboardCells = queryAllByLabelText(/Tic Tac Toe Gameboard cell/i);
        expect(gameboardCells).toHaveLength(9);

        fireEvent.click(gameboardCells[0]);
        expect(getByText(/Player O turn/i));
        fireEvent.click(gameboardCells[2]);
        fireEvent.click(gameboardCells[1]);
        fireEvent.click(gameboardCells[3]);
        fireEvent.click(gameboardCells[5]);
        fireEvent.click(gameboardCells[4]);
        fireEvent.click(gameboardCells[6]);
        fireEvent.click(gameboardCells[7]);
        fireEvent.click(gameboardCells[8]);

        expect(getByText(/Draw/i));
    });

    it('can play against AI', () => {
        const { getByText, queryAllByLabelText } = render(<App />);
        expect(getByText(/AI \(3x3 only\)/i));
        fireEvent.click(getByText(/AI \(3x3 only\)/i));

        const gameboardCells = queryAllByLabelText(/Tic Tac Toe Gameboard cell/i);
        expect(gameboardCells).toHaveLength(9);

        fireEvent.click(gameboardCells[0]);
        waitFor(() => {
            expect(
                queryAllByLabelText(/Tic Tac Toe Gameboard cell/i).filter((elem) => elem.textContent === ''),
            ).toHaveLength(7);
        });
    });
});
