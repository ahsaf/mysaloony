import React,{Component} from "react";
import {MpickerWithHeader,FlotingInput, Get_date, Add_btn, Txt} from '../../mycomponent/general';
import  { Gen_report } from 'actions/vendor';
import { connect } from "react-redux";
import { Get_All_vendors } from 'actions/vendor'
class Bookingsscren extends Component  {
   
    constructor(){
        super();
        this.state ={
            report:'Booking',
            vendor:'All',
            from:Get_date(new Date(),'YYYY-MM-DD'),
            to:Get_date(new Date(),'YYYY-MM-DD'),
            loading:false
        }
    }


  componentDidMount(){
    this.props.Get_All_vendors({},()=>{})
    if(this.props.get_state){
      this.props.get_state((fun)=>{
        fun(this.state);
      })
    }
  }

  onChangeText = (name,txt)=>{
    this.setState({[name]:txt,msg:''});
}
onGenerate = ()=>{
    const s = this.state;
    this.setState({loading:true})
    const post ={
        vendor:s.vendor,
        from:s.from,
        to:s.to
    }
    this.props.Gen_report(post,()=>{
        this.setState({loading:false})
    })
}

render(){
const p = this.props;
const s = this.state;
  return (
    <div style={{background:'#fff',padding:16}}>
          <div style={{display:'flex'}}>
            <MpickerWithHeader 
                style={{width:200}}
                title='Report'
                list={['Booking']}
                value={s.report}
                onChange={(value)=> this.setState({gender:value === 'Male'?true:false}) }
            />
            <MpickerWithHeader 
                style={{width:200}}
                cstyle={{width:200,marginLeft:16}}
                title='Vendor'
                list={p.vendor.all_vendors}
                add_all
                FR_LIST
                field='Saloon_name'
                value={s.vendor}
                onChange={(value)=> this.setState({vendor:value}) }
            />
            </div>
            <div style={{display:'flex',marginTop:16}}>
                  <FlotingInput
                    title='Date From'
                    fill
                    date
                    length={50} 
                    onChangeText={this.onChangeText.bind(this,'from')}
                    value={s.from}
                    mr={8}
                    err={s.e_name}
                    style={{maxWidth:200}}
                 
                  />
                    <FlotingInput
                    title='Date To'
                    length={50} 
                    date
                    ml={8}
                    fill
                    onChangeText={this.onChangeText.bind(this,'to')}
                    value={s.to}
                    style={{maxWidth:200}}
                    />
            </div>
            <Add_btn 
            title='Generate'
            prime
            mt={16}
            onClick={this.onGenerate}
            disabled={s.loading}
            />
            {s.loading?
            <Txt ml={16}>Loading...</Txt>:null}



    </div>
  );
}


}
const mapStateToProps =(state) =>{
    return{
     vendor:state.vendor
    }
  }

export default connect(mapStateToProps,{Gen_report,Get_All_vendors})(Bookingsscren)