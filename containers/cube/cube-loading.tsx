// @ts-ignore
import styles from './CubeLoading.module.scss'
import {useTypedSelector} from "../../store/reducers";
import styled from "styled-components";

export const CubeLoading: React.FC = () => {

  const {errors} = useTypedSelector(state => state.cube);

  // console.log('errors: ', errors.initialLoad);

  return (
    <div >
      {errors.initialLoad ? (
        <div>
          <StyledErrorDetails>
            <p>Looks like we are having technical difficulties.  Please try again later.
              <br/><br/>
              {errors.initialLoad.error.message}
            </p>
          </StyledErrorDetails>
        </div>
      ) : (
        <StyledCubeLoading>
          <p>Loading...</p>
        </StyledCubeLoading>
      )}
    </div>
  )
}

const StyledCubeLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  font-size: 26px;  
`

const StyledErrorDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 12px;
`
