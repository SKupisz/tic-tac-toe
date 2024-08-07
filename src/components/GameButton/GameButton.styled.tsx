import styled from 'styled-components';

export const GameButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 0px;
`;

export const GameButton = styled.button<{ backgroundColor?: string }>`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    background: ${(props) =>
        props.backgroundColor ? props.backgroundColor : 'linear-gradient(135deg, #6a11cb 0%, #123a7e 100%)'};
    cursor: pointer;
    color: #eee;

    &:hover {
        filter: brightness(90%);
        box-shadow: 0px 4px 15px ${(props) => (props.backgroundColor ? `${props.backgroundColor}4d` : '#6a11cb4d')};
    }
`;
