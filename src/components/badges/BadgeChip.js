import React, {memo, useCallback} from "react";
import {Avatar, Chip, makeStyles, Tooltip} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  setDisabledSearchResults,
  setSearchQuery, setSearchType,
} from "../../data/redux/userDirectory/userDirectoryActions";
import BadgeIcon from "./BadgeIcon";
import UserDirectorySearchTypes from "../../data/constants/UserDirectorySearchTypes";
import ConditionalWrapper from "../ConditionalWrapper";

const useStyles = makeStyles(() => ({
  chip: {
    margin: ".25rem",
    cursor: "pointer"
  },
}));

const BadgeChip = ({
  id,
  label,
  image,
  icon,
  isDisabled,
  tooltip,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onChipClick = useCallback((e) => {
    if (label) {
      dispatch(setSearchQuery(label));
      dispatch(setSearchType(UserDirectorySearchTypes.BADGES));
      dispatch(setDisabledSearchResults(false));
    }
    e.stopPropagation();
  }, [label, dispatch]);

  return (
    <ConditionalWrapper
      condition={tooltip}
      wrapper={children => (
        <Tooltip title={`Find users with "${label}" badge`} placement="bottom">
          {children}
        </Tooltip>
      )}
    >
      {icon ? (
        <span className={classes.chip} onClick={onChipClick}>
          <BadgeIcon image={image} />
        </span>
      ) : (
        <Chip
          id={id}
          variant={"outlined"}
          label={label}
          className={classes.chip}
          avatar={<Avatar alt={label} src={image} />}
          clickable={true}
          onClick={onChipClick}
          {...props}
        />
      )}
    </ConditionalWrapper>
  );
};

export default memo(BadgeChip);