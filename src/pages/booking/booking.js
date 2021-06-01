import React, { useEffect,Component } from "react";
import Table from "../../mycomponent/table";
import { ActionBtn,Ask_Confirm } from 'mycomponent/general'
import { connect } from "react-redux";
import {Get_Booking,Delete_Booking,Get_New_Booking } from '../../actions/vendor';
import { render } from "react-dom";
import { Get_date } from "mycomponent/general";

class Bookingsscren extends Component  {
  constructor(){
    super();
    this.state={
      bk_count:0
    }
  }



    // const tabldata = [
    //     {id:1,v_id:'BK0221123',v_name:'Ahamed',mobile:'9846555666',s_name:'12/02/2021 11:18 AM',type:'Men',s_no:'9846575514',saloon:'New Saloon',status:'Completed'},
      
    // ]
    componentDidMount(){
      this.props.Get_Booking({
        limit:5
      },(size)=>{
        this.setState({bk_count:size})
      });
      this.props.Get_New_Booking({
        limit:5
      },(size)=>{
        this.setState({bk_count:size})
      });
    }
   

    onDelete=(item)=>{
       this.props.Delete_Booking({id:item.id})
  }
   onFetch=(filter)=>{
    this.props.Get_Booking(filter,()=>{})
  }
   onFetchnew=(filter)=>{
    this.props.Get_New_Booking(filter,()=>{})
  }
  //  navigate = (link)=>{
  //   p.history.push(`/admin/${link}`);
  // }
  render(){
    const p = this.props;
    const s = this.state;
    const rsd = p.vendor.bookings.length>0?p.vendor.bookings:[];
    const new_bookings = p.vendor.new_booking.length>0?p.vendor.new_booking:[];
    return (
      <div>
          <h5>New Bookings</h5>
          <Table
              tableHeaderColor="primary"
              onFetch={this.onFetchnew}
              tableHead={["Sl.No", "Customer Name", "Contact Number", "Booking Time", "Saloon","Saloon Contact","Price","Time Slote","Place","Status"]}
              count={s.bk_count}
              data={new_bookings}
              keys = {["slno",         "user_name", "user_contact",          "time",       'saloon_name','saloon_contact', "total_price","slot","place", "status"]}
              FR_DOC
              custome={{
                'slno':(item,i)=> i+1,
                // 'action':(item,i)=>(<div style={{display:'flex'}}>
                //     {/* <ActionBtn name='View' /> */}
                //     {/* <ActionBtn name='Edit' /> */}
                //     <ActionBtn 
                //       onClick={()=> this.show_delete(item)}
                //     name='Delete' />
                // </div>),
                'time':(item,i)=> Get_date(item.booking_time.toDate(),'DD/MM/YYYY HH:MM'),
                "place":(item,i)=> item.atHome?"Home":"Shop"
               
            }}
          />
  
  
          <h5>Previous Bookings</h5>
               <Table
                   count={s.bk_count}
                   onFetch={this.onFetch}
                          tableHeaderColor="primary"
                          tableHead={["Sl.No", "Customer Name", "Contact Number", "Booking Time", "Saloon","Saloon Contact","Price","Time Slote","Place","Status"]}
                          FR_DOC
                          data={rsd}
                          keys = {["slno",         "user_name", "user_contact",          "time",       'saloon_name','saloon_contact',"total_price","slot","place", "status"]}
                          custome={{
                            'slno':(item,i)=> i+1,
                            'time':(item,i)=> Get_date(item.booking_time.toDate(),'DD/MM/YYYY HH:MM'),
                            "place":(item,i)=> item.atHome?"Home":"Shop"
                          }}
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
   vendor:state.vendor
  }
}
export default connect(mapStateToProps,{Get_Booking,Delete_Booking,Get_New_Booking})(Bookingsscren)