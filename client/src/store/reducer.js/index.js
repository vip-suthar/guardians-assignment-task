import { combineReducers } from 'redux';

import searchDataReducer from './searchDataReducer';
import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
    searchData: searchDataReducer,
    userData: userDataReducer
});

export default rootReducer;