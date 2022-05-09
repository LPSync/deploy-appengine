import React, {memo} from "react";
import OffboardEmployeeSelect from "./OffboardEmployeeSelect";
import RequestFormWrapper from "../../../components/requestFormWrapper/RequestFormWrapper";
import SectionTitleBlock from "../../../components/blocks/SectionTitleBlock";

const OffboardWho = () => {
  return (
    <RequestFormWrapper>
      <SectionTitleBlock title="Who is being offboarded?">
        <OffboardEmployeeSelect />
      </SectionTitleBlock>
    </RequestFormWrapper>
  );
};

export default memo(OffboardWho);
