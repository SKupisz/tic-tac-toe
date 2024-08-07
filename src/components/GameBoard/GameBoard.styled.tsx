import styled from 'styled-components';

export const PlayingContainer = styled.section<{ gameSize: number }>`
    padding: 10px 0px;
    display: grid;
    grid-template-columns: repeat(${(props) => props.gameSize}, 1fr);
    grid-template-rows: repeat(${(props) => props.gameSize}, 1fr);
    gap: 4px;
    width: min(calc(100vw - 20px), calc(100vh - 20px));
    height: min(calc(100vw - 20px), calc(100vh - 20px));

    @media screen and (min-width: 375px) {
        width: 300px;
        height: 300px;
    }

    @media screen and (min-width: 425px) {
        width: 350px;
        height: 350px;
    }
`;

export const PlayingField = styled.button<{
    isSelected: boolean;
    isHighlighted: boolean;
}>`
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px solid #eee;
    background: ${(props) => (props.isHighlighted ? '#199c0ba1' : 'transparent')};
    color: #eee;
    transition: all 0.2s;
    ${(props) =>
        !props.isSelected &&
        `
        &:hover {
            cursor: pointer;
        }
        &:hover, &:focus {
            filter: brightness(70%);
            background: #6a11cba1;
        }
    `};
`;
