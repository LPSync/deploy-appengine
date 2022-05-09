import React, {memo} from "react";
import {Box, Button, Grid, makeStyles, Typography} from "@material-ui/core";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import ProfileTypography from "../../../components/typographies/ProfileTypography";
import FrontendRoutes from "../../../data/constants/FrontendRoutes";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {setOrgChartEmail} from "../../../data/redux/common/commonActions";
import {
  setDisabledSearchResults,
  setSearchQuery,
} from "../../../data/redux/userDirectory/userDirectoryActions";
import UserProfileBadges from "./TopProfileBadges/UserProfileBadges";

const useStyles = makeStyles((theme) => ({
  img: {
    borderRadius: "5%",
    boxShadow: "0px 10px 25px 0px rgba(0, 0, 0, 0.3)",
  },
  imgItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userEmail: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  line: {
    borderLeft: "2px solid #87889c",
    paddingLeft: theme.spacing(2),
  },
  viewInOrgButton: {
    marginTop: theme.spacing(1),
    fontSize: ".75em",
  },
  profileNameBlock: {
    paddingLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const UserProfileInfo = ({profile, image, setOrgChartEmail}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleViewInOrg = () => {
    if (profile?.email) {
      setOrgChartEmail(profile?.email);
    }
    history.push(FrontendRoutes.ORGANIZATION_CHART);
  };

  return (
    <Box minWidth={1050}>
      <PaperCardWrapper>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item className={classes.imgItem}>
            <div>
              <img src={image} alt="profile img" className={classes.img} />
            </div>

            <div className={classes.profileNameBlock}>
              <div>
                <Typography component={"div"} variant="h5">
                  {profile?.firstName} {profile?.lastName}
                </Typography>
              </div>
              <Button
                onClick={handleViewInOrg}
                color="secondary"
                variant="contained"
                size="small"
                className={classes.viewInOrgButton}
              >
                View in Org Chart
              </Button>

              <UserProfileBadges />
            </div>
          </Grid>

          <Grid item className={classes.line}>
            <ProfileTypography subtitle="JOB TITLE" text={profile?.jobTitle} />
            <ProfileTypography
              subtitle="EMPLOYEE TYPE"
              text={profile?.employeeType}
            />
            <ProfileTypography
              subtitle="EMAIL"
              text={
                <a
                  href={`mailto:${profile?.email}`}
                  target="_top"
                  className={classes.userEmail}
                >
                  {profile?.email}
                </a>
              }
            />
          </Grid>

          <Grid item>
            <ProfileTypography subtitle="LOCATION" text={profile?.location} />
            <ProfileTypography
              subtitle="PRIMARY PHONE"
              text={profile?.primaryPhone ? profile?.primaryPhone : "n/a"}
            />
            <ProfileTypography
              subtitle="MOBILE PHONE"
              text={profile?.mobilePhone ? profile?.mobilePhone : "n/a"}
            />
          </Grid>

          <Grid item>
            <ProfileTypography
              subtitle="DEPARTMENT"
              text={profile?.department}
            />
            <ProfileTypography subtitle="COMPANY" text={profile?.companyName} />
            <ProfileTypography
              subtitle="BUSINESS UNIT"
              text={profile?.businessUnit}
            />
          </Grid>
        </Grid>
      </PaperCardWrapper>
    </Box>
  );
};

export default connect(() => ({}), {
  setOrgChartEmail,
  setSearchQuery,
  setDisabledSearchResults,
})(memo(UserProfileInfo));
