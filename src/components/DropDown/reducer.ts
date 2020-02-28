import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metric = {
  metric: string
};


const initialState = {
    metric: ""
};

const slice = createSlice({
  name: 'getMetric',
  initialState,
  reducers: {
    GetTheMetric: (state, action: PayloadAction<Metric>) => {
        const metric  = action.payload;
        // console.log(action, 'this is action!!')
      state.metric = `${metric}` 
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;

