import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GameButtonComponent } from '../GameButton';

const MOCK_TEXT = 'loremIpsum';
const MOCK_ON_CLICK = jest.fn();
expect.extend(toHaveNoViolations);

describe('Game button', () => {
    it('should have no a11y violations', async () => {
        const { container } = render(<GameButtonComponent onClick={MOCK_ON_CLICK}>{MOCK_TEXT}</GameButtonComponent>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should display the button', () => {
        const { getByRole, getByText } = render(
            <GameButtonComponent onClick={MOCK_ON_CLICK}>{MOCK_TEXT}</GameButtonComponent>,
        );

        expect(getByRole('button'));
        expect(getByText(MOCK_TEXT));
    });

    it('handles the onClick callback', () => {
        const { getByRole } = render(<GameButtonComponent onClick={MOCK_ON_CLICK}>{MOCK_TEXT}</GameButtonComponent>);

        expect(getByRole('button'));

        fireEvent.click(getByRole('button'));
        expect(MOCK_ON_CLICK).toHaveBeenCalledTimes(1);
    });

    it('adjusts the background color according to the backgroundColor prop', () => {
        const { getByRole } = render(
            <GameButtonComponent onClick={MOCK_ON_CLICK} backgroundColor="red">
                {MOCK_TEXT}
            </GameButtonComponent>,
        );

        expect(getByRole('button'));
        const styles = getComputedStyle(getByRole('button'));
        expect(styles.backgroundColor).toBe('red');
    });
});
