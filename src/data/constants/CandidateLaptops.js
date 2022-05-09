import React from "react";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const NO_DATA_LABEL = "No data";

const GENERATE_LAPTOPS_TABLE_COLUMNS = (editCallback, deleteCallback) => [
  {
    field: "laptopType",
    headerName: "Laptop Type",
    width: 320,
    valueGetter: ({row}) => row?.laptopType ?? NO_DATA_LABEL,
  },
  {
    field: "laptopLanguage",
    headerName: "Laptop Language",
    width: 200,
    valueGetter: ({row}) => row?.laptopLanguage ?? NO_DATA_LABEL,
  },
  {
    field: "active",
    headerName: "Active",
    width: 150,
    valueGetter: ({row}) => row?.laptopAvailability ? "True" : "False",
  },
  {
    field: "editDelete",
    headerName: " ",
    width: 150,
    renderCell: ({row}) => (
      <div>
        <IconButton onClick={event => editCallback(event, row)}>
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton onClick={event => deleteCallback(event, row)}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </div>
    ),
  },
];

export default GENERATE_LAPTOPS_TABLE_COLUMNS;