import styled from 'styled-components';

export const RatingContainer = styled.div`
    display: flex;
    
    img {
        margin-left: 5px;
        margin-right: 5px;

        width: 20px;
        height: 20px;

        &:first-child {
            margin-left: 0;
        }
    }
`;