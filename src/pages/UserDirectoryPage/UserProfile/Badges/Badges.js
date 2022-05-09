import React, {memo, useContext, useEffect, useState} from "react";
import {Box, Button, makeStyles, Toolbar} from "@material-ui/core";
import {BadgeNames} from "../../../../data/constants/BadgeTypes";
import ChipBox from "./ChipBox";
import TopTypography from "../../../../components/typographies/TopTypography";
import EditIcon from "@material-ui/icons/Edit";
import ManageMyBadgesDrawerContent from "./ManageMyBadges/ManageMyBadgesDrawerContent";
import {AuthUserContext} from "../../../../AuthUserContextProvider";
import {useParams} from "react-router-dom";
import DisableBackdropDrawer from "../../../../components/drawers/DisableBackdropDrawer";
import {useSelector} from "react-redux";
import {getGroupedBadges} from "../../../../data/helper/helpers";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
  },
  paper: {
    width: "700px",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    paddingBottom: theme.spacing(3),
  },
}));

const Badges = ({handleBadgeQuery}) => {
  const classes = useStyles();
  const {userName} = useParams();
  const {authUser} = useContext(AuthUserContext);
  const userBadges = useSelector((state) =>
    state?.userDirectory?.get("userBadges")
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [groupedBadges, setGroupedBadges] = useState();

  useEffect(() => {
    if (userBadges) {
      setGroupedBadges(getGroupedBadges(userBadges));
    }
  }, [userBadges]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    handleBadgeQuery();
    setIsDrawerOpen(open);
  };

  return (
    <div className={classes.main}>
      <Toolbar>
        <div>
          <TopTypography>Badges</TopTypography>
        </div>
        <Box flexGrow={1} />
        {userName === authUser.profile.userName && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsDrawerOpen(true)}
          >
            <EditIcon className={classes.icon} /> Manage My Badges
          </Button>
        )}
      </Toolbar>
      {groupedBadges && (
        <Box m={2}>
          {Object.entries(groupedBadges)?.map(([badgeType, badges]) => (
            <ChipBox
              key={badgeType}
              badgeTitle={`${BadgeNames?.[badgeType]} Badges`}
              data={badges}
            />
          ))}
        </Box>
      )}

      <DisableBackdropDrawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <ManageMyBadgesDrawerContent
          setIsDrawerOpen={setIsDrawerOpen}
          handleBadgeQuery={handleBadgeQuery}
        />
      </DisableBackdropDrawer>
    </div>
  );
};

export default memo(Badges);
