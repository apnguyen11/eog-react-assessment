import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';



const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
        metric
        at
        value
        unit
  }
}
`;

const getMeasurement = (state: IState) => {
  const { metric, at, value, unit } = state.getLastKnownMeasurement;
//   console.log(state, 'get last known measurements state')
  const metricSelected = state.MetricReducer.metric
    
  return {
    metric,
    at,
    value,
    unit,
    metricSelected
  };
};

export default () => {
  return (
    <Provider value={client}>
      <GetLastKnownMeasurement />
    </Provider>
  );
};


const GetLastKnownMeasurement = () => {
 
  const dispatch = useDispatch();
  const { metric, value, unit, metricSelected } = useSelector(getMeasurement);
  const metricName = `${metricSelected}`
  
  const [result] = useQuery({
    query,
    variables: {
        metricName
    },
    pollInterval: 1300,
    requestPolicy: 'network-only'
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.lastKnownMeasurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
   
    dispatch(actions.lastKnownMeasurementDataReceived(getLastKnownMeasurement));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
//   console.log(data, 'last known measurement data')
  return <Chip label={`Metric: ${metricSelected} Value: ${value} ${unit}`} />;
     
};