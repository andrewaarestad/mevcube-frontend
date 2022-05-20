import {useTypedSelector} from "../../../store/reducers";
import './CubeLoading.scss'

export const CubeLoading = () => {

  const {errors} = useTypedSelector(state => state.cube);

  return errors.initialLoad ? (
      <div className={'cube-loading-error'}>
        <p>Looks like we are having technical difficulties.  Please try again later.
          <br/><br/>
          {errors.initialLoad.error.message}
        </p>
      </div>
    ) : (
      <div className={'cube-loading-progress'}>
        <p>Loading...</p>
      </div>
    )
}

