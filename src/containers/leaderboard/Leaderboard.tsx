import styled from "styled-components";


export const Leaderboard = () => {

  // console.log('About.render');

  return (
    <StyledAbout>
      <StyledText>
        <StyledAbout>
          <h1>Leaderboard</h1>
        </StyledAbout>
        <br/>

        <StyledAbout>
          <p>Coming Soon</p>
        </StyledAbout>


      </StyledText>
    </StyledAbout>
  )
}

const StyledAbout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 12px;
  //background: green;
`
const StyledText = styled.div`
  font-size: 14px;
  width: 40%;
  //background: blue  ;
  column-count: 1 ;
  column-rule-width: 5px;
  column-rule-style: dotted;
  column-rule-color: rebeccapurple;
`
