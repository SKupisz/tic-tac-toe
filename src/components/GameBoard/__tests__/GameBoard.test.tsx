import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GameBoard } from '../GameBoard';

expect.extend(toHaveNoViolations);

describe('Game button', () => {
    it('should have no a11y violations', async () => {
        const { container } = render(
            <GameBoard gameSize={2} highlightedFields={[]} fields={['', '', '', '']} send={() => {}} isGamePlayed />,
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should render the according number of the grid cells', () => {
        const { queryAllByLabelText } = render(
            <GameBoard
                gameSize={3}
                highlightedFields={[]}
                fields={['', '', '', '', '', '', '', '', '']}
                send={() => {}}
                isGamePlayed
            />,
        );
        expect(queryAllByLabelText(/Tic Tac Toe Gameboard cell/i)).toHaveLength(9);
    });

    it('can select a free field', () => {
        const MOCK_SEND = jest.fn();
        const { queryAllByLabelText } = render(
            <GameBoard gameSize={2} highlightedFields={[]} fields={['', '', '', '']} send={MOCK_SEND} isGamePlayed />,
        );
        const gameboardCells = queryAllByLabelText(/Tic Tac Toe Gameboard cell/i);
        expect(gameboardCells).toHaveLength(4);

        fireEvent.click(gameboardCells[1]);

        expect(MOCK_SEND).toHaveBeenCalledWith({ type: 'SELECT', value: 1 });
    });

    it('cannot select an already taken field', () => {
        const MOCK_SEND = jest.fn();
        const { queryAllByLabelText } = render(
            <GameBoard gameSize={2} highlightedFields={[]} fields={['', 'X', '', '']} send={MOCK_SEND} isGamePlayed />,
        );
        const gameboardCells = queryAllByLabelText(/Tic Tac Toe Gameboard cell/i);
        expect(gameboardCells).toHaveLength(4);

        fireEvent.click(gameboardCells[1]);

        expect(MOCK_SEND).toHaveBeenCalledTimes(0);

        fireEvent.click(gameboardCells[0]);

        expect(MOCK_SEND).toHaveBeenCalledTimes(1);
    });

    it('highlights the winning combination', () => {
        const MOCK_SEND = jest.fn();
        const { queryAllByLabelText } = render(
            <GameBoard
                gameSize={2}
                highlightedFields={[0, 1]}
                fields={['X', 'X', 'O', '']}
                send={MOCK_SEND}
                isGamePlayed
            />,
        );
        const gameboardCells = queryAllByLabelText(/Tic Tac Toe Gameboard cell/i);
        expect(gameboardCells).toHaveLength(4);
        const firstSelectedField = gameboardCells[0];
        const styles = getComputedStyle(firstSelectedField);
        expect(styles.backgroundColor).toBe('rgba(25, 156, 11, 0.631)'); // the getComputedStyle function handles only the rgba currently, that's why instead of the hex code I used the RGBA's one
    });
});
