
import { createSlice, PayloadAction } from 'redux-starter-kit';

export type getDropDown = {
  metric: string
};


const initialState = {
    metric: ""
};

const slice = createSlice({
  name: 'getDropDown',
  initialState,
  reducers: {
    lastKnownMeasurementDataReceived: (state, action: PayloadAction<getDropDown>) => {
      const { metric} = action.payload;
      state.metric = metric;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
