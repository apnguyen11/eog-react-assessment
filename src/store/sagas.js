import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import heartbeatSaga from '../Features/Heartbeat/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(heartbeatSaga);
  
}
