import { fireEvent, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LandingComponent } from '../LandingComponent';

expect.extend(toHaveNoViolations);

const MOCK_GAME_SIZE = 3;
const MOCK_SEND = jest.fn();

describe('Landing Component', () => {
    it('should have no a11y violations', async () => {
        const { container } = render(<LandingComponent gameSize={MOCK_GAME_SIZE} send={MOCK_SEND} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should display the header, the input and the button', () => {
        const { getAllByRole, getByText, getByLabelText } = render(
            <LandingComponent gameSize={MOCK_GAME_SIZE} send={MOCK_SEND} />,
        );
        expect(getByText(/Enter the size of the game/i));
        expect(getByLabelText(/Enter the size of the gameboard/i));
        expect(getAllByRole('button')).toHaveLength(2);
    });

    it('should call the send function in case of changing the game size or starting it', () => {
        const { getAllByRole, getByLabelText } = render(
            <LandingComponent gameSize={MOCK_GAME_SIZE} send={MOCK_SEND} />,
        );
        expect(getByLabelText(/Enter the size of the gameboard/i));
        fireEvent.change(getByLabelText(/Enter the size of the gameboard/i), { target: { value: '4' } });
        expect(getAllByRole('button'));
        fireEvent.click(getAllByRole('button')[0]);
        expect(MOCK_SEND).toHaveBeenCalledTimes(2);
        fireEvent.click(getAllByRole('button')[1]);
        expect(MOCK_SEND).toHaveBeenCalledTimes(3);
    });
});
