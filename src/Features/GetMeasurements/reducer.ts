import { createSlice, PayloadAction } from 'redux-starter-kit';

export type getMeasurement = {
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
  name: 'getMeasurements',
  initialState,
  reducers: {
    getMeasurementsDataReceived: (state, action: PayloadAction<getMeasurement>) => {
      const { metric, at, value, unit } = action.payload;
      state.metric = metric;
      state.at = at;
      state.value = value;
      state.unit = unit;
    },
    getMeasurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

