import styled from "styled-components";

export const StyledAccountButtonWrapper = styled.div`


  position: absolute;
  left: 1px;
  top: 30px;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;

  //font-family: 'Open Sans', sans-serif;
  user-select: none;
  
  
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`
