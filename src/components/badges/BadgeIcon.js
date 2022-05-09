import React, { forwardRef, memo } from "react";
import { IconButton } from "@material-ui/core";

const BadgeIcon = forwardRef(({ icon, image, imageName, ...props }, ref) => {
  return (
    <IconButton ref={ref} style={{ padding: ".25rem" }} {...props}>
      {icon || <img src={image} width={"24px"} height={"24px"} alt={imageName} />}
    </IconButton>
  );
});

export default memo(BadgeIcon);
