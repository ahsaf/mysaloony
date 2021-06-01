
import {DELETE_BOOKING, DELETE_VENDOR, GET_BOOKINGS, GET_VENDORS,GET_NEW_BOOKING,GEN_REPORT, GET_ALL_VENDORS} from '../actions/types';


const initialState = {
    vendors:[],
    bookings:[],
    new_booking:[],
    report:[],
    all_vendors:[]
    

}

const vendor_reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_VENDORS:
            let old_vendors1 = action.payload; 
            if(action.data){
                old_vendors1 = [...state.vendors,...action.payload]
            }
            return {
                ...state,
                vendors:old_vendors1
            }
        case GET_ALL_VENDORS:
            return {
                ...state,
                all_vendors:action.payload,
            }
        case GET_BOOKINGS:
            let new_bokin1 = action.payload; 
            if(action.data){
                new_bokin1 = [...state.bookings,...action.payload]
            }
            return {
                ...state,
                bookings:new_bokin1,
            }
        case GEN_REPORT:
            return {
                ...state,
                report:action.payload,
            }
        case GET_NEW_BOOKING:
            let new_bokin2 = action.payload; 
            if(action.data){
                new_bokin2 = [...state.new_booking,...action.payload]
            }
            return {
                ...state,
                new_booking:new_bokin2,
            }
        case DELETE_VENDOR:
            let vd1 = state.vendors;
            
            return {
                ...state,
                vendors:vd1.filter(li => li.id !== action.payload)
            }
        case DELETE_BOOKING:
            let bk1 = state.bookings;
            
            return {
                ...state,
                bookings:bk1.filter(li => li.id !== action.payload)
            }


        default:
        return state;
    }
}

export default vendor_reducer;