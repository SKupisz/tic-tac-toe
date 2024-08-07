import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #111;
        color: #eee;
        font-family: sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
`;

export const AppHeader = styled.h1`
    text-align: center;
    font-size: 1.8em;
    padding-bottom: 16px;
`;

export const AppPlayerHeader = styled.h2`
    text-align: center;
    font-size: 1.5em;
    padding-bottom: 16px;
`;

export const AppButtonsWrapper = styled.div`
    display: flex;
    gap: 4px;
    justify-content: space-around;
`;
