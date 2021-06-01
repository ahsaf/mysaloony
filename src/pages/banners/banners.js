import React,{Component} from "react";
import Table from "../../mycomponent/table";
import { ActionBtn,Add_btn ,Ask_Confirm} from 'mycomponent/general'
import { connect } from "react-redux";
import {  Get_Banners,Get_Coupons,Delete_Banner,Delete_copen  } from 'actions/user';

import AddBanner from './addbanner';
import AddCoupen from './addcoupen';




class Vendosscren extends Component {
   componentDidMount(){
    this.props.Get_Banners(()=>{});
    this.props.Get_Coupons(()=>{});
   }
 
   onDeleteBanner = (item)=>{ 
    this.props.Delete_Banner(item);
   }
   onDeleteCoupen = (item) =>{
    this.props.Delete_copen({id:item.id})
   }
  render(){
    const tabldata = [
        {id:1,v_id:'BA0001',v_name:'Hero 1',img:'image 1'},
      
    ]
    const tabldata2 = [
        {id:1,v_id:'CP001',v_name:'FIRST50',desc:'50% off on first service'},
      
    ]
    const p = this.props;




    return (
        <div>
            {/* <h5>Banners</h5> */}
            <div style={{display:'flex',justifyContent:'flex-end'}}>
          
          <Add_btn 
          title='Add Banner'
           onClick={() => this.Show_add_banner()}
          />
          </div>
            <Table
                tableHeaderColor="primary"
                tableHead={["Sl.No", "Banner Caption", "Image","Action"]}
                hide_header
                FR_DOC
                data={p.user.banners}
                keys = {["slno", "caption", "image",'action']}
                custome={{
                  "slno":(it,i) => i+1,
                  'action':(item,i)=>(<div style={{display:'flex'}}>
                    
                      <ActionBtn name='Edit'
                            onClick={()=> this.Show_add_banner(item)}
                      />
                      <ActionBtn name='Delete' 
                        onClick={()=> this.show_delete_banner(item)}
                      />
                  </div>),
                  'image':(it)=><img 
                    src={it.image}
                  style={{
                      background:'#aaa',height:100,width:300,alignItems:'center',justifyContent:'center',display:'flex'
                  }} />
                 
              }}
            />
    
    
           
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h5>Coupon Codes</h5>
          <Add_btn 
          title='Add Coupon'
           onClick={() => this.Show_add_copen()}
          />
          </div>
                 <Table
                            tableHeaderColor="primary"
                            tableHead={["Sl.No", "Coupon Code", "Description","Action"]}
                            hide_header
                            FR_DOC
                            data={p.user.coupons}
                            keys = {["slno", "code", "description",'action']}
                            custome={{
                              "slno":(it,i) => i+1,
                                'action':(item,i)=>(<div style={{display:'flex'}}>
                                
                                    <ActionBtn name='Edit' 
                                     onClick={()=> this.Show_add_copen(item)}
                                    />
                                    <ActionBtn name='Delete' 
                                        onClick={() => this.show_delete_copuen(item)}
                                    />
                                </div>)
                             
                               
                            }}   
    />
    <AddBanner 

show={call => this.Show_add_banner = call}

/>
    <AddCoupen 

show={call => this.Show_add_copen = call}

/>
    <Ask_Confirm 
    show={call => this.show_delete_banner = call}
    onDelete = {this.onDeleteBanner}
    label='Saloon_id'
    />
    <Ask_Confirm 
    show={call => this.show_delete_copuen = call}
    onDelete = {this.onDeleteCoupen}
    label='Saloon_id'
    />
        </div>
      );
  }

}
const mapStateToProps =(state) =>{
    return{
     general:state.general,
     vendor:state.vendor,
     user:state.user,
    }
  }
export default connect(mapStateToProps,{Get_Banners,Get_Coupons,Delete_copen,Delete_Banner})(Vendosscren)