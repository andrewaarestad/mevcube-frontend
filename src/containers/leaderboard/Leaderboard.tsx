import {useTypedSelector} from "../../store/reducers";
import React from "react";
import "./Leaderboard.scss"

export const Leaderboard = () => {

  // console.log('About.render');

  // const {ethereum} = useWallet();

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
    <>
      <div className={'leaderboard-title'}>
        <p>recent activity</p>
      </div>

      <div className={'leaderboard-container'}>
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
      </div>


    </>
  )
}
