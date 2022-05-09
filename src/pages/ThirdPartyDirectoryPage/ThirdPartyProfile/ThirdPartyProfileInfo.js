import React, { memo } from "react";
import {connect} from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import ProfileTypography from "../../../components/typographies/ProfileTypography";
import {getStatusName} from "../../../data/constants/ThirdPartyStatuses";

const DEFAULT_NULL_LABEL = 'Not Entered';

const getThirdPartyContactName = (thirdParty) => {
  const {contactFirstName, contactLastName} = thirdParty || {};
  return contactFirstName && contactLastName ? (contactFirstName + " " + contactLastName) : DEFAULT_NULL_LABEL;
}

const ThirdPartyProfileInfo = ({thirdPartyData}) => {
  return (
    <Box>
      <PaperCardWrapper>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <div>
              <Typography component={"div"} variant="h6">
                {thirdPartyData.name}
              </Typography>
            </div>
          </Grid>

          <Grid item>
            <ProfileTypography
              subtitle="OWNER"
              text={thirdPartyData.owner ? thirdPartyData.owner : DEFAULT_NULL_LABEL}
            />
            <ProfileTypography
              subtitle="TYPE"
              text={thirdPartyData.type ? thirdPartyData.type : DEFAULT_NULL_LABEL}
            />
            <ProfileTypography
              subtitle="STATUS"
              text={getStatusName(thirdPartyData.code)}
            />
          </Grid>

          <Grid item>
            <ProfileTypography
              subtitle="CONTACT NAME"
              text={getThirdPartyContactName(thirdPartyData)}
            />
            <ProfileTypography
              subtitle="CONTACT EMAIL"
              text={thirdPartyData.contactEmail ? thirdPartyData.contactEmail : DEFAULT_NULL_LABEL}
            />
            <ProfileTypography
              subtitle="LP ACCESS"
              text={"yes/no"}
            />
          </Grid>
        </Grid>
      </PaperCardWrapper>
    </Box>
  );
};

export default connect(state => ({thirdPartyData: state.thirdParty.get("thirdPartyData")}), {})
(memo(ThirdPartyProfileInfo));