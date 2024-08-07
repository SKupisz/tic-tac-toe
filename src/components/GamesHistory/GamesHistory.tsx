import { GamesHistoryGame, GamesHistoryWrapper } from './GamesHistory.styled';

interface GamesHistoryProps {
    history: string[];
}

export const GamesHistory = ({ history }: GamesHistoryProps) => (
    <GamesHistoryWrapper aria-label="History of the matches">
        {history.map((match, index) => (
            <GamesHistoryGame aria-label={`Match ${index + 1} history`} key={`match-${index}`}>
                <div>Match {index + 1}</div>
                <div>{match}</div>
            </GamesHistoryGame>
        ))}
    </GamesHistoryWrapper>
);
