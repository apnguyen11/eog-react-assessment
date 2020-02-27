import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';

interface DropDownValue {
    metric: string
  };

const CHOOSEMETRIC = "CHOOSEMETRIC"

interface SetMetricAction {
  type: typeof CHOOSEMETRIC;
  metric: DropDownValue
}







export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    setAnchorEl(null);
    console.log(event.currentTarget.textContent, 'close')
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


