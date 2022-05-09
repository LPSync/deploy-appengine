import {Button} from "@mui/material";
import React from "react";
import TaskStatusBlock from "../../components/taskManager/TaskStatusBlock";
import SaSFlag from "../../pages/ServiceAndSystemDirectoryPage/components/SaSFlag";

export const SearchTypes = {
  ALL: "All",
  SYSTEMS: "Systems",
  SERVICES: "Services",
};
export const TierStatuses = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
};

export const GENERATE_DEPENDENCY_TABLE_COLUMNS = (buttonCallback) => [
  {
    field: "flag",
    headerName: "Flag",
    width: 120,
    renderCell: ({row}) => (
      <SaSFlag data={row?.flag} style={{height: "auto"}} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "type",
    headerName: "Type",
    width: 250,
  },
  {
    field: "tier",
    headerName: "Tier",
    width: 120,
    renderCell: ({row}) => (
      <TaskStatusBlock taskStatus={Number(row?.tier)} id={row?.tier} />
    ),
  },
  {
    field: "relationship",
    headerName: "Relationship",
    width: 200,
  },
  {
    field: "view",
    headerName: "View",
    width: 200,
    align: "center",
    sortable: false,
    renderCell: ({row}) => (
      <Button
        style={{width: 100}}
        color="primary"
        variant="outlined"
        onClick={() => buttonCallback(row.sysId)}
      >
        View
      </Button>
    ),
  },
];
