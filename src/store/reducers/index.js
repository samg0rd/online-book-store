import {combineReducers} from 'redux';

// import reducers
import authReducer from './auth';
import aboutReducer from './about';
import homeReducer from './home';
import domReducer from './dom';
import userReducer from './user';

const rootReducer = combineReducers({  
  auth: authReducer,
  about: aboutReducer,
  home: homeReducer,
  dom: domReducer,
  user: userReducer
})

export default rootReducer;