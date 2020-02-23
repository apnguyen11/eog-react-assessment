import { createSlice, PayloadAction } from 'redux-starter-kit';

export type getMetricValues = {
  waterTemp: string,
  casingPressure: string,
  injValveOpen: string,
  flareTemp: string,
  oilTemp: string,
  tubingPressure: string
  };

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  waterTemp: "",
  casingPressure: "",
  injValveOpen: "",
  flareTemp: "",
  oilTemp: "",
  tubingPressure: ""
};

const slice = createSlice({
  name: 'getMetrics',
  initialState,
  reducers: {
    getMetricsDataReceived: (state, action: PayloadAction<getMetricValues>) => {
      const {waterTemp, casingPressure, injValveOpen, flareTemp, oilTemp, tubingPressure}  = action.payload;
      state.waterTemp = waterTemp;
      state.casingPressure = casingPressure;
      state.injValveOpen = injValveOpen;
      state.flareTemp = flareTemp;
      state.oilTemp = oilTemp;
      state.tubingPressure = tubingPressure
      
    },
    getMetricsErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
