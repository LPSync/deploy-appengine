import React, { memo, useEffect, useState } from "react";
import {useLazyQuery} from "@apollo/client";
import {makeStyles, TableCell} from "@material-ui/core";
import {GET_JAMF_DEVICES} from "../../../../../operations/queries/getJamfDevices";
import {useHistory} from "react-router-dom";
import handleError from "../../../../../data/handleError";
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  tableCell: {
    borderBottom: "none",
  },
}));

const JamfDevicesRows = ({ setJamfTotal, userData }) => {
  const classes = useStyles();
  const history = useHistory();
  const [jamfDevicesData, setJamfDevicesData] = useState();

  const [executeSearch] = useLazyQuery(GET_JAMF_DEVICES, {
    onCompleted: (data) => {
      setJamfDevicesData(data.get_jamf_devices);
      setJamfTotal(data.get_jamf_devices?.length);
    },
    onError: (error) => {
      setJamfDevicesData([]);
      setJamfTotal(0);
      handleError(error)(history);
    },
  });

  useEffect(() => {
    if (userData)
      executeSearch({variables: {search: userData?.profile?.email}});
  }, [userData, executeSearch]);

  return (
    <>
      {jamfDevicesData && (
        <>
          {jamfDevicesData?.length > 0 &&
            jamfDevicesData?.map((device) => (
              <StyledTableRow key={device.id}>
                <TableCell className={classes.tableCell}>
                  {device.deviceName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {device.model}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {device.serialNumber}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {device.username}
                </TableCell>
              </StyledTableRow>
            ))}
        </>
      )}
    </>
  );
};

export default connect(
  state => ({ userData: state.userDirectory.get("userData")}), {})
(memo(JamfDevicesRows));
