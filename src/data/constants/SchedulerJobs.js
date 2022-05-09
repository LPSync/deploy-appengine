const NO_DATA_LABEL = "No data";

export const SCHEDULER_JOBS_TABLE_COLUMNS = [
  {
    field: "name",
    headerName: "Name",
    width: 350,
    valueGetter: ({ row }) => {
      if (row.name) {
        const splicedName = row.name.split('/');
        return splicedName[splicedName.length - 1];
      }
      return NO_DATA_LABEL;
    }
  },
  {
    field: "description",
    headerName: "Description",
    width: 550,
    valueGetter: ({row}) => row.description ? row.description : NO_DATA_LABEL
  },
  {
    field: "state",
    headerName: "State",
    width: 150,
    valueGetter: ({ row }) => row.state ? row.state : NO_DATA_LABEL
  },
  {
    field: "lastAttemptTime",
    headerName: "Last Attempt Time",
    width: 500,
    valueGetter: ({ row }) => row.lastAttemptTime ? new Date(row.lastAttemptTime) : NO_DATA_LABEL
  },
  {
    field: "schedule",
    headerName: "Schedule",
    width: 150,
    valueGetter: ({ row }) => row.schedule ? row.schedule : NO_DATA_LABEL
  },
];