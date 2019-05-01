import {combineReducers} from 'redux';

// import reducers
import authReducer from './auth';
import aboutReducer from './about';
import homeReducer from './home';

const rootReducer = combineReducers({  
  auth: authReducer,
  about: aboutReducer,
  home: homeReducer
})

export default rootReducer;