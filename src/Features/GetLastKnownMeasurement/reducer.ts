import { createSlice, PayloadAction } from 'redux-starter-kit';

export type LastKnownMeasurement = {
  metric: string,
  at: number,
  value: number, 
  unit:string
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
    metric: "",
    at: 0,
    value: 0,
    unit: ""
};

const slice = createSlice({
  name: 'lastMeasurement',
  initialState,
  reducers: {
    lastKnownMeasurementDataReceived: (state, action: PayloadAction<LastKnownMeasurement>) => {
      const { metric, at, value, unit } = action.payload;
      state.metric = metric;
      state.at = at;
      state.value = value;
      state.unit = unit;
    },
    lastKnownMeasurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

