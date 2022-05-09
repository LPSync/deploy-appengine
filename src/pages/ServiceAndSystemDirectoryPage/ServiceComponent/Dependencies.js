import React, {memo} from "react";
import {Box} from "@material-ui/core";
import {GENERATE_DEPENDENCY_TABLE_COLUMNS} from "../../../data/constants/ServiceAndSystemDirectory";
import StyledDataGrid from "../../../components/table/StyledDataGrid";

const formatData = (data) => {
  if (!data) return null;
  const formatted = data.map((service) => ({
    id: service.id,
    name: service.name,
    relationship: service.relationship,
    sysId: service.sysId,
    type: service.sysService.type,
    tier: service.sysService.tier,
    flag: service.sysService.flag,
  }));
  return formatted;
};

const Dependencies = ({data, viewHandler}) => {
  return (
    <Box style={{height: 400, width: "100%"}}>
      <StyledDataGrid
        disableSelectionOnClick
        rows={formatData(data)}
        columns={GENERATE_DEPENDENCY_TABLE_COLUMNS(viewHandler)}
      />
    </Box>
  );
};

export default memo(Dependencies);
