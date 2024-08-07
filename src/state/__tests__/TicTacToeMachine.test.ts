import { createActor } from 'xstate';
import { ticTacToeMachine } from '../TicTacToeMachine';

describe('Tic Tac Toe Machine', () => {
    it('should be starting with the idle state as the default one', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        const snapshot = machine.getSnapshot();
        expect(snapshot.value).toEqual('idle');
        machine.stop();
    });

    it('should be able to change the GameBoard size and start playing', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        const snapshot = machine.getSnapshot();
        expect(snapshot.value).toEqual('idle');
        machine.send({ type: 'CHANGE_FIELDS_NUMBER', value: 4 });
        const snapshotAfterChangingSize = machine.getSnapshot();
        expect(snapshotAfterChangingSize.context.fields.length).toEqual(16);
        expect(snapshotAfterChangingSize.context.gameSize).toBe(4);
        machine.send({ type: 'START' });
        const snapshotAfterStarting = machine.getSnapshot();
        expect(snapshotAfterStarting.value).toEqual('playing');
        machine.stop();
    });

    it('should be able to play and win', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        machine.send({ type: 'CHANGE_FIELDS_NUMBER', value: 2 });
        const snapshotAfterChangingSize = machine.getSnapshot();
        expect(snapshotAfterChangingSize.context.gameSize).toBe(2);
        machine.send({ type: 'START' });
        const snapshotAfterStarting = machine.getSnapshot();
        expect(snapshotAfterStarting.value).toEqual('playing');
        machine.send({ type: 'SELECT', value: 0 });
        const snapshotAfterXFirstMove = machine.getSnapshot();
        expect(snapshotAfterXFirstMove.context.fields[0]).toEqual('X');
        expect(snapshotAfterXFirstMove.context.currentPlayer).toEqual('O');
        machine.send({ type: 'SELECT', value: 1 });
        machine.send({ type: 'SELECT', value: 2 });
        const snapshotAfterWinning = machine.getSnapshot();
        expect(snapshotAfterWinning.value).toEqual('won');
        expect(snapshotAfterWinning.context.highlightedFields).toHaveLength(2);

        machine.stop();
    });

    it('should be able to play and end up with a draw', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        machine.send({ type: 'START' });
        const snapshotAfterStarting = machine.getSnapshot();
        expect(snapshotAfterStarting.value).toEqual('playing');

        machine.send({ type: 'SELECT', value: 0 });
        machine.send({ type: 'SELECT', value: 2 });
        machine.send({ type: 'SELECT', value: 1 });
        machine.send({ type: 'SELECT', value: 3 });
        machine.send({ type: 'SELECT', value: 5 });
        machine.send({ type: 'SELECT', value: 4 });
        machine.send({ type: 'SELECT', value: 6 });
        machine.send({ type: 'SELECT', value: 7 });
        machine.send({ type: 'SELECT', value: 8 });
        const snapshotAfterWinning = machine.getSnapshot();
        expect(snapshotAfterWinning.value).toEqual('draw');

        machine.stop();
    });

    it('should be able to play and surrender', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        machine.send({ type: 'START' });
        const snapshotAfterStarting = machine.getSnapshot();
        expect(snapshotAfterStarting.value).toEqual('playing');
        machine.send({ type: 'SELECT', value: 0 });

        machine.send({ type: 'SURRENDER' });
        const snapshotAfterSurrendering = machine.getSnapshot();
        expect(snapshotAfterSurrendering.value).toEqual('won');
        expect(snapshotAfterSurrendering.context.currentPlayer).toEqual('X');

        machine.stop();
    });

    it('allows the user to play again', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        machine.send({ type: 'START' });
        machine.send({ type: 'SURRENDER' });
        const snapshotAfterSurrendering = machine.getSnapshot();
        expect(snapshotAfterSurrendering.value).toEqual('won');
        machine.send({ type: 'PLAY_AGAIN' });
        const snapshotAfterPlayingAgain = machine.getSnapshot();
        expect(snapshotAfterPlayingAgain.value).toEqual('idle');
        expect(snapshotAfterPlayingAgain.context.currentPlayer).toEqual('X');
        expect(snapshotAfterPlayingAgain.context.fields).toHaveLength(9);
        expect(snapshotAfterPlayingAgain.context.gameSize).toEqual(3);
        expect(snapshotAfterPlayingAgain.context.showHistory).toBeFalsy();
        expect(snapshotAfterPlayingAgain.context.history).toEqual(['Player O wins']);
        expect(snapshotAfterPlayingAgain.context.highlightedFields).toHaveLength(0);

        machine.stop();
    });

    it('can let the AI win the match', () => {
        const machine = createActor(ticTacToeMachine);

        machine.start();
        machine.send({ type: 'START', value: true });
        machine.send({ type: 'SELECT', value: 0 });
        const snapshotAfterReceivingAIState = machine.getSnapshot();
        expect(snapshotAfterReceivingAIState.value).toEqual('aiTurn');
        machine.send({ type: 'PLAY_AI_TURN' });
        const snapshotForCheckingTheGame = machine.getSnapshot();
        expect(snapshotForCheckingTheGame.context.fields[4]).toEqual('O');
        machine.send({ type: 'SELECT', value: 2 });
        machine.send({ type: 'PLAY_AI_TURN' });
        machine.send({ type: 'SELECT', value: 5 });
        machine.send({ type: 'PLAY_AI_TURN' });
        const snapshotAfterAIVictory = machine.getSnapshot();
        expect(snapshotAfterAIVictory.value).toEqual('won');

        machine.stop();
    });
});
