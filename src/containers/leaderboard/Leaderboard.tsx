import styled from "styled-components";
import {useEffect, useState} from "react";
import {useWallet} from "use-wallet";
import {MevCube} from "../../contracts/mev-cube";
import {useAppDispatch} from "../../store";
import {useTypedSelector} from "../../store/reducers";
import {historySlice} from "../../store/slices/history";


export const Leaderboard = () => {

  // console.log('About.render');

  const {ethereum} = useWallet();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const {recentMoves} = useTypedSelector(state => state.history);

  useEffect(() => {

    const refreshPastEvents = async() => {
      if (!ethereum) {
        console.log('warning, cant get past events without wallet provider');
        return [];
      }
      const web3Contract = MevCube.getContract(ethereum)
      return web3Contract.getPastEvents('Solved');
    }

    refreshPastEvents()
    .then(pastEvents => {
      console.log('pastEvents: ', pastEvents);
      setIsLoading(false);

      dispatch(historySlice.actions.setRecentMoves(pastEvents.map(event => ({
        blockHash: event.blockHash,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        solution: {
          _solver: event.returnValues._solver,
          _solution: event.returnValues._solution
        }
      }))));
    })


  }, [dispatch, ethereum])

  return (
    <StyledAbout>
      <StyledText>
        <StyledAbout>
          <h1>Recent Activity</h1>
        </StyledAbout>
        <br/>


        <StyledAbout>
          {!!ethereum ? (
            <>
              {isLoading ? (
                <>
                  <p>Loading...</p>
                </>
              ) : (
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
              )}
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
