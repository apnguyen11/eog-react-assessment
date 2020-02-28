import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { connect } from 'react-redux';
import {Metric, actions} from './reducer'

const getMetric = (state: IState) => {
  // console.log(actions, 'these are actions')
  return {
    state
  };
};



 function SimpleMenu(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
 
  const dispatch = useDispatch();
  const { state } = useSelector(getMetric)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    setAnchorEl(null);
    // state.MetricReducer.metric = event.currentTarget.textContent
    props = event.currentTarget.textContent
    dispatch(actions.GetTheMetric(props))
    // console.log(event.currentTarget.textContent, 'close', props, 'props')
    console.log(state, "newly changed state")
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" color="primary" onClick={handleClick}>
        Select Metric
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>waterTemp</MenuItem>
        <MenuItem onClick={handleClose}>casingPressure</MenuItem>
        <MenuItem onClick={handleClose}>injValveOpen</MenuItem>
        <MenuItem onClick={handleClose}>flareTemp</MenuItem>
        <MenuItem onClick={handleClose}>oilTemp</MenuItem>
        <MenuItem onClick={handleClose}>tubingPressure</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state: IState) => {

  return {
    metric: state.MetricReducer.metric
  }
}

export default connect(mapStateToProps)(SimpleMenu)


