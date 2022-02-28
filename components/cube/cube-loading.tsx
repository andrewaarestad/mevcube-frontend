// @ts-ignore
import styles from './CubeLoading.module.scss'
import {useTypedSelector} from "../../store/reducers";

export const CubeLoading: React.FC = () => {

  const {errors} = useTypedSelector(state => state.cube);

  // console.log('errors: ', errors.initialLoad);

  return (
    <div >
      {errors.initialLoad ? (
        <div>
          <div className={styles.errorDetails}>
            <p>Looks like we are having technical difficulties.  Please try again later.
            <br/><br/>
              {errors.initialLoad.error.message}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}
