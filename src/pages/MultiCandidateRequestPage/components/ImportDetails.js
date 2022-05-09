import React, {memo} from "react";
import {connect} from "react-redux";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../../components/blocks/SectionTitleBlock";
import TableBox from "./TableBox";
import tableColumnsOptions from "./TableOptions";
import {Grow} from "@material-ui/core";

const ImportDetails = ({csvData}) => {
  return (
    <>
      {csvData?.length > 0 &&
      <RequestFormWrapper>
        <SectionTitleBlock title="Import Details">
          <Grow in={csvData?.length > 0}>
            <TableBox
              tableData={csvData}
              tableColumnsOptions={tableColumnsOptions}
            />
          </Grow>
        </SectionTitleBlock>
      </RequestFormWrapper>
      }
    </>
  );
};

export default connect(
  state => ({csvData: state.multiCandidateRequest.get("csvData")}),
  {})
(memo(ImportDetails));