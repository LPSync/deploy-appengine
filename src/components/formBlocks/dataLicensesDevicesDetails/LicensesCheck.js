import React, {memo, useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {Box, FormGroup, Grid, makeStyles, Typography} from "@material-ui/core";
import RequestFormTypography from "../../typographies/RequestFormTypography";
import {GET_ACLOUDGURU_LICENSE} from "../../../operations/queries/getACloudGuruLicense";
import handleError from "../../../data/handleError";
import {GET_SLACK_LICENSE} from "../../../operations/queries/getSlackLicense";
import {GET_SMARTSHEET_LICENSE} from "../../../operations/queries/getSmartsheetLicense";
import CustomLabelCheckbox from "../../checkboxes/CustomLabelCheckbox";
import LoadingCircle from "../../circularProgress/LoadingCircle";

const useStyles = makeStyles((theme) => ({
  formBox: {
    height: 125,
    overflow: "auto",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
}));

const LicensesCheck = ({
  selectedOffboardUser,
  unassignLicenses,
  setUnassignLicenses,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const selectedUserEmail = selectedOffboardUser?.profile?.email;
  const [isLoading, setIsLoading] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [verifiedAcloudguru, setVerifiedAcloudguru] = useState(false);
  const [verifiedSlack, setVerifiedSlack] = useState(false);
  const [verifiedSmartsheet, setVerifiedSmartsheet] = useState(false);

  const [executeAcloudguruSearch] = useLazyQuery(GET_ACLOUDGURU_LICENSE, {
    onCompleted: async (data) => {
      if (data?.get_acloudguru_license?.ok) {
        const isInArr = unassignLicenses?.some(
          (license) => license.id === "acloudguru"
        );
        if (!isInArr) {
          await setUnassignLicenses([
            ...unassignLicenses,
            {id: "acloudguru", isChecked: true, name: "A Cloud Guru"},
          ]);
        }
      }
      setVerifiedAcloudguru(true);
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeSlackSearch] = useLazyQuery(GET_SLACK_LICENSE, {
    onCompleted: async (data) => {
      if (data?.get_slack_license?.ok) {
        const isInArr = unassignLicenses?.some(
          (license) => license.id === "slack"
        );
        if (!isInArr) {
          await setUnassignLicenses([
            ...unassignLicenses,
            {
              id: "slack",
              isChecked: true,
              name: "Slack (disable and rename)",
            },
          ]);
        }
      }
      setVerifiedSlack(true);
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeSmartsheetSearch] = useLazyQuery(GET_SMARTSHEET_LICENSE, {
    onCompleted: async (data) => {
      if (data?.get_smartsheet_license?.ok) {
        const isInArr = unassignLicenses?.some(
          (license) => license.id === "smartsheet"
        );
        if (!isInArr) {
          await setUnassignLicenses([
            ...unassignLicenses,
            {
              id: "smartsheet",
              isChecked: true,
              name: "Smartsheet",
            },
          ]);
        }
      }
      setVerifiedSmartsheet(true);
    },
    onError: (error) => handleError(error)(history),
  });

  const verifyLicenses = useCallback(async () => {
    if (selectedUserEmail) {
      await executeAcloudguruSearch({variables: {search: selectedUserEmail}});
      await executeSlackSearch({variables: {search: selectedUserEmail}});
      await executeSmartsheetSearch({variables: {search: selectedUserEmail}});
    }
  }, [
    executeAcloudguruSearch,
    executeSlackSearch,
    executeSmartsheetSearch,
    selectedUserEmail,
  ]);

  useEffect(() => {
    verifyLicenses();
  }, [verifyLicenses]);

  useEffect(() => {
    if (verifiedAcloudguru && verifiedSlack && verifiedSmartsheet) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [verifiedSlack, verifiedSmartsheet, verifiedAcloudguru, setIsLoading]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    let newState = unassignLicenses.map((license) => {
      if (license.name === value) {
        return {
          ...license,
          isChecked: checked,
        };
      } else return license;
    });

    setUnassignLicenses(newState);
  };

  const handleAllCheck = (e) => {
    const checked = e.target.checked;
    setIsAllChecked(e.target.checked);

    if (checked === false) {
      let newState = unassignLicenses.map((license) => {
        return {
          ...license,
          isChecked: false,
        };
      });
      setUnassignLicenses(newState);
    } else if (checked === true) {
      let newState = unassignLicenses.map((license) => {
        return {
          ...license,
          isChecked: true,
        };
      });
      setUnassignLicenses(newState);
    }
  };

  return (
    <Grid item container>
      <Grid item xs={4}>
        <RequestFormTypography title="Select which licenses to remove" />
      </Grid>
      <Grid item xs={5}>
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            {unassignLicenses?.length > 0 ? (
              <>
                <FormGroup row>
                  <CustomLabelCheckbox
                    label={"Check this box to remove all licenses"}
                    name={"all"}
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                  />
                </FormGroup>
                <Box className={classes.formBox}>
                  <FormGroup>
                    {unassignLicenses?.map((license) => (
                      <React.Fragment key={license.id}>
                        <CustomLabelCheckbox
                          label={license.name}
                          name={license.name}
                          checked={license.isChecked}
                          value={license.name}
                          onChange={handleChange}
                        />
                      </React.Fragment>
                    ))}
                  </FormGroup>
                </Box>
              </>
            ) : (
              <Typography component={"div"}>No licenses to remove</Typography>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(LicensesCheck);
