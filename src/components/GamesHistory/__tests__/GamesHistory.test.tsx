import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GamesHistory } from '../GamesHistory';

const MOCK_HISTORY = ['test', 'test2'];
expect.extend(toHaveNoViolations);

describe('Game button', () => {
    it('should have no a11y violations', async () => {
        const { container } = render(<GamesHistory history={MOCK_HISTORY} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should display the matches', () => {
        const { queryAllByText } = render(<GamesHistory history={MOCK_HISTORY} />);

        expect(queryAllByText(/test/i)).toHaveLength(2);
        expect(queryAllByText(/Match/i)).toHaveLength(2);
    });
});
