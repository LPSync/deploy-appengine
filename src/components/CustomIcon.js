import React from "react";

const CustomIcon = ({alt, src, height, ...props}) => {
  return <img alt={alt} src={src} height={height ? height : 24} {...props} />;
};

export default CustomIcon;
