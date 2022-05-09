import React, { memo } from "react";
import { Box, Breadcrumbs } from "@material-ui/core";
import BreadcrumbLink from "./BreadcrumbLink";
import FrontendRoutes, { AdminRoutes } from "../../data/constants/FrontendRoutes";
import PropTypes from "prop-types";

const BreadcrumbHomeBox = ({admin, children}) => {
  return (
    <Box mt={1} ml={1}>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadcrumbLink href={admin ? AdminRoutes.ADMIN : FrontendRoutes.HOME} title={"Home"}/>
        {children}
      </Breadcrumbs>
    </Box>
  )
}

BreadcrumbHomeBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(BreadcrumbHomeBox);