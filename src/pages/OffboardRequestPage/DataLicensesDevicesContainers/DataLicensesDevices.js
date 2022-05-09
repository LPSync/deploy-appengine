import React, {memo} from "react";
import {connect} from "react-redux";
import {Divider, Grid} from "@material-ui/core";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../../components/blocks/SectionTitleBlock";
import TransferWhatCheckContainer from "./TransferWhatCheckContainer";
import TransferWhoSelectContainer from "./TransferWhoSelectContainer";
import LicensesCheckContainer from "./LicensesCheckContainer";
import DevicesCheckContainer from "./DevicesCheckContainer";
import InfoTooltip from "../../../components/tooltips/InfoTooltip";

const DataLicensesDevices = ({
  isDriveChecked,
  isCalendarChecked,
  isDataStudioChecked,
}) => {
  return (
    <RequestFormWrapper height={"37vh"}>
      <Grid container spacing={3}>
        <Grid item xs={11} />
        <Grid item xs={1}>
          <InfoTooltip type={"help"}>
            We recommend all data, licenses, and devices selected by default.
          </InfoTooltip>
        </Grid>
      </Grid>
      <SectionTitleBlock title="Data Transfer">
        <TransferWhatCheckContainer />
        {(isDriveChecked || isCalendarChecked || isDataStudioChecked) && (
          <TransferWhoSelectContainer />
        )}
      </SectionTitleBlock>
      <Divider />
      <SectionTitleBlock title="Licenses">
        <LicensesCheckContainer />
      </SectionTitleBlock>
      <Divider />
      <SectionTitleBlock title="Devices">
        <DevicesCheckContainer />
      </SectionTitleBlock>
    </RequestFormWrapper>
  );
};

export default connect((state) => ({
  isDriveChecked: state.offboardRequest.getIn([
    "dataTransfer",
    "isDriveChecked",
  ]),
  isCalendarChecked: state.offboardRequest.getIn([
    "dataTransfer",
    "isCalendarChecked",
  ]),
  isDataStudioChecked: state.offboardRequest.getIn([
    "dataTransfer",
    "isDataStudioChecked",
  ]),
}))(memo(DataLicensesDevices));
