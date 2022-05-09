import {Tooltip} from "@material-ui/core";
import {Warning} from "@material-ui/icons";
import React from "react";

export const CircleIcon = ({color}) => (
  <svg
    viewBox="0 0 24 24"
    width="24px"
    height="24px"
    style={{display: "inline-block"}}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color || "#fff"}
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const SaSFlag = ({data}) => {
  const createFlag = (icon) => {
    return (
      <Tooltip title={data?.description || "No Warning Flags"}>{icon}</Tooltip>
    );
  };
  switch (data?.name) {
    case "warning":
      return createFlag(<Warning style={{color: `#${data?.colour}`}} />);
    default:
      return createFlag(
        <div style={{width: 24, height: 24, lineHeight: 1}}>
          <CircleIcon />
        </div>
      );
  }
};

export default SaSFlag;
