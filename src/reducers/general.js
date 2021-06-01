
import {GET_HOME} from '../actions/types';


const initialState = {
    home:{}
}

const general_reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_HOME:
            return {
                ...state,
                home:action.payload,
            }
        default:
        return state;
    }
}

export default general_reducer;