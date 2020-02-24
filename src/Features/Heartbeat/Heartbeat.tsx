import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';


const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query {
    heartBeat
}
`;

const getHeartbeat = (state: IState) => {
  const { heartbeat} = state.heartbeat
  return { heartbeat }
}      

export default () => {
  return (
    <Provider value={client}>
      <Heartbeat />
    </Provider>
  );
};

const Heartbeat = () => {

  const dispatch = useDispatch();
  const {heartbeat} = useSelector(getHeartbeat);

  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.heartbeatApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { heartBeat } = data;
    // console.log(data, 'data888')
    dispatch(actions.heartbeatDataReceived(heartBeat));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <Chip label={`heartBeat is ${data.heartBeat}`} />;
};
