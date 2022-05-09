import {Button} from "@mui/material";

const NO_DATA_LABEL = "No data",
  candidateTypes = {
    nfte: 'N-FTE',
    fte: 'FTE'
  };

export const GENERATE_CANDIDATE_NON_FTE_TASKS_TABLE_COLUMNS = buttonCallback => [
  {
    field: "candidateName",
    headerName: "Candidate Name",
    width: 200,
    valueGetter: ({ row }) => {
      let result = '';

      if (row.candidateFirstName) result += row.candidateFirstName + ' '
      if (row.candidateLastName) result += row.candidateLastName

      return result;
    }
  },
  {
    field: "candidateEmail",
    headerName: "Candidate Email",
    width: 300,
    valueGetter: ({row}) => row.candidateNonLpEmail ?? NO_DATA_LABEL
  },
  {
    field: "lastLoginAt",
    headerName: "Last Login Date",
    width: 500,
    valueGetter: ({row}) => row.lastLoginAt ? new Date(+row.lastLoginAt) : NO_DATA_LABEL
  },
  {
    field: "taskType",
    headerName: "Candidate Type",
    width: 250,
    valueGetter: ({row}) => row.taskType ?? NO_DATA_LABEL
  },
  {
    field: 'removeAccess',
    headerName: ' ',
    width: 200,
    renderCell: ({row}) => (
      <Button color={row.disabled ? "success" : "warning"}
              variant="contained"
              onClick={event => buttonCallback(event, row.id, row.taskType)}>
        { row.disabled ? 'Revoke Access' : 'Remove Access' }
      </Button>
    )
  }
];