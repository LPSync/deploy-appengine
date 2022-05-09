import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import HtmlTooltip from "./HtmlTooltips";

const InfoTooltip = ({placement, type, children}) => {
  return (
    <HtmlTooltip placement={placement} title={children}>
      {type === "help" ? <HelpOutlineIcon /> : <InfoIcon />}
    </HtmlTooltip>
  );
};

export default InfoTooltip;
