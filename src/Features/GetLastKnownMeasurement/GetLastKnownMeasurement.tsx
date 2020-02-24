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
query($metricName: string!) {
  getLastKnownMeasurement(metricName: "waterTemp") {
        metric
        at
        value
        unit
  }
}
`;

const getMeasurement = (state: IState) => {
  const { metric, at, value, unit } = state.getLastKnownMeasurement;
  return {
    metric,
    at,
    value,
    unit
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
  const { metric, at, value, unit } = useSelector(getMeasurement);

  const [result] = useQuery({
    query
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
  console.log(data, 'watertemp data')
  return <Chip label={`Data for WaterTemp || Metric: ${metric} EpochTime: ${at} Value: ${value} Unit: ${unit}`} />;
};