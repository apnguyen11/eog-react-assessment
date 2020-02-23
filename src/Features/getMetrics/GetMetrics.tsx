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
    getMetrics
}
`;

const getGetMetrics = (state: IState) => {
  const { waterTemp, casingPressure, injValveOpen, flareTemp, oilTemp, tubingPressure } = state.getMetrics
  return { 
      waterTemp, 
      casingPressure, 
      injValveOpen, 
      flareTemp, 
      oilTemp, 
      tubingPressure 
    };
};

export default () => {
  return (
    <Provider value={client}>
      <GetMetrics />
    </Provider>
  );
};

const GetMetrics = () => {

  const dispatch = useDispatch();
  const {   waterTemp, 
    casingPressure, 
    injValveOpen, 
    flareTemp, 
    oilTemp, 
    tubingPressure } = useSelector(getGetMetrics);

  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.getMetricsErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    console.log(data, 'data888')
    dispatch(actions.getMetricsDataReceived(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <Chip label={`Metrics are ${data.getMetrics.map((metric: any) => " " + metric)}`} />;
};
