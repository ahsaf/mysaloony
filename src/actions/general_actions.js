import { Get_data_by_id } from './services';
import { GET_HOME } from './types';


export const Get_home = (post,cb)=> dispatch =>{
        Get_data_by_id('General','webhomescreen',(res)=>{
            dispatch({
                type:GET_HOME,
                payload:res
            })
        })
               
          
}