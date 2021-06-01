
import {DELETE_CUSTOMER,GET_BANNERS,GET_COUPONS,GET_CUSTOMERS,EDIT_CUSTOMER,GET_OFFERS,
DELETE_BANNER,DELETE_COPEN,DELETE_OFFER

} from '../actions/types';

const initialState = {
    customers:[],
    coupons:[],
    banners:[],
    offers:[]
}

const customer_reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_CUSTOMERS:
            let new_user1 = action.payload; 
            if(action.data){
                new_user1 = [...state.customers,...action.payload]
            }
            return {
                ...state,
                customers:new_user1,
            }
        case GET_COUPONS:
            return {
                ...state,
                coupons:action.payload,
            }
        case GET_BANNERS:
            return {
                ...state,
                banners:action.payload,
            }
        case GET_OFFERS:
            return {
                ...state,
                offers:action.payload,
            }
       
        case DELETE_CUSTOMER:
            let vd1 = state.customers.filter(li => li.id !== action.payload);
            
            return {
                ...state,
                customers:vd1,
            }
        case DELETE_COPEN:
            let cp1 = state.coupons.filter(li => li.id !== action.payload);
            
            return {
                ...state,
                coupons:cp1,
            }
        case DELETE_BANNER:
            let br1 = state.banners.filter(li => li.id !== action.payload);
            
            return {
                ...state,
                banners:br1,
            }
        case DELETE_OFFER:
            let offer1 = state.offers.filter(li => li.id !== action.payload);
            
            return {
                ...state,
                offers:offer1
            }
        case EDIT_CUSTOMER:
            let cm2 = state.customers;
            cm2.map(it =>{
                if(it.id === action.id){
                    it.city_name = action.payload.city_name;
                    it.gender = action.payload.gender;
                    it.mobile_number = action.payload.mobile_number;
                    it.name = action.payload.name;
                    it.data = false
                }
            })
            
            return {
                ...state,
                customers:cm2,
            }
        default:
        return state;
    }
}

export default customer_reducer;