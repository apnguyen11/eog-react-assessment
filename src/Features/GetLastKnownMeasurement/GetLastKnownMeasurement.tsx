import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    maxHeight: 150
    
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


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
  const classes = useStyles();
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
  return (
    <Card className={classes.root}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
           Metric: {metricSelected}
        </Typography>
        <Typography variant="h5" component="h2">
           Value: {value} {unit}
        </Typography>
        </CardContent>
      
    </Card>
  )
  
  //<Chip label={`Metric: ${metricSelected} Value: ${value} ${unit}`} />;
     
};