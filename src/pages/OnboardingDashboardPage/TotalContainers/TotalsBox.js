import React, {memo, useEffect, useState} from "react";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import {Box, Typography} from "@material-ui/core";
import TotalContainer from "../../../components/totalContainer/TotalContainer";
import TotalBox from "../../../components/totalContainer/TotalBox";
import TotalBoxDivider from "../../../components/totalContainer/TotalBoxDivider";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";

const TotalsBox = ({title, statuses, isSubmitted, executeFunc}) => {
  const history = useHistory();
  const [totals, setTotals] = useState();

  const {refetch} = executeFunc({fetchPolicy: "no-cache", onError: (error) => handleError(error)(history)}, setTotals);

  useEffect(() => {
    if (isSubmitted) {
      refetch();
    }
  }, [isSubmitted]);

  return (
    <PaperCardWrapper>
      <Box mb={1}>
        <Typography> {title} </Typography>
      </Box>
      <TotalContainer>
        {statuses?.map(({id, name}, index) => (
          <React.Fragment key={id}>
            <TotalBox
              totalNum={totals?.[id]}
              totalNumTitle={name}
            />
            {(index < statuses?.length - 1) && <TotalBoxDivider />}
          </React.Fragment>
        ))}
      </TotalContainer>
    </PaperCardWrapper>
  );
};

export default memo(TotalsBox);