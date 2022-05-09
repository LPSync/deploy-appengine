import {memo} from "react";
import {Tooltip, withStyles} from "@material-ui/core";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    maxWidth: 600,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid " + theme.palette.background.dark,
  },
}))(Tooltip);

export default memo(HtmlTooltip);
