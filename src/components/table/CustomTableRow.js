import React, {memo} from "react";
import {TableCell} from "@material-ui/core";
import StyledTableRow from "./StyledTableRow";

const CustomTableRow = ({id, rowData, handleClick, align, tableCellClasses}) => {
  return (
    <StyledTableRow
      hover={!!handleClick}
      tabIndex={-1}
      id={id}
      onClick={handleClick}
    >
      {rowData?.map(rowField =>
        <TableCell
          className={tableCellClasses}
          align={align || "right"}
          key={rowField.id}
        >
          {rowField.value}
        </TableCell>,
      )}
    </StyledTableRow>
  );
};

export default memo(CustomTableRow);