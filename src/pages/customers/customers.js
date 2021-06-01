import React,{Component} from "react";
import Table from "../../mycomponent/table";
import { Switch} from '@material-ui/core';
import {ActionBtn,CSwitch,Ask_Confirm} from '../../mycomponent/general';
import { connect } from "react-redux";
import { Get_Customers,Delete_Customer } from 'actions/user'
import { Update } from "actions/services";
import EditCustomer from './editcustomer';


class Bookingsscren extends Component  {
   
  componentDidMount(){
    this.props.Get_Customers({
      limit:5
    },()=>{})
  }
  onDelete=(item)=>{
    this.props.Delete_Customer({id:item.id})
}

  Switched = (item,value)=>{
    Update('UserAccount',item.id,{
      status:value?'active':'inactive'
    },()=>{})
}
onFetch=(filter)=>{
  this.props.Get_Customers(filter,()=>{})
}


render(){
  const tabldata = [
    {id:1,v_id:'CE0021',v_name:'Ahamed',mobile:'9846555666',address:'Door 187'},
    {id:2,v_id:'CE0022',v_name:'Ali',mobile:'645823321',address:'Door 187'},
    {id:3,v_id:'CE0023',v_name:'Abdullah',mobile:'9946582414',address:'Door 187'}
  
]
const p = this.props;
const rsd = p.user.customers.length>0?p.user.customers:[];
  return (
    <div>

   
        <Table

            tableHeaderColor="primary"
            tableHead={["Sl.No", "Name", "Contact Number", "Address","Action"]}
            onFetch={this.onFetch}
            data={rsd}
            keys = {["slno", "name", "mobile_number", "city_name","action"]}
            FR_DOC
            custome={{
              'slno':(item,i)=> i+1,
                'action':(item,i)=>(<div style={{display:'flex'}}>
                    {/* <ActionBtn name='View' /> */}
                    <ActionBtn name='Edit' 
                    onClick={() => this.Show_EditCustomer(item)}
                    />
                    <ActionBtn name='Delete'
                      onClick={()=> this.show_delete(item)}
                    />

                </div>),
                // 'status':(item,i)=>(<CSwitch 
                //   value={item.status === 'active'?true:false}
                //   switched={this.Switched.bind(this, item)}
                //   />),
            }}
        />

<EditCustomer 

show={call => this.Show_EditCustomer = call}

/>
      <Ask_Confirm 
  show={call => this.show_delete = call}
  onDelete = {this.onDelete}
  />

    </div>
  );
}


}


const mapStateToProps =(state) =>{
  return{
   general:state.general,
   vendor:state.vendor,
   user:state.user
  }
}
export default connect(mapStateToProps,{Get_Customers,Delete_Customer})(Bookingsscren)