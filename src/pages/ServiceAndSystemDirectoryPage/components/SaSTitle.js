import {Tooltip, Typography} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import {Box} from "@mui/material";
import React from "react";

const SaSTitle = ({children, tooltipText, ...props}) => {
  return (
    <Box style={{display: "flex"}} {...props}>
      <Typography>{children}</Typography>
      <Tooltip title={tooltipText} style={{marginLeft: 10, cursor: "help"}}>
        <InfoIcon />
      </Tooltip>
    </Box>
  );
};
export default SaSTitle;
