import React from "react";
import { Button } from "@mui/material";
import "./Square.css"
class Square extends React.Component {
  render() {
    const { value, clicked, onClick, isBingo } = this.props;
    return (
      <Button 
        className="square"
        onClick={onClick}
        variant={clicked ? "contained" : "outlined"}
        //sx={{ backgroundColor: isBingo ? "green" : undefined }}
        color={isBingo ? "success" : undefined }

      >
        {value}
      </Button>
    );
  }
}

export default Square;
