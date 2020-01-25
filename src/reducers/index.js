import { combineReducers } from 'redux';
import app from './app';
import albums from './albums';
import gallery from './gallery';


const appReducer = combineReducers({
  app, gallery, albums
});

const rootReducer = (state = {}, action) => {
  return appReducer(state, action);
};

export default rootReducer;
