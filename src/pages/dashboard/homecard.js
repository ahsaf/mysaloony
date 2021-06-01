import React from "react";
import Warning from "@material-ui/icons/Warning";
import GridItem from "components/Grid/GridItem.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";


import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);

const Homecard = (p) => {
    const classes = useStyles();
  
    return (
        <GridItem xs={12} sm={6} md={4}>
        <Card onClick={p.onClick}>
          <CardHeader color="primery" stats icon>
            <CardIcon color="primary" >
            {p.icon?<p.icon />:null}
            </CardIcon>
            <p className={classes.cardCategory} style={{fontWeight:400}}>{p.title}</p>
            <h3 className={classes.cardTitle} style={{fontWeight:400}}>
              {p.count}
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <a href={p.link} onClick={e => e.preventDefault()}>
             More Info
              </a>
            </div>
          </CardFooter>
        </Card>
      </GridItem>
        )
} 
export default Homecard;

