import styled from "styled-components";


export const About = () => {

  // console.log('About.render');

  return (
    <StyledAbout>
      <StyledText>
        <StyledAbout>
          <h1>mevcube</h1>
        </StyledAbout>
        <br/>
        <p>The object is simple: solve the cube if it needs solving.
          Or, scramble it if it's already solved!</p>

        <p>mevcube 1.0 is a single puzzle cube which can be solved by anyone.
          The current state of the puzzle is stored on-chain and visualized on this site.
          Players may perform moves on the cube contract to solve it.
          A successful solution will get you on the leaderboard.
          Use this website to explore the cube and prepare your solution, but if you really want to compete you may want to build a bot. </p>

        <p>As an incentive to keep the game moving, players must submit a fee when solving the puzzle.
          This fee is used to create a bounty that searchers can claim to scramble the puzzle for the next player.</p>

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
