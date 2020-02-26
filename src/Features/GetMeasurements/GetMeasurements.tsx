import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment'
import { IState } from '../../store';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
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

let epochTimeLast30min = Date.now() - 1800000

const GetMeasurements = () => {
   
    const input = {
        metricName: "waterTemp",
        after: epochTimeLast30min
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
  console.log(data.getMeasurements[0], 'watertemp data')
  console.log(new Date(at).toLocaleTimeString(), "local time")

  //return <Chip label={`Metric: ${metric} || Time: ${new Date(at).toLocaleTimeString()} || Value: ${value} || Unit: ${unit}`} />;
  return (
    
        <LineChart
        width={1200}
        height={600}
        data={data.getMeasurements}
        margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="9 9" />
        <XAxis 
            dataKey="at" 
            domain = {['auto', 'auto']}
            name = 'Time'
            tickFormatter = {(unixTime) => moment(unixTime).format('LT')}
            type = 'number'
        />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8"  />
        </LineChart>
  
  ); 
};