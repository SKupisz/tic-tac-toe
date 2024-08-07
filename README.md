## Tic Tac Toe app

Before you run this app, make sure you have the Node.Js and npm installed on your device.

## How to run the application

1. Clone it into your machine
2. Go into the directory of the app
3. Run `npm install`
4. Type `npm run dev`
5. Go to http://localhost:5173/

## Playing with the applcations

To play the tic-tac-toe, either select the size of the game board and click "Multiplayer", if you want to play with someone, or press the "AI (3x3 only)" button, which will allow you to play against AI on a 3x3 board.

In case you want to give up, you can press the "Surrender" button below the game board.

If one of the players wins, the gameboard cells with their symbol, either X or O, will be enlighted green.

After each round, you are available to see the history of the games by pressing the "Games history" button, which will pop out the records of each registered game underneath.

## App design

In order to make the application work, I used React.Js, XState for the State Management, Styled Components for the UI and Jest for unit testing.

I have divided the projects' structure into the main file, which is `App.tsx` and two folder:

-   components, containing the UI components which were either reusable or complex
-   state, for keeping everything related to the XState state machine

## AI algorithm

For the implementation of AI, I used the simplest version of the minimax algorithm. The version implemented works only in 3x3 mode.

## Testing

In order to test the application, run `npm run test` which will go through all the tests written and leave you with the report upon the application code coverage.
