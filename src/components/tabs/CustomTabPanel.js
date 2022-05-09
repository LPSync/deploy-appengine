import React, {memo} from "react";
import {Box} from "@material-ui/core";
import PropTypes from "prop-types";

const CustomTabPanel = ({children, value, index, vertical, name, ...other}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${name}-tabpanel-${index}`}
      aria-labelledby={`${name}-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{height: "100%"}}>
          {children}
        </Box>
      )}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const a11yProps = (name, index) => ({
  id: `${name}-tab-${index}`,
  "aria-controls": `${name}-tabpanel-${index}`,
});

export default memo(CustomTabPanel);
