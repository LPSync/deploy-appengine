import React, {memo} from "react";
import RequestFormWrapper from "../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../components/blocks/SectionTitleBlock";
import ImportDetails from "./components/ImportDetails";
import ImportCSV from "./components/ImportCSV";

const CreateMultiCandidateRequestForm = () => {
  return (
    <>
      <RequestFormWrapper>
        <SectionTitleBlock title="Import CSV">
          <ImportCSV />
        </SectionTitleBlock>
      </RequestFormWrapper>

      {/*error block*/}
      <ImportDetails/>
    </>
  );
};

export default memo(CreateMultiCandidateRequestForm);
