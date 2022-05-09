export const CSVFields = [
  "firstName",
  "lastName",
  "nonLpEmail",
  "employeeType",
  "locationCode",
  "jobTitle",
  "hiringManagerEmail",
  "businessUnit",
  "department",
  "company",
  "startDate",
];

export const DEFAULT_NO_DATA_LABEL = 'No data';

const tableColumnsOptions = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    valueGetter: ({ row }) => row.id ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 160,
    valueGetter: ({ row }) => row.firstName ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 160,
    valueGetter: ({ row }) => row.lastName ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "nonLpEmail",
    headerName: "Non-LP E-Mail Address",
    width: 200,
    valueGetter: ({ row }) => row.nonLpEmail ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "employeeType",
    headerName: "Employment Type",
    width: 160,
    valueGetter: ({ row }) => row.employeeType ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "locationCode",
    headerName: "Location Code",
    width: 150,
    valueGetter: ({ row }) => row.locationCode ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    width: 200,
    valueGetter: ({ row }) => row.jobTitle ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "hiringManagerEmail",
    headerName: "Manager Email",
    width: 200,
    valueGetter: ({ row }) => row.hiringManagerEmail ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "onboardBusinessUnit",
    headerName: "Business Unit",
    width: 200,
    valueGetter: ({ row }) => row.businessUnit ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "onboardDepartment",
    headerName: "Department",
    width: 200,
    valueGetter: ({ row }) => row.department ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "company",
    headerName: "Company",
    width: 220,
    valueGetter: ({ row }) => row.company ?? DEFAULT_NO_DATA_LABEL
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 160,
    valueGetter: ({ row }) => row.startDate ?? DEFAULT_NO_DATA_LABEL
  },
];

export default tableColumnsOptions;