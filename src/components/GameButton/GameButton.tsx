import { GameButton, GameButtonWrapper } from './GameButton.styled';

interface GameButtonComponentProps {
    children: string;
    onClick: () => void;
    backgroundColor?: string;
}

export const GameButtonComponent = ({ children, onClick, backgroundColor }: GameButtonComponentProps) => (
    <GameButtonWrapper>
        <GameButton type="button" onClick={onClick} backgroundColor={backgroundColor}>
            {children}
        </GameButton>
    </GameButtonWrapper>
);
