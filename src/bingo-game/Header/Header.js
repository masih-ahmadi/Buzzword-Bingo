import React from "react";
import {  AppBar, Toolbar, Button, Typography  } from "@mui/material";

import {Replay, ChangeCircle } from '@mui/icons-material';
class Header extends React.Component {
	 render() {
	return(
          <AppBar position="static" >
      <Toolbar>
        <Typography  variant="h4" component="div" sx={{ flexGrow: 1,textAlign: 'left' }}>
          Buzzword Bingo
        </Typography>

        <Button className="board-btn" variant="contained" color="error" onClick={this.props.handleRestart} startIcon={<Replay />} >
          Restart 
        </Button>
      </Toolbar>
    </AppBar>
		)


}
}
export default Header;