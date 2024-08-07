import styled from 'styled-components';

export const LandingComponentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const GameSizeInputTitle = styled.h2`
    font-size: 1.2em;
    text-align: center;
`;

export const GameSizeInput = styled.input`
    border: none;
    background: transparent;
    color: #eee;
    font-size: 1.4em;
    padding-bottom: 4px;
    text-align: center;

    &:focus {
        outline: none;
    }
`;
export const GameButtonsWrapper = styled.div`
    display: flex;
    gap: 6px;
    justify-content: space-around;
`;
