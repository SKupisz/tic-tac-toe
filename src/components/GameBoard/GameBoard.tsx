import { AnyEventObject } from 'xstate';
import { PlayingContainer, PlayingField } from './GameBoard.styled';

interface GameBoardProps {
    gameSize: number;
    fields: string[];
    send: (event: AnyEventObject) => void;
    highlightedFields: number[];
    isGamePlayed: boolean;
}

export const GameBoard = ({ gameSize, fields, send, highlightedFields, isGamePlayed }: GameBoardProps) => (
    <PlayingContainer gameSize={gameSize} aria-label="Tic Tac Toe Gameboard">
        {fields.map((field, index) => (
            <PlayingField
                isSelected={field !== '' || !isGamePlayed} //if the game is over, we don't want the user to be capable of selecting any boardcell more
                key={`field-${index}`}
                onClick={() => field === '' && send({ type: 'SELECT', value: index })}
                isHighlighted={highlightedFields.includes(index)}
                aria-label="Tic Tac Toe Gameboard cell"
            >
                {field}
            </PlayingField>
        ))}
    </PlayingContainer>
);
