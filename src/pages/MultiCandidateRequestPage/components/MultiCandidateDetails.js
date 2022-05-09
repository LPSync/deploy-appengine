import React, {memo, useCallback} from "react";
import {connect} from "react-redux";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import TableBox from "./TableBox";
import tableColumnsOptions, {DEFAULT_NO_DATA_LABEL} from "./TableOptions";
import {Grow} from "@material-ui/core";
import AlreadyExistUsernameModal from "../../../components/modals/AlreadyExistUsernameModal";
import CandidateUsername from "./CandidateUsername";
import {setExistingId} from "../../../data/redux/multiCandidateRequest/multiCandidateRequestActions";

const fullTableColumnOptions = () => {
  const options = tableColumnsOptions.concat(
    [
      {
        field: "locationDescription",
        headerName: "Location Description",
        width: 250,
        valueGetter: ({row}) => row.location?.locationDescription ?? DEFAULT_NO_DATA_LABEL
      },
      {
        field: "jobCode",
        headerName: "Job Code",
        width: 160,
        valueGetter: ({row}) => row.jobCode ?? DEFAULT_NO_DATA_LABEL
      },
      // {
      //   field: "managerName",
      //   headerName: "Manager Name",
      //   width: 250,
      //   valueGetter: ({ row }) => row.onboardManagerFirstName && row.onboardManagerLastName ?
      //     `${row.onboardManagerFirstName} ${row.onboardManagerLastName}` : DEFAULT_NO_DATA_LABEL
      // },
    ]
  );
  options?.splice(3, 0, {
    field: "username",
    headerName: "Username",
    width: 200,
    renderCell: ({row}) => row.username ??
      <CandidateUsername key={row.id} firstName={row?.firstName} lastName={row?.lastName} id={row.id} />
  })
  return options;
}

const MultiCandidateDetails = ({selectedTasks, existingId, setExistingId}) => {

  const handleClose = useCallback(() => {
    setExistingId();
  }, []);

  return (
    <>
      {selectedTasks?.length > 0 &&
      <RequestFormWrapper>
        <Grow in={selectedTasks?.length > 0}>
          <TableBox
            tableData={selectedTasks}
            tableColumnsOptions={fullTableColumnOptions()}
            checkboxSelection={false}
          />
        </Grow>
      </RequestFormWrapper>
      }
      {!!existingId && (
        <AlreadyExistUsernameModal open={!!existingId} handleClose={handleClose} id={existingId} />
      )}
    </>
  );
};

export default connect(
  state => ({
    existingId: state.multiCandidateRequest.get("existingId"),
    selectedTasks: state.multiCandidateRequest.get("selectedTasks")
  }),
  {setExistingId})
(memo(MultiCandidateDetails));