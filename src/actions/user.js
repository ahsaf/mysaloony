import { Create, Delete_Doc, Delete_Image, Get_data_by_id, Get_filter_data_obj, Update,Inc_Count } from './services';
import { GET_CUSTOMERS,DELETE_CUSTOMER,GET_COUPONS,GET_BANNERS,EDIT_CUSTOMER ,DELETE_BANNER,DELETE_COPEN,GET_OFFERS,

    DELETE_OFFER
} from './types';


export const Get_Customers = (post,cb)=> dispatch =>{
    let filter = {
        collection:'UserAccount',
        limit:post.limit?post.limit:100,
        orderBy:['name'],
        data:post.data,
    }
    if(post.searched){
        filter.filter1=['name','>=',post.search_text]
    }
        Get_filter_data_obj(filter,(res,res_all)=>{
            dispatch({
                type:GET_CUSTOMERS,
                payload:res,
                data:post.data
            })
            cb(res_all.size)
        })
               
          
}


export const Delete_Customer = (post)=> dispatch =>{
        Delete_Doc('UserAccount',post.id,(res)=>{
        })
        Inc_Count('General','webhomescreen','customer',-1,()=>{});
        dispatch({
            type:DELETE_CUSTOMER,
            payload:post.id
        })     
}


export const Get_Banners = (cb)=> dispatch =>{
    let filter = {
        collection:'Banners',
        limit:100,
        orderBy:['created_at','desc']
    }
    Get_filter_data_obj(filter,(res,res_all)=>{
        dispatch({
            type:GET_BANNERS,
            payload:res
        })
        cb(res_all.size)
    })    
}

export const Get_Coupons = (cb)=> dispatch =>{
    let filter = {
        collection:'Coupons',
        limit:100,
        orderBy:['created_at','desc']
    }
    Get_filter_data_obj(filter,(res,res_all)=>{
        dispatch({
            type:GET_COUPONS,
            payload:res
        })
        cb(res_all.size)
    })    
}


export const Edit_Customer = (post,id)=> dispatch =>{
    Update('UserAccount',id,post,()=>{
    
    })
    dispatch({
        type:EDIT_CUSTOMER,
        payload:post,
        id
    }) 
  
      
}

export const Add_Banner = (post,id,cb)=> dispatch =>{
    if(id){
        Update('Banners',id,post,()=>{
            dispatch(Get_Banners(()=>{}));
            cb(true);
        })
    }else{
                Create('Banners',post,
                    (res)=>{
                    dispatch(Get_Banners(()=>{}));
                    cb(true);
         
        })
    }
  
 
         
}
export const Add_Coupen = (post,id,cb)=> dispatch =>{
    if(id){
        Update('Coupons',id,post,()=>{
            dispatch(Get_Coupons(()=>{}));
            cb(true);
        })
    }else{
                Create('Coupons',post,
                    (res)=>{
                    dispatch(Get_Coupons(()=>{}));
                    cb(true);
         
        })
    }
  
 
         
}

export const Delete_Banner = (post)=> dispatch =>{

    Delete_Doc('Banners',post.id,(res)=>{
    });
    if(post.image_ref){
        Delete_Image(post.image_ref,()=>{})
    }
   
    dispatch({
        type:DELETE_BANNER,
        payload:post.id
    })     
}

export const Delete_copen = (post)=> dispatch =>{

    Delete_Doc('Coupons',post.id,(res)=>{
    });
    dispatch({
        type:DELETE_COPEN,
        payload:post.id
    })     
}


export const Get_offers = (cb)=> dispatch =>{
    let filter = {
        collection:'Offers',
        limit:100,
      
    }
    Get_filter_data_obj(filter,(res,res_all)=>{
        dispatch({
            type:GET_OFFERS,
            payload:res
        })
        cb(res_all.size)
    })    
}

export const Delete_Offer = (post)=> dispatch =>{

    Delete_Doc('Offers',post.id,(res)=>{
    });
    if(post.image_ref){
        Delete_Image(post.image_ref,()=>{})
    }
   
    dispatch({
        type:DELETE_OFFER,
        payload:post.id
    })     
}


export const Add_Offer = (post,id,cb)=> dispatch =>{
                Create('Offers',post,
                    (res)=>{
                    dispatch(Get_offers(()=>{}));
                    cb(true);
         
        })     
}