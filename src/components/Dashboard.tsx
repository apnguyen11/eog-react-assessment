import React from "react"
import { makeStyles } from '@material-ui/core/styles'

import GetLastKnownMeasurements from '../Features/GetLastKnownMeasurement/GetLastKnownMeasurement'
import GetMeasurements from '../Features/GetMeasurements/GetMeasurements'
import DropDown from './DropDown/DropDown'



const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'black',
      height: 48,
      padding: '0 30px',
    },
  });

interface Props {
    // text: string;
}

 export const DashBoard: React.FC<Props> = () => {
    const classes = useStyles();
    return (
     
        <div className={classes.root}>
            
            <div >
                <DropDown />
                <GetLastKnownMeasurements />
            </div> 
            <GetMeasurements/>
        </div>
    
    )
}

