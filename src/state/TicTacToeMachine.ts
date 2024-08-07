import { assign, createMachine } from 'xstate';
import {
    getNewGameBoardState,
    checkIfCurrentPlayerWins,
    getCurrentPlayerWinRows,
    switchThePlayer,
    findBestMove,
} from './TicTacToeMachine.helper';

export const ticTacToeMachine = createMachine({
    id: 'ticTacToeMachine',
    context: {
        currentPlayer: 'X',
        fields: ['', '', '', '', '', '', '', '', ''],
        gameSize: 3,
        highlightedFields: [] as number[],
        history: [] as string[],
        isAIPlaying: false,
        showHistory: false,
    },
    initial: 'idle',
    states: {
        idle: {
            on: {
                START: {
                    target: 'playing',
                    actions: assign({
                        currentPlayer: 'X',
                        isAIPlaying: (state) => state.event.value as boolean,
                        fields: (state) =>
                            state.event.value ? ['', '', '', '', '', '', '', '', ''] : state.context.fields,
                        gameSize: (state) => (state.event.value ? 3 : state.context.gameSize),
                    }),
                },
                CHANGE_FIELDS_NUMBER: {
                    target: 'idle',
                    actions: assign({
                        gameSize: (state) => state.event.value,
                        fields: (state) => [...Array(state.event.value * state.event.value)].map(() => ''),
                    }),
                },
            },
        },
        playing: {
            on: {
                SELECT: [
                    {
                        target: 'draw',
                        guard: (state) =>
                            !getNewGameBoardState(
                                state.context.fields,
                                state.context.currentPlayer,
                                state.event.value,
                            ).some((field) => field === ''),
                        actions: assign({
                            fields: (state) =>
                                getNewGameBoardState(
                                    state.context.fields,
                                    state.context.currentPlayer,
                                    state.event.value,
                                ),
                            history: (state) => [...state.context.history, 'Draw'],
                        }),
                    },
                    {
                        target: 'won',
                        guard: (state) =>
                            checkIfCurrentPlayerWins(
                                state.context.fields.map((field, ind) =>
                                    ind === state.event.value ? state.context.currentPlayer : field,
                                ),
                                state.context.currentPlayer,
                                state.context.gameSize,
                            ),
                        actions: assign({
                            fields: (state) =>
                                getNewGameBoardState(
                                    state.context.fields,
                                    state.context.currentPlayer,
                                    state.event.value,
                                ),
                            highlightedFields: (state) =>
                                getCurrentPlayerWinRows(
                                    state.context.fields.map((field, ind) =>
                                        ind === state.event.value ? state.context.currentPlayer : field,
                                    ),
                                    state.context.currentPlayer,
                                    state.context.gameSize,
                                ),
                            history: (state) => [
                                ...state.context.history,
                                `Player ${state.context.currentPlayer} wins`,
                            ],
                        }),
                    },
                    {
                        target: 'aiTurn',
                        guard: (state) => state.context.isAIPlaying,
                        actions: assign({
                            currentPlayer: 'O',
                            fields: (state) =>
                                getNewGameBoardState(
                                    state.context.fields,
                                    state.context.currentPlayer,
                                    state.event.value,
                                ),
                        }),
                    },
                    {
                        target: 'playing',
                        actions: assign({
                            currentPlayer: (state) => switchThePlayer(state.context.currentPlayer),
                            fields: (state) =>
                                getNewGameBoardState(
                                    state.context.fields,
                                    state.context.currentPlayer,
                                    state.event.value,
                                ),
                        }),
                    },
                ],
                SURRENDER: {
                    target: 'won',
                    actions: assign({
                        currentPlayer: (state) => switchThePlayer(state.context.currentPlayer),
                        history: (state) => [
                            ...state.context.history,
                            `Player ${switchThePlayer(state.context.currentPlayer)} wins`,
                        ],
                    }),
                },
            },
        },
        aiTurn: {
            on: {
                PLAY_AI_TURN: [
                    // As the AI always plays as the second player (the 'O' one), it'll never be the one finishing the game, hence the 'draw' state for the AI playing is pointless
                    {
                        target: 'won',
                        guard: (state) =>
                            checkIfCurrentPlayerWins(
                                state.context.fields.map((field, ind) =>
                                    ind === findBestMove(state.context.fields, state.context.gameSize)
                                        ? state.context.currentPlayer
                                        : field,
                                ),
                                state.context.currentPlayer,
                                state.context.gameSize,
                            ),
                        actions: assign({
                            fields: (state) =>
                                getNewGameBoardState(
                                    state.context.fields,
                                    state.context.currentPlayer,
                                    findBestMove(state.context.fields, state.context.gameSize),
                                ),
                            highlightedFields: (state) =>
                                getCurrentPlayerWinRows(
                                    state.context.fields.map((field, ind) =>
                                        ind === findBestMove(state.context.fields, state.context.gameSize)
                                            ? state.context.currentPlayer
                                            : field,
                                    ),
                                    state.context.currentPlayer,
                                    state.context.gameSize,
                                ),
                            history: (state) => [
                                ...state.context.history,
                                `Player ${state.context.currentPlayer} wins`,
                            ],
                        }),
                    },
                    {
                        target: 'playing',
                        actions: assign({
                            currentPlayer: 'X',
                            fields: (state) =>
                                getNewGameBoardState(
                                    state.context.fields,
                                    state.context.currentPlayer,
                                    findBestMove(state.context.fields, state.context.gameSize),
                                ),
                        }),
                    },
                ],
            },
        },
        draw: {
            on: {
                PLAY_AGAIN: {
                    target: 'idle',
                    actions: assign({
                        currentPlayer: 'X',
                        fields: ['', '', '', '', '', '', '', '', ''],
                        gameSize: 3,
                        highlightedFields: [],
                        isAIPlaying: false,
                        showHistory: false,
                    }),
                },
                GAMES_HISTORY: {
                    target: 'won',
                    actions: assign({
                        showHistory: true,
                    }),
                },
            },
        },
        won: {
            on: {
                PLAY_AGAIN: {
                    target: 'idle',
                    actions: assign({
                        currentPlayer: 'X',
                        fields: ['', '', '', '', '', '', '', '', ''],
                        gameSize: 3,
                        highlightedFields: [],
                        isAIPlaying: false,
                        showHistory: false,
                    }),
                },
                GAMES_HISTORY: {
                    target: 'won',
                    actions: assign({
                        showHistory: true,
                    }),
                },
            },
        },
    },
});
