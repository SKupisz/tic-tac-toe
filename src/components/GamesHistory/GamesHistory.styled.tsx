import styled from 'styled-components';

export const GamesHistoryWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 30px 5px;
    width: calc(100vw - 10px);

    @media screen and (min-width: 375px) {
        width: 300px;
        height: 300px;
    }

    @media screen and (min-width: 425px) {
        width: 350px;
        height: 350px;
    }
`;

export const GamesHistoryGame = styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 40px);
    padding: 20px 20px;
    background: #220a54a0;
    border-radius: 10px;
    font-size: 1.4em;
`;
