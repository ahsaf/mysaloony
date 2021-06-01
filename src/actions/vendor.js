
import { Get_date } from 'mycomponent/general';
import { Create, Delete_Doc, Get_data_by_id, Get_filter_data_obj,Update,Login_email_password,Create_with_id, Inc_Count,
Delete_user


} from './services';
import { GET_VENDORS,DELETE_VENDOR,GET_BOOKINGS,DELETE_BOOKING, GET_NEW_BOOKING,GEN_REPORT ,GET_ALL_VENDORS} from './types';


export const Get_Vendors = (post,cb)=> dispatch =>{
    let filter = {
        collection:'Saloons',
        limit:post.limit?post.limit:100,
        data:post.data,
         orderBy:['Saloon_name']
    }
    if(post.searched){
        filter.filter1=['Saloon_name','>=',post.search_text]
    }
        Get_filter_data_obj(filter,(res,res_all)=>{
          
            dispatch({
                type:GET_VENDORS,
                payload:res,
                data:post.data
            })
            cb(res_all.size)
        })
               
          
}
export const Gen_report = (post,cb)=> dispatch =>{
    let filter = {
        collection:'Appointments',
        limit:post.limit?post.limit:500,
        filter1:['booking_time','>=',new Date(post.from)],
        filter2:['booking_time','<=',new Date(post.to)],
          orderBy:['booking_time']
    }
    console.log('filter',filter)
    if(post.vendor !== 'All'){
        filter.filter3 = ['saloon_id', '==', post.vendor] 
    }
   
        Get_filter_data_obj(filter,(res,res_all)=>{
           console.log('report:',res)
            dispatch({
                type:GEN_REPORT,
                payload:res
            })
            cb(res_all.size)
        })
               
          
}

export const Get_Booking = (post,cb)=> dispatch =>{
    let filter = {
        collection:'Appointments',
        limit:post.limit?post.limit:100,
        filter1:['booking_time','<=',new Date(Get_date(new Date(),'YYYY-MM-DD'))],
        orderBy:['booking_time','desc'],
        data:post.data,
    }
    if(post.searched){
        filter.filter1 = ['saloon_name','>=',post.search_text];
         delete filter.orderBy; 
         delete filter.data;
    }

        Get_filter_data_obj(filter,(res,res_all)=>{
            dispatch({
                type:GET_BOOKINGS,
                payload:res,
                data:filter.data,
            })
            cb(res_all.size)
        
        })  
        
}
export const Get_New_Booking = (post,cb)=> dispatch =>{
    let filter = {
        collection:'Appointments',
        limit:post.limit?post.limit:100,
        filter1:['booking_time','>=',new Date(Get_date(new Date(),'YYYY-MM-DD'))],
         orderBy:['booking_time','desc'],
         data:post.data
    }
    if(post.searched){
      
        filter.filter1 = ['saloon_name','>=',post.search_text]
        delete filter.orderBy 
        delete filter.data;
        // filter.orderBy = ['saloon_name']
        // filter.orderBy2 = ['booking_time','desc']
    }

        Get_filter_data_obj(filter,(res,res_all)=>{
            dispatch({
                type:GET_NEW_BOOKING,
                payload:res,
                data:filter.data
            })
            cb(res_all.size)
        
        })  
        
}


export const Delete_Vendor = (post)=> dispatch =>{


    Delete_user(post,(res)=>{
        console.log('deleted:',res)
    })

        Delete_Doc('Saloons',post.id,(res)=>{
        });

        
        Inc_Count('General','webhomescreen','saloon',-1,()=>{});
     
        dispatch({
            type:DELETE_VENDOR,
            payload:post.id
        })     
}

export const Delete_Booking = (post)=> dispatch =>{

        Delete_Doc('Appointments',post.id,(res)=>{
        });
        // Inc_Count('General','webhomescreen','saloon',-1,()=>{});
     
        dispatch({
            type:DELETE_BOOKING,
            payload:post.id
        })     
}


export const Add_Vendor = (post,id,cb)=> dispatch =>{
    if(id){
        Update('Saloons',id,post,()=>{
            dispatch(Get_Vendors({},()=>{}));
            cb(true);
        })
    }else{
        Login_email_password({
            email:post.email,
            password:post.password
        },(email_res)=>{
            if(email_res){
                 Get_data_by_id('General','Saloon_id',(rs)=>{
                Create_with_id('Saloons',email_res.user.uid,{...post,Saloon_id:`VE${rs.Saloon_id + 1}`,
                saloon_reg_id:email_res.user.uid
            },(res)=>{
                    dispatch(Get_Vendors({},()=>{}));
                    Update('General','Saloon_id',{Saloon_id:rs.Saloon_id + 1},()=>{});
                    Inc_Count('General','webhomescreen','saloon',1,()=>{});
                    cb(true);
                })   
        
                
            })
            }else{
                 cb(false)
                // Get_data_by_id('General','Saloon_id',(rs)=>{
                //     Create('Saloons',{...post,Saloon_id:`VE${rs.Saloon_id + 1}`,
                //     // saloon_reg_id:email_res.user.uid
                // },(res)=>{
                //         dispatch(Get_Vendors({},()=>{}));
                //         Update('General','Saloon_id',{Saloon_id:rs.Saloon_id + 1},()=>{});
                //         Inc_Count('General','webhomescreen','saloon',1,()=>{});
                //         cb(true);
                //     })   
                // })
            }
         
        })
    }
  
 
         
}


export const Get_All_vendors = (post,cb)=> dispatch =>{
    let filter = {
        collection:'Saloons',
        limit:500,
        orderBy:['Saloon_name']
    }
        Get_filter_data_obj(filter,(res,res_all)=>{
          
            dispatch({
                type:GET_ALL_VENDORS,
                payload:res
            })
            cb(res_all.size)
        })
               
          
}