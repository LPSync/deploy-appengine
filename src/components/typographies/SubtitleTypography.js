import React, {memo} from "react";
import {Typography} from "@material-ui/core";

const SubtitleTypography = ({...props}) => {
  return <Typography component={"div"} variant="subtitle2" {...props} />;
};

export default memo(SubtitleTypography);
