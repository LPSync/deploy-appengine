import React, { memo, useEffect, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import { GET_HRTERMINATION_CODES } from "../../../../operations/queries/getHRTerminationCodes";
import LoadingCircle from "../../../../components/circularProgress/LoadingCircle";
import EditDeleteCodeModal from "./EditDeleteCodeModal";
import handleError from "../../../../data/handleError";
import { useHistory } from "react-router-dom";
import StyledTableRow from "../../../../components/table/StyledTableRow";
import TopTypography from "../../../../components/typographies/TopTypography";
import AddCodeModal from "./AddCodeModal";

const useStyles = makeStyles((theme) => ({
  // box: {
  //   width: "50vw",
  // },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: "1.15rem",
  },
  tableBox: { overflow: "auto", height: "55vh", padding: theme.spacing(3) },
  title: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
}));

const HrTerminationCodes = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { data, refetch, loading, networkStatus } = useQuery(
    GET_HRTERMINATION_CODES,
    {
      notifyOnNetworkStatusChange: true,
      onError: (error) => handleError(error)(history),
    }
  );

  useEffect(() => {
    if (loading || networkStatus === NetworkStatus.refetch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading, networkStatus]);

  return (
    <Box className={classes.box}>
      <Toolbar>
        <div>
          <TopTypography>HR Termination Codes</TopTypography>
        </div>
        <Box ml={5}>
          <AddCodeModal refetch={refetch} />
        </Box>
      </Toolbar>

      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          {data && (
            <Box className={classes.tableBox}>
              <Table size="small">
                <TableBody>
                  {data.get_hrtermination_codes.map((code) => (
                    <StyledTableRow id={code.id} key={code.id}>
                      <TableCell>
                        <div>{code.terminationCode}</div>
                      </TableCell>
                      <TableCell align="right">
                        <EditDeleteCodeModal
                          id={code.id}
                          terminationCode={code.terminationCode}
                          refetch={refetch}
                          setIsLoading={setIsLoading}
                        />
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(HrTerminationCodes);
