import React, {memo} from "react";
import TaskHeadingToolbar from "../../../../components/taskManager/TaskHeadingToolbar";
import TaskContainerTable from "../../../../components/taskManager/TaskContainerTable";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import CustomTableTitleCell from "../../../../components/table/CustomTableTitleCell";
import CustomTableValueCell from "../../../../components/table/CustomTableValueCell";

const TaskSection = ({title, statusBlock, tableRows, children}) => {
  return (
    <>
      <TaskHeadingToolbar title={title}>{statusBlock}</TaskHeadingToolbar>

      {tableRows && (
        <>
          <TaskContainerTable>
            {tableRows?.map(
              (tableRow) =>
                !tableRow.hidden && (
                  <StyledTableRow key={tableRow.id}>
                    <CustomTableTitleCell>
                      {" "}
                      {tableRow.name}{" "}
                    </CustomTableTitleCell>
                    <CustomTableValueCell>
                      {" "}
                      {tableRow.value}{" "}
                    </CustomTableValueCell>
                  </StyledTableRow>
                )
            )}
          </TaskContainerTable>
          <br />
        </>
      )}
      {children}
    </>
  );
};

export default memo(TaskSection);
