import React, {memo} from "react";
import {Box} from "@material-ui/core";
import CustomFormSelect from "../../inputs/CustomFormSelect";
import {useQuery} from "@apollo/client";
import {GET_HRTERMINATION_CODES} from "../../../operations/queries/getHRTerminationCodes";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";
import GridInputWrapper from "../../requestFormWrapper/GridInputWrapper";

const HrTerminationCodeSelect = ({...props}) => {
  const history = useHistory();
  const {data} = useQuery(GET_HRTERMINATION_CODES, {
    onError: (error) => handleError(error)(history),
  });

  return (
    <GridInputWrapper title="Select termination code">
      <Box>
        <CustomFormSelect
          name="termination-code"
          label="Termination Code"
          width={"25ch"}
          options={data?.get_hrtermination_codes?.map(
            ({terminationCode}) => terminationCode
          )}
          {...props}
        />
      </Box>
    </GridInputWrapper>
  );
};

export default memo(HrTerminationCodeSelect);
