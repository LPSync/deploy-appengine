import React, {memo} from "react";
import {Box, Button, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RefreshButton from "../../components/buttons/RefreshButton";
import BoxCardWrapper from "../../components/blocks/BoxCardWrapper";

const RequestSearchBar = ({children, to, btnText, handleRefresh}) => {
  return (
    <BoxCardWrapper>
      <Toolbar>
        {children}

        <Box flexGrow={1} />
        <Button
          variant="contained"
          component={Link}
          to={to}
        >
          <AddIcon/> {btnText}
        </Button>
        <Box ml={2}>
          <RefreshButton handleClick={handleRefresh} />
        </Box>
      </Toolbar>
    </BoxCardWrapper>
  );
};

export default memo(RequestSearchBar);
