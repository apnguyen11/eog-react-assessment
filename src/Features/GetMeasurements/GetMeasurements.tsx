import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';


const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
        metric
        at
        value
        unit
  }
}
`;

const getMeasurement = (state: IState) => {
  const { metric, at, value, unit } = state.getMeasurements;
  console.log(state, "this is the state for getMeasurements")
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
      <GetMeasurements />
    </Provider>
  );
};


const GetMeasurements = () => {
    let epochTimeLast30min = Date.now()
    const input = {
        metricName: "waterTemp",
        after: 1582656948000
   };
  
  const dispatch = useDispatch();

//   const metricName = "waterTemp"
  const { metric, at, value, unit } = useSelector(getMeasurement);
  const [result] = useQuery({
    query,
    variables: {
        input
    },
    requestPolicy: 'network-only'
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.getMeasurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMeasurements } = data;
   
    dispatch(actions.getMeasurementsDataReceived(getMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  console.log(data, 'watertemp data')
  console.log(Date.now(), "current epoch time")

  return <Chip label={`Metric: ${metric} || Time: ${new Date(at).toLocaleTimeString()} || Value: ${value} || Unit: ${unit}`} />;
     
};