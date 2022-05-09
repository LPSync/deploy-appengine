import React, { memo, useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import TaskContainerTable from "../../../components/taskManager/TaskContainerTable";
import CustomTableLabelValueRow from "../../../components/table/CustomTableLabelValueRow";

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: 500,
  },
  container: {
    marginLeft: 0,
    padding: 0
  },
}));

const DEFAULT_NULL_LABEL = "Not Entered";

const thirdPartyTableRows = (thirdPartyData) => [
  {
    label: "Third Party Code",
    value: thirdPartyData?.code || DEFAULT_NULL_LABEL,
  },
  {
    label: "Third Party Name",
    value: thirdPartyData?.name || DEFAULT_NULL_LABEL,
  },
  {
    label: "Third Party Alternate Name",
    value: thirdPartyData?.altName || DEFAULT_NULL_LABEL,
  },
];

const Details = () => {
  const classes = useStyles();
  const thirdPartyData = useSelector(state => state?.thirdParty?.get("thirdPartyData"));
  const thirdPartyRows = useMemo(() => thirdPartyTableRows(thirdPartyData), [thirdPartyData]);

  if (!thirdPartyData || !thirdPartyRows) {
    return null;
  }
  return (
    <TaskContainerTable tableProps={{ className: classes.table }} containerProps={{ className: classes.container }}>
      {thirdPartyRows?.map(row => (
        <CustomTableLabelValueRow key={row?.label} row={row} />
      ))}
    </TaskContainerTable>
  );
};

export default memo(Details);
