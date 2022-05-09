import React, {createRef, forwardRef, memo} from "react";
import {makeStyles, Menu} from "@material-ui/core";
import BadgeGroupItem from "./BadgeGroupItem";
import {BadgeNames} from "../../data/constants/BadgeTypes";

const useStyles = makeStyles((theme) => ({
  allBadgesPaper: {
    minWidth: 50,
    maxWidth: 230,
    transform: "translate(calc(-50% + 4px), 0) !important",
    background: "transparent",
    boxShadow: theme.shadows[3],
    // boxShadow: "none",
  },
  allBadgesWrapper: {
    // margin: "30px 4px 4px",
    background: theme.palette.secondary.light,
    borderRadius: 5,
    padding: theme.spacing(1),
    "& >:not(:last-child)": {
      marginBottom: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderBottom: "1px solid",
    },
  },
}));

const BadgeMenu = forwardRef(
  ({anchorEl, handleClose, badgeType, badges, badgesTypes, ...props}, ref) => {
    const classes = useStyles();
    const badgeGroupRef = createRef();

    const getBadgeGroupItem = () => {
      if (badgesTypes) {
        return Object.entries(badgesTypes)?.map(([type, badgeList]) => (
          <BadgeGroupItem
            key={type}
            badges={badgeList}
            title={BadgeNames?.[type]}
          />
        ));
      }
      return (
        <BadgeGroupItem
          ref={badgeGroupRef}
          badges={badges}
          title={BadgeNames?.[badgeType]}
        />
      );
    };

    return (
      <Menu
        id={`badges-menu`}
        keepMounted
        ref={ref}
        open={!!anchorEl}
        classes={{
          paper: classes.allBadgesPaper,
          list: classes.allBadgesWrapper,
        }}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        MenuListProps={{onMouseLeave: handleClose}}
        {...props}
      >
        {getBadgeGroupItem()}
      </Menu>
    );
  }
);

export default memo(BadgeMenu);
