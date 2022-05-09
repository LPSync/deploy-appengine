import { memo } from "react";
import { Collapse } from "@material-ui/core";

const CustomCollapse = ({ ...props }) => {
  return (
    <Collapse timeout={500} unmountOnExit {...props}/>
  );
};

export default memo(CustomCollapse);