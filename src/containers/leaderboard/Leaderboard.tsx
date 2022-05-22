import styled from "styled-components";
import {useWallet} from "use-wallet";
import {useTypedSelector} from "../../store/reducers";
import React from "react";


export const Leaderboard = () => {

  // console.log('About.render');

  const {ethereum} = useWallet();

  // const [isLoading, setIsLoading] = useState(true);

  const {recentMoves} = useTypedSelector(state => state.history);

  // useEffect(() => {
  //
  //
  //
  //
  //
  // }, [dispatch, ethereum])

  return (
    <StyledAbout>
      <StyledText>



        <div className={'app-title'}>
          <p>recent</p>
          &nbsp;
          <p>activity</p>
        </div>

        <br/>


        <StyledAbout>
          {!!ethereum ? (
            <>
              {/*{isLoading ? (*/}
              {/*  <>*/}
              {/*    <p>Loading...</p>*/}
              {/*  </>*/}
              {/*) : (*/}
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Block</th>
                        <th>Solution</th>
                        <th>Solver</th>
                      </tr>
                    </thead>
                    <tbody>

                      {recentMoves.map(move => (
                        <tr key={move.transactionHash}>
                          <td>{move.blockNumber}</td>
                          <td>{move.solution._solution}</td>
                          <td>{move.solution._solver}</td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </>
              {/*)}*/}
            </>
          ) : (
            <>
              <p>Connect wallet to view recent solutions</p>
            </>
          )}

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
