import { AnyEventObject } from 'xstate';
import { GameButtonComponent } from '../GameButton/GameButton';
import {
    GameButtonsWrapper,
    GameSizeInput,
    GameSizeInputTitle,
    LandingComponentWrapper,
} from './LandingComponent.styled';

interface LandingComponentProps {
    gameSize: number;
    send: (event: AnyEventObject) => void;
}

export const LandingComponent = ({ gameSize, send }: LandingComponentProps) => (
    <LandingComponentWrapper>
        <GameSizeInputTitle>Enter the size of the game</GameSizeInputTitle>
        <GameSizeInput
            aria-label="Enter the size of the gameboard..."
            placeholder="Enter the size of the gameboard..."
            type="number"
            min={2}
            value={gameSize}
            onChange={(e) => send({ type: 'CHANGE_FIELDS_NUMBER', value: Number(e.currentTarget.value) })}
        />
        <GameButtonsWrapper>
            <GameButtonComponent onClick={() => send({ type: 'START', value: false })}>Multiplayer</GameButtonComponent>
            <GameButtonComponent onClick={() => send({ type: 'START', value: true })}>
                AI (3x3 only)
            </GameButtonComponent>
        </GameButtonsWrapper>
    </LandingComponentWrapper>
);
