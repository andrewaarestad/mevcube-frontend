import {useTypedSelector} from "../../store/reducers";
import styled from "styled-components";
import {UrlGen} from "../../util/url-gen";

export const MostRecentTx = () => {

  const {mostRecentTransaction} = useTypedSelector(state => state.history);
  const {flags: {isLoadingInitialCubeContractState}} = useTypedSelector(state => state.cube);

  if (isLoadingInitialCubeContractState) {
    return null;
  }

  return (
    <>
      {mostRecentTransaction ? (
        <p>
          Last Solved: &nbsp;
          <Link href={UrlGen.getBlockExplorerTxUrl(mostRecentTransaction.transactionHash)} target="_blank" rel="noopener noreferrer">
            {mostRecentTransaction.solution._solution} by {mostRecentTransaction.solution._solver.slice(0,6)} at block {mostRecentTransaction.blockNumber}
          </Link>

        </p>
      ) : (
        <>
          {/*You're the first one here! Be the first to submit a solution.*/}
        </>
      )}

    </>
  )
}


const Link = styled.a`
  //display: flex;
  //align-items: center;
  //padding: 5px 10px;
  //background: papayawhip;
  //color: palevioletred;
  display: inline-block;
`;
