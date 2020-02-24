import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as heartbeatReducer } from '../Features/Heartbeat/reducer';
import { reducer as getMetricsReducer } from '../Features/getMetrics/reducer'
import { reducer as getLastKnownMeasurement } from '../Features/GetLastKnownMeasurement/reducer'

export default {
  weather: weatherReducer,
  heartbeat:  heartbeatReducer,
  getMetrics: getMetricsReducer,
  getLastKnownMeasurement: getLastKnownMeasurement
};
