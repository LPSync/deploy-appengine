import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {OffboardEmployeeContext} from "../OffboardEmployeeContextProvider";
import {GET_ACLOUDGURU_LICENSE} from "../../../operations/queries/getACloudGuruLicense";
import {GET_SLACK_LICENSE} from "../../../operations/queries/getSlackLicense";
import {GET_SMARTSHEET_LICENSE} from "../../../operations/queries/getSmartsheetLicense";
import ColorCheckbox from "../../../components/checkboxes/ColorCheckbox";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  formBox: {
    width: "60ch",
    height: 125,
    overflow: "auto",
    border: "1px solid " + theme.palette.secondary.main,
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
  leftText: {
    paddingLeft: theme.spacing(5),
  },
  label: {
    fontSize: "1rem",
  },
}));

const LicenseRemoval = ({selectedOffboardUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const {unassignLicenses, setUnassignLicenses, setIsSelectedLoading} =
    useContext(OffboardEmployeeContext);
  const selectedUserEmail = selectedOffboardUser?.profile?.email;
  const [checkedAll, setCheckedAll] = useState(true);
  const [verifiedAcloudguru, setVerifiedAcloudguru] = useState(false);
  const [verifiedSlack, setVerifiedSlack] = useState(false);
  const [verifiedSmartsheet, setVerifiedSmartsheet] = useState(false);

  const [executeAcloudguruSearch] = useLazyQuery(GET_ACLOUDGURU_LICENSE, {
    onCompleted: async (data) => {
      if (data.get_acloudguru_license.ok) {
        const isInArr = unassignLicenses.some(
          (license) => license.id === "acloudguru"
        );
        if (!isInArr) {
          await setUnassignLicenses((unassignLicenses) => [
            ...unassignLicenses,
            {id: "acloudguru", isChecked: true, name: "A Cloud Guru"},
          ]);
        }
        setVerifiedAcloudguru(true);
      }
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeSlackSearch] = useLazyQuery(GET_SLACK_LICENSE, {
    onCompleted: async (data) => {
      if (data.get_slack_license.ok) {
        const isInArr = unassignLicenses.some(
          (license) => license.id === "slack"
        );
        if (!isInArr) {
          await setUnassignLicenses((unassignLicenses) => [
            ...unassignLicenses,
            {
              id: "slack",
              isChecked: true,
              name: "Slack (disable and rename)",
            },
          ]);
        }
        setVerifiedSlack(true);
      }
    },
    onError: (error) => handleError(error)(history),
  });

  const [executeSmartsheetSearch] = useLazyQuery(GET_SMARTSHEET_LICENSE, {
    onCompleted: async (data) => {
      if (data.get_smartsheet_license.ok) {
        const isInArr = unassignLicenses.some(
          (license) => license.id === "smartsheet"
        );
        if (!isInArr) {
          await setUnassignLicenses((unassignLicenses) => [
            ...unassignLicenses,
            {
              id: "smartsheet",
              isChecked: true,
              name: "Smartsheet",
            },
          ]);
        }
        setVerifiedSmartsheet(true);
      }
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
      setIsSelectedLoading(false);
    }
  }, [
    verifiedSlack,
    verifiedSmartsheet,
    verifiedAcloudguru,
    setIsSelectedLoading,
  ]);

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

  const handleCheckedAll = (e) => {
    const checked = e.target.checked;
    setCheckedAll(e.target.checked);

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
    <>
      <Grid item container>
        <Grid item xs={12}>
          <Typography component={"div"}>
            <Box fontWeight={600}>License Removal</Box>
          </Typography>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs={4}>
          <Typography
            component={"div"}
            variant="subtitle1"
            className={classes.leftText}
          >
            Select which licenses to remove
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {unassignLicenses?.length > 0 ? (
            <>
              <FormGroup row>
                <FormControlLabel
                  classes={{label: classes.label}}
                  control={
                    <ColorCheckbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={checkedAll}
                      onChange={handleCheckedAll}
                      name="checkedAll"
                    />
                  }
                  label="Check this box to remove all licenses"
                />
              </FormGroup>
              <Box className={classes.formBox}>
                <FormGroup>
                  {unassignLicenses.map((license) => (
                    <FormControlLabel
                      key={license.id}
                      classes={{label: classes.label}}
                      control={
                        <ColorCheckbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          checked={license.isChecked}
                          onChange={handleChange}
                          value={license.name}
                          name={license.name}
                        />
                      }
                      label={`${license.name}`}
                    />
                  ))}
                </FormGroup>
              </Box>{" "}
            </>
          ) : (
            <Typography component={"div"}>No licenses to remove</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state) => ({
    selectedOffboardUser: state.offboardRequest.get("selectedOffboardUser"),
  }),
  {}
)(memo(LicenseRemoval));
