import React,{Component} from "react";
import Table from "../../mycomponent/table";
import { ActionBtn,Add_btn ,Ask_Confirm} from 'mycomponent/general'
import { connect } from "react-redux";
import {  Get_offers,Delete_Offer } from 'actions/user';

import AddBanner from './addoffer';





class Vendosscren extends Component {
   componentDidMount(){
    this.props.Get_offers(()=>{});

   }
 
   onDeleteBanner = (item)=>{ 
    this.props.Delete_Offer(item);
   }

  render(){
 
    const p = this.props;




    return (
        <div>
            {/* <h5>Banners</h5> */}
            <div style={{display:'flex',justifyContent:'flex-end'}}>
          
          <Add_btn 
          title='Add offer image'
           onClick={() => this.Show_add_banner()}
          />
          </div>
            <Table
                tableHeaderColor="primary"
                tableHead={["Sl.No","Image","Action"]}
                hide_header
                FR_DOC
                data={p.user.offers}
                keys = {["slno", "image",'action']}
                custome={{
                  "slno":(it,i) => i+1,
                  'action':(item,i)=>(<div style={{display:'flex'}}>
                      <ActionBtn name='Delete' 
                        onClick={()=> this.show_delete_banner(item)}
                      />
                  </div>),
                  'image':(it)=><img 
                    src={it.imageUrl}
                  style={{
                      background:'#aaa',height:100,width:300,alignItems:'center',justifyContent:'center',display:'flex'
                  }} />
                 
              }}
            />
    
    
        
    <AddBanner 

show={call => this.Show_add_banner = call}

/>

    <Ask_Confirm 
    show={call => this.show_delete_banner = call}
    onDelete = {this.onDeleteBanner}
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
export default connect(mapStateToProps,{Delete_Offer,Get_offers})(Vendosscren)