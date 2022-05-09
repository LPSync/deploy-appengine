import React, { memo } from "react";
import { ListSubheader } from "@material-ui/core";

const NavListSubheader = ({children}) => {
  return (
    <ListSubheader style={{fontFamily: "Space Grotesk"}} disableSticky>
      {children}
    </ListSubheader>
  );
};

export default memo(NavListSubheader);
