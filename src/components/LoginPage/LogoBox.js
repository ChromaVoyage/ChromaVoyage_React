import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const Box = styled.div`
//background-color: #fff;
width: 300px;
height: 100px;
font-size: 5rem;
text-align: center;
padding: 4rem;
border-radius: 2rem;
margin-left: 50px;
display: flex;
justify-content: center;
align-items: center;
margin-top: 120px;
margin-bottom: 40px;
color: #7A4495;
font-weight: bold;
//box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);

`;

const LogoImage = styled.img`
  width: 260px;
  height: 130px;
  margin-right: 25px;
`;

const LogoBox = () => {
  return (
    <Wrapper>
      <Box>
        <LogoImage src="/location2.png" alt="Logo" />
        Chroma Voyage
      </Box>
    </Wrapper>
  );
};

export default LogoBox;