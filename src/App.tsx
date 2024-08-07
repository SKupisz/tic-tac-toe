import { useMachine } from '@xstate/react';
import { AppButtonsWrapper, AppHeader, AppPlayerHeader } from './App.styled';
import { ticTacToeMachine } from './state/TicTacToeMachine';
import { GameButtonComponent } from './components/GameButton/GameButton';
import { LandingComponent } from './components/LandingComponent/LandingComponent';
import { GameBoard } from './components/GameBoard/GameBoard';
import { GamesHistory } from './components/GamesHistory/GamesHistory';
import { useEffect } from 'react';

function App() {
    const [state, send] = useMachine(ticTacToeMachine);

    useEffect(() => {
        if (state.context.isAIPlaying && state.context.currentPlayer === 'O') {
            setTimeout(() => {
                send({ type: 'PLAY_AI_TURN' });
            }, 300);
        }
    }, [send, state.context.currentPlayer, state.context.isAIPlaying]);

    return (
        <>
            <AppHeader>Tic tac toe</AppHeader>
            {state.value === 'idle' ? (
                <LandingComponent gameSize={state.context.gameSize} send={send} />
            ) : (
                <>
                    <AppPlayerHeader>
                        {state.value === 'playing' || state.value === 'aiTurn'
                            ? `Player ${state.context.currentPlayer} turn`
                            : state.value === 'draw'
                              ? 'Draw'
                              : state.value === 'won' && `Player ${state.context.currentPlayer} wins`}
                    </AppPlayerHeader>
                    <GameBoard
                        gameSize={state.context.gameSize}
                        fields={state.context.fields}
                        send={send}
                        highlightedFields={state.context.highlightedFields}
                        isGamePlayed={state.value === 'playing'}
                    />
                    {state.value === 'playing' && (
                        <GameButtonComponent onClick={() => send({ type: 'SURRENDER' })} backgroundColor="red">
                            Surrender
                        </GameButtonComponent>
                    )}

                    {(state.value === 'draw' || state.value === 'won') && (
                        <AppButtonsWrapper>
                            <GameButtonComponent onClick={() => send({ type: 'GAMES_HISTORY' })}>
                                Games history
                            </GameButtonComponent>
                            <GameButtonComponent onClick={() => send({ type: 'PLAY_AGAIN' })}>
                                Play again
                            </GameButtonComponent>
                        </AppButtonsWrapper>
                    )}
                    {state.context.showHistory && <GamesHistory history={state.context.history} />}
                </>
            )}
        </>
    );
}

export default App;
