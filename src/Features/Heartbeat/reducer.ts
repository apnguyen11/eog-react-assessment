import { createSlice, PayloadAction } from 'redux-starter-kit';

export type heartbeatNum = {
    heartbeat: number;
  };

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  heartbeat: 0
};

const slice = createSlice({
  name: 'heartbeat',
  initialState,
  reducers: {
    heartbeatDataReceived: (state, action: PayloadAction<heartbeatNum>) => {
      const {heartbeat}  = action.payload;
      state.heartbeat = heartbeat;
      
    },
    heartbeatApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
