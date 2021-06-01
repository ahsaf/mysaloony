import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridContainer from "components/Grid/GridContainer.js";
import Homecard from './homecard';
import Table from 'mycomponent/table'
import { } from 'mycomponent/general'
import { Person,Store,People,Assignment,AssignmentTurnedIn,AssignmentLate } from "@material-ui/icons";
import { connect } from "react-redux";
import { Get_home } from '../../actions/general_actions';
import { Get_New_Booking } from '../../actions/vendor';
import { Get_date } from "mycomponent/general";
const useStyles = makeStyles(styles);

const Dashboard = (p)=> {
  const classes = useStyles();
  const [bk_count,setBkcount] = useState(0);
  const navigate = (link)=>{
    p.history.push(`/admin/${link}`);
  
  }
  useEffect(()=>{
    p.Get_New_Booking({
      limit:5
    },(size)=>{
      setBkcount(size);
    })
    p.Get_home({},()=>{
      
    })
  },[])
  const tabldata = [
    {id:1,v_id:'BK0221123',v_name:'Ahamed',mobile:'9846555666',s_name:'12/02/2021 11:18 AM',type:'Men',s_no:'9846575514',saloon:'New Saloon'},
  
]
const onFetch=(filter)=>{
  p.Get_New_Booking(filter,()=>{})
}
const rsd = p.general.home?p.general.home:{}
const bookings = p.vendor.new_booking.length>0?p.vendor.new_booking:[];
  return (
    <div>
        <GridContainer >
        <Homecard 
        count={rsd.saloon}
        title='Total Saloon'
        onClick={()=>  navigate('vendors')}
        icon={Store}
        />
        <Homecard 
         count={rsd.customer}
        title='Total Customers'
        onClick={()=>  navigate('customers')}
        icon={Person}
        />
        <Homecard 
         count={rsd.employees}
        title='Total Employees'
        onClick={()=>  navigate('vendors')}
        icon={People}
        />
  
      </GridContainer>
        <GridContainer>
        <Homecard 
         count={rsd.confirm_booking}
        title='Total Confirmed Booking'
        onClick={()=>  navigate('vendors')}
        icon={Assignment}
      
        />
        <Homecard 
         count={rsd.rejected_booking}
        title='Total Rejected Booking'
        onClick={()=>  navigate('customers')}
        icon={AssignmentLate}
        />
        <Homecard 
        count={rsd.completed_booking}
        title='Total Completed Booking'
        onClick={()=>  navigate('vendors')}
        icon={AssignmentTurnedIn}
        />
  
      </GridContainer>
   
      <h5>New Bookings</h5>
             <Table
              count={bk_count}
              onFetch={onFetch}
              tableHeaderColor="primary"
              tableHead={["Sl.No", "Customer Name", "Contact Number", "Booking Time", "Saloon","Saloon Contact","Price","Time Slote","Place","Status"]}
              FR_DOC
              custome={{
                'time':(item,i)=> Get_date(item.booking_time.toDate(),'DD/MM/YYYY HH:MM'),
                'id':(item,i)=> i+1,
                "place":(item,i)=> item.atHome?"Home":"Shop"
              }}
              data={bookings}
              keys = {["id",         "user_name", "user_contact",          "time",       'saloon_name','saloon_contact',"total_price","slot","place", "status"]}
                      
/>
    </div>
  );
}
const mapStateToProps =(state) =>{
  return{
   general:state.general,
   vendor:state.vendor
  }
}
export default connect(mapStateToProps,{Get_home,Get_New_Booking})(Dashboard);