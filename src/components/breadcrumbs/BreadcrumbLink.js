import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

const BreadcrumbLink = ({ href, title }) => {
  return (
    <Button
      size="small"
      component={NavLink}
      to={href}
    >
      {title}
    </Button>
  );
};

export default memo(BreadcrumbLink);
