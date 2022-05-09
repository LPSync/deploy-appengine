import { memo } from "react";
import { Container, Table, TableBody, TableContainer } from "@material-ui/core";

const TaskContainerTable = ({ tableProps, containerProps, ...props }) => {
  return (
    <Container {...containerProps}>
      <TableContainer>
        <Table size="small" aria-label="task table" {...tableProps}>
          <TableBody {...props}/>
        </Table>
      </TableContainer>
    </Container>
  )
};

export default memo(TaskContainerTable);