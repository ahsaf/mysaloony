import React, { Component } from "react";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Add_btn } from './general'



class Login extends Component {
    constructor(){
        super();
        this.state={
            show:false,
            item:{}
        }
    }
  
    componentDidMount(){
        this.props.show(this.show);
       
    }
    show = (item)=>{
        this.setState({show:true,
          item
        })
    }
    onClose = () =>{
        this.setState({show:false});
    }
    delete_confirm = ()=>{
        this.props.onDelete(this.state.item);
        this.onClose();
    }
  
   
  
    render() {
        const s =this.state;
        const p = this.props;
        return (
          <div>
            <Rodal 
            visible={s.show}
            onClose={this.onClose}
            width={400}
            height={200}

            >
           <h4 style={{textAlign:'left'}}>Are you sure?</h4>
           <div style={{display:'flex',alignItems:'start'}}>
           <label style={{textAlign:'left'}}>Tap YES to delete <label style={{color:'red'}}>{s.item[p.label]}</label></label>
           </div>

                    <div className='cen-v' style={{position:'absolute',bottom:16,right:16}}>
                    
                  <Add_btn bg='secondary'  onClick={this.onClose} style={{marginLeft:16}} title='NO' />
                  <Add_btn bg='danger' onClick={this.delete_confirm} style={{marginLeft:16}}  title='YES' />
              </div>
        </Rodal>
          
          </div>  
        );
    }
}
export default Login;
