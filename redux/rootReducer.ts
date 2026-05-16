import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter.slice';

// combineReducers used to combine multiple reducers into a single root reducer.
// In this case, we have only one reducer (counterReducer),
// but we can easily add more reducers in the future if needed.
const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;