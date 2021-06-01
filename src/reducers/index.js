import { combineReducers } from 'redux';

import general_reducer from './general';
import vendors_reducer from './vendors';
import user_reducer from './user';


export default combineReducers({
    general:general_reducer,
    vendor:vendors_reducer, 
    user:user_reducer, 
 
})