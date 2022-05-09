import {Button, CircularProgress} from "@material-ui/core";
import React from "react";

const LoadingButton = ({
  children,
  disabled,
  className,
  onClick,
  loading,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onClick}
      className={className}
      color={"secondary"}
      disabled={disabled}
      style={{position: "relative", paddingLeft: 40, paddingRight: 40}}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={20}
          color="inherit"
          style={{position: "absolute", left: 12}}
        />
      )}
      {children}
    </Button>
  );
};
export default LoadingButton;
