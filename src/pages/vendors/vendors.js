import React, { useEffect, useRef,Component } from "react";
import Table from "../../mycomponent/table";
import {  Switch} from '@material-ui/core';

import {Txt,Add_btn,FlotingInput,CSwitch,ActionBtn,Ask_Confirm} from '../../mycomponent/general';

import Addvendor from './addvendor';
import { connect } from "react-redux";
import {Get_Vendors,Delete_Vendor } from '../../actions/vendor';
import { Update } from "actions/services";
import { Delete_Doc } from "actions/services";




class Vendosscren extends Component {

constructor(){
  super();
  this.state={
    vd_count:0
  }
}

 
   Switched = (item,value)=>{
          Update('Saloons',item.id,{
            status:value?true:false
          },()=>{})
  }
 
   Show_Add_vendor =()=>{
    this.Show_add_vendor();
    // if(addvref.current && addvref.current.show){
    //   addvref.current.show();
    // }
   
  };
    componentDidMount(){
      this.props.Get_Vendors({
        limit:5
      },(res)=>{
        this.setState({vd_count:res});
      })
    }
    onEdit = (item)=>{
      this.Show_add_vendor(item);
    }
    onDelete=(item)=>{
        this.props.Delete_Vendor({id:item.id,
        email:item.email,
        password:item.password
        
        })
        console.log('delete item',item)
    }
  onFetch=(filter)=>{
    this.props.Get_Vendors(filter,()=>{})
  }

render(){
  const p = this.props;
  const s = this.state;
  const rsd = p.vendor.vendors.length>0?p.vendor.vendors:[];
 
  return (
    <div>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          
        <Add_btn 
        title='Add Vendor'
        onClick={this.Show_Add_vendor}
        />
        </div>

      
      
    
        <Table
            onFetch={this.onFetch}
            count={s.vd_count}
            tableHeaderColor="primary"
            tableHead={["Vendor ID", "Vendor Name", "Contact Number", "Saloon Name", "Type","Action","Status"]}
          
            data={rsd}
            FR_DOC
            keys = {["Saloon_id", "vendor_name", "contact_number", "Saloon_name", "Type","action","status"]}
            custome={{
                'action':(item,i)=>(<div style={{display:'flex'}}>
                    {/* <Actionbtn name='View' /> */}
                    <ActionBtn onClick={this.onEdit.bind(this, item)} name='Edit' />
                    <ActionBtn 
                    onClick={()=> this.show_delete(item)}
                    name='Delete' />

                </div>),
                'status':(item,i)=>(<CSwitch 
                  value={item.status}
                  switched={this.Switched.bind(this, item)}
                  />),
            }}
        />
    


    


<Addvendor 

show={call => this.Show_add_vendor = call}

/>
    <Ask_Confirm 
    show={call => this.show_delete = call}
    onDelete = {this.onDelete}
    label='Saloon_id'
    />




    </div>
  );
}


}
const mapStateToProps =(state) =>{
  return{
   general:state.general,
   vendor:state.vendor
  }
}
export default connect(mapStateToProps,{Get_Vendors,Delete_Vendor})(Vendosscren)