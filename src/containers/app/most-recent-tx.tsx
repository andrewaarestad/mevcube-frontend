import {useTypedSelector} from "../../store/reducers";

export const MostRecentTx = () => {

  const {mostRecentTransaction} = useTypedSelector(state => state.history);

  return (
    <>
      {mostRecentTransaction ? (
        <>
          Most recent tx: {mostRecentTransaction.transactionHash} - {mostRecentTransaction.solution._solution} by {mostRecentTransaction.solution._solver}
        </>
      ) : (
        <>
          You're the first one here! Be the first to submit a solution.
        </>
      )}

    </>
  )
}
