import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;

const Box =styled.div`
    background-color: #7A4495;
    width: 300px;
    height: 100px;
    font-size: 5rem;
    text-align: center;
    padding: 5rem;
    border-radius: 2rem;
`;

const LogoBox = () => {

    return(
        <Wrapper>
            <Box>Logo</Box>
        </Wrapper>
    );

};

export default LogoBox;