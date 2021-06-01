import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { Mpicker,Txt,TextInput,Add_btn } from './general';
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import { TablePagination } from '@material-ui/core';
const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, data, tableHeaderColor,keys,onFetch } = props;
  const [Limit,Setlimit] = useState('5');
  const [Searched,SetSearched] = useState(false);
  const [Search_text,SetSearch_text] = useState('');
  const [c_page,SetCpage] = useState(0);

  const onLimitSelect = (lim)=>{
    Setlimit(lim);
    SetCpage(0);
    onFetch({
      search_text:Search_text,
      limit:Number(lim),
      searched:Searched,
    });
  }
  const onSearchType = (tx)=>{
     SetSearch_text(tx);
  }
  const Search = ()=>{
    if(Search_text !== ''){
      SetSearched(true);
    }else{
      SetSearched(false); 
    }
    SetCpage(0);
      onFetch({
        search_text:Search_text,
        searched:Search_text === ''?false:true,
        limit:Number(Limit)
      });
  } 
  const onChangePage = (pg)=>{
    if(pg){
      SetCpage(prev => prev+1);
      onFetch({
        search_text:Search_text,
        limit:Number(Limit),
        searched:Searched,
        data
  
      });
    }else{
      SetCpage(prev => prev-1);
    }
    
    // if(pg > c_page){
    
    // }
   
  }
 
  let MaxI = (Number(Limit) * (c_page + 1)) - 1;
  let MinI = Number(Limit) * c_page;
  let rows_count = 0;

  return (


    <GridItem xs={12} sm={12} md={12}>
    <Card>
        {props.hide_header?null:
      <CardHeader color="primary" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      
        <div className={classes.searchWrapper}>
       <TextInput 
       placeholder='Search'
        onChangeText={onSearchType}
       value={Search_text}
       
       />
        <Button  
        onClick={Search}
        style={{marginLeft:6,height:32}} color="white" aria-label="edit" >
         Search
        </Button>
      </div>
      <div>
          <label style={{color:'#fff'}}>Show</label>
          <Mpicker 
          onChange={onLimitSelect}
          value={Limit}
          ml={6}
          list={['5','10','20','30','50','100','500','1000']}
          />
            <Txt c='w' ml={6} >Entries</Txt>
        </div>
      </CardHeader>}


      <CardBody>
      <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {data && keys ? data.map((itd, i) => {
            let it = itd;
            if(props.FR_DOC && itd.data){
                it = {...itd.data(),id:itd.id};

            }
            
            if(i <= MaxI && i >= MinI){
              rows_count = rows_count + 1;
              return (
                <TableRow 
  
                onClick={() => {
                  if(props.onData_CLick){
                    props.onData_CLick(it)
                  }
                 }}
                
                key={i} 
                className={classes.tableBodyRow}>
                  {keys.map((kk, ii) => {
                    if(props.custome && props.custome[kk]){
                      return (
                          <TableCell className={classes.tableCell} key={ii}>
                         {props.custome[kk](it,i)}
                        </TableCell>
                      )
                      
                      
                     
                  }else{
                      return(
                      <TableCell className={classes.tableCell} key={ii}>
                     {it[kk]}
                    </TableCell>
                      )
                  }
                  })}
                </TableRow>
              );
            }
          
          }):null}
        </TableBody>
      </Table>
    </div>
      </CardBody>
    </Card>
     {props.hide_header?null:
      <div style={{display:'flex'}}>
        <Add_btn
        title='< Previous'
        onClick={()=> onChangePage(false)}
        disabled={c_page === 0?true:false}
        />
        <Add_btn
        title='Next >'
        onClick={()=> onChangePage(true)}
        disabled={rows_count < Number(Limit) ?true:false}
        
        />
      </div>}
    {/* <TablePagination 
            
            count={props.count?props.count:0} 
            page={c_page}
            rowsPerPage={Number(Limit)}
            rowsPerPageOptions={false} 
            onChangePage={(e,aa)=>{
            onChangePage(aa);
            }}  /> */}
           
  </GridItem>



    
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
