import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as heartbeatReducer } from '../Features/Heartbeat/reducer';
import { combineReducers } from 'redux'

export default {
  weather: weatherReducer,
  heartbeat:  heartbeatReducer 
};
