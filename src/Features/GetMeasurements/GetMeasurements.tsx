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
const metricSelected = state.MetricReducer.metric
  return {
    metricSelected
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
    const { metricSelected } = useSelector(getMeasurement);
    const input = {
        metricName: `${metricSelected}`,
        after: epochTimeLast30min
    };
  
  const dispatch = useDispatch();
  
  const [result] = useQuery({
    query,
    pollInterval: 1300,
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
  return (
 
        <LineChart
        width={1300}
        height={520}
        data={data.getMeasurements}
        margin={{
            top: 10, right: 30, left: 50, bottom: 5,
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
        <YAxis name="Metric" />
        <Tooltip labelFormatter={t => new Date(t).toLocaleString()} />
        <Legend />
        <Line type="monotone" name={metricSelected} dataKey="value" stroke="#8884d8"  />
        </LineChart>
        
  
  ); 
};