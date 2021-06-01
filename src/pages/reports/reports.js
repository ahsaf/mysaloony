import React,{Component} from "react";
import Table from "../../mycomponent/table";
import { Get_date } from '../../mycomponent/general';
import { connect } from "react-redux";

import Genform from './generateform';
import { export_xls } from './export';
import ReactToPrint from 'react-to-print';
class Bookingsscren extends Component  {
   
  componentDidMount(){
 
  }



render(){
  const tabldata = [
    {id:1,v_id:'CE0021',v_name:'Ahamed',mobile:'9846555666',address:'Door 187'},
    {id:2,v_id:'CE0022',v_name:'Ali',mobile:'645823321',address:'Door 187'},
    {id:3,v_id:'CE0023',v_name:'Abdullah',mobile:'9946582414',address:'Door 187'}
  
]
const p = this.props;
const rsd = p.vendor.report.length>0?p.vendor.report:[];
  return (
    <div>

<Genform 
  get_state={call => this.get_gen_datails = call}

/>  
{rsd.length > 0 ? 
<div style={{
  marginBottom:-16,
  marginTop:20
}}>
  {/* <label 
  style={{color:'blue',cursor:'pointer'}}
  >Print</label> */}
   <ReactToPrint
                          trigger={() => {
                            return  (
                              <label 
                              style={{color:'blue',cursor:'pointer'}}
                              >Print</label>)
                          }}
                          content={() => this.print_ref}
                         
                        />
  <label 
  onClick={()=>{
    this.get_gen_datails((gen_d)=>{
      export_xls({
        from:gen_d.from,
        to:gen_d.to,
        data:rsd

      });
    })
  
  }}
  style={{color:'blue',cursor:'pointer',marginLeft:16}}
  >Export</label>
</div>
:null}    
    {rsd.length > 0 ?
    <div  ref={ref => this.print_ref = ref}>
  <Table
    
            tableHeaderColor="primary"
            tableHead={["Sl.No", "Customer Name", "Contact Number", "Booking Time", "Saloon","Saloon Contact","Price","Time Slote","Place","Status"]}
            hide_header
            data={rsd}
            keys = {["slno",         "user_name", "user_contact",          "time",       'saloon_name','saloon_contact',"total_price","slot","place", "status"]}
            FR_DOC
            custome={{
              'slno':(item,i)=> i+1,
              'time':(item,i)=> Get_date(item.booking_time.toDate(),'DD/MM/YYYY HH:MM'),
              "place":(item,i)=> item.atHome?"Home":"Shop"
            }}
        />
        </div>
        :null}




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
export default connect(mapStateToProps)(Bookingsscren)