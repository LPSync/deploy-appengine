import React, { memo, useEffect, useState } from "react";
import {useLazyQuery} from "@apollo/client";
import {makeStyles, TableCell} from "@material-ui/core";
import {GET_GOOGLE_CHROME_DEVICES} from "../../../../../operations/queries/getGoogleChromeDevices";
import {useHistory} from "react-router-dom";
import handleError from "../../../../../data/handleError";
import StyledTableRow from "../../../../../components/table/StyledTableRow";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  tableCell: {
    borderBottom: "none",
  },
}));

const GoogleDevicesRows = ({userData, setGoogleTotal}) => {
  const classes = useStyles();
  const history = useHistory();
  const [googleDevicesData, setGoogleDevicesData] = useState();

  const [executeSearch] = useLazyQuery(GET_GOOGLE_CHROME_DEVICES, {
    onCompleted: (data) => {
      setGoogleDevicesData(data.get_google_chrome_devices);
      setGoogleTotal(data.get_google_chrome_devices?.length);
    },
    onError: (error) => {
      setGoogleDevicesData([]);
      setGoogleTotal(0);
      handleError(error)(history);
    },
  });

  useEffect(() => {
    if (userData) {
      executeSearch({
        variables: {search: userData?.profile?.email},
      });
    }
  }, [userData, executeSearch]);

  return (
    <>
      {googleDevicesData && (
        <>
          {googleDevicesData?.length > 0 &&
            googleDevicesData?.map(
              (device) =>
                device.status !== "none" && (
                  <StyledTableRow key={device.deviceId}>
                    <TableCell className={classes.tableCell}>
                      Chrome OS Device
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {device.model}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {device.serialNumber}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {device.annotatedUser}
                    </TableCell>
                  </StyledTableRow>
                )
            )}
        </>
      )}
    </>
  );
};

export default connect(
  state => ({userData: state.userDirectory.get("userData")}), {})
(memo(GoogleDevicesRows));
