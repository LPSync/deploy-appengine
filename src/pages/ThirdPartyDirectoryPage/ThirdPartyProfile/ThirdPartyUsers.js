import React, { memo, useEffect, useState } from "react";
import { Box, makeStyles, TableContainer, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { GET_USERS_BY_CONTRACTOR_COMPANY } from "../../../operations/queries/getUsersByContractorCompany";
import { useLazyQuery } from "@apollo/client";
import handleError from "../../../data/handleError";
import { useHistory } from "react-router-dom";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import NoResultsTypography from "../../../components/typographies/NoResultsTypography";
import CustomInfiniteScroll from "../../../components/table/CustomInfiniteScroll";
import UserTableContent from "../../UserDirectoryPage/UserSearch/UserTableContent";
import { setThirdPartyUsers } from "../../../data/redux/thirdParty/thirdPartyActions";
import { GET_USERS_TOTALS_BY_CONTRACTOR_COMPANY } from "../../../operations/queries/getUsersTotalsByContractorCompany";

const useStyles = makeStyles(() => ({
  table: {
    maxWidth: 500,
  },
  container: {
    marginLeft: 0,
    padding: 0,
  },
  userDirectoryTableContainer: {
    maxHeight: "calc(65vh - 140px)",
    height: "100%",
    minHeight: 300,
    overflow: "auto",
  },
  userTotalsTypography: {
    lineHeight: 2,
    fontSize: "1em"
  }
}));

const itemsPerPage = 15;

const ThirdPartyUsers = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const companyName = useSelector(state => state?.thirdParty?.get("thirdPartyData")?.name);
  const thirdPartyUsers = useSelector(state => state?.thirdParty?.get("thirdPartyUsers"));
  const [tasksCountStatus, setTasksCountStatus] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const [executeTotalSearch, { data: dataTotals, loading: totalLoading }] = useLazyQuery(GET_USERS_TOTALS_BY_CONTRACTOR_COMPANY, {
      onError: (error) => {
        handleError(error)(history);
      },
    },
  );

  const [executeSearch, { loading, data }] = useLazyQuery(GET_USERS_BY_CONTRACTOR_COMPANY, {
    onCompleted: (data) => {
      if (data) {
        if (pageCount > 0) {
          dispatch(setThirdPartyUsers([...thirdPartyUsers, ...data.get_users_by_contractor_company]));
        } else {
          dispatch(setThirdPartyUsers(data.get_users_by_contractor_company));
        }
        setTasksCountStatus(data.get_users_by_contractor_company?.length >= itemsPerPage);
      }
    },
    onError: (error) => {
      handleError(error)(history);
    },
  });
  useEffect(() => {
    if (!pageCount && data?.get_users_by_contractor_company?.length && !thirdPartyUsers?.length) {
      dispatch(setThirdPartyUsers(data.get_users_by_contractor_company));
    }
  });

  useEffect(() => {
    if (companyName) {
      executeTotalSearch({ variables: { search: companyName } });
    }
  }, [companyName]);

  useEffect(() => {
    if (companyName) {
      executeSearch({
        variables: {
          filters: {
            query: companyName,
            itemsPerPage,
            after: data?.get_users_by_contractor_company?.slice(-1)?.[0]?.id,
          },
        },
      });
    }
  }, [companyName, pageCount]);

  const handlePageChange = (page) => {
    if (!loading) {
      setPageCount(page);
    }
  };

  if (loading && !thirdPartyUsers?.length) {
    return <LoadingCircle size={30} />;
  }
  if (!thirdPartyUsers?.length) {
    return <NoResultsTypography />;
  }
  return (
    <>
      <Box style={{width: 180}}>
      {totalLoading
        ? <LoadingCircle size={20} />
        : (parseInt(dataTotals?.get_users_totals_by_contractor_company) > 0) &&
        <Typography className={classes.userTotalsTypography}>
          {dataTotals?.get_users_totals_by_contractor_company} Users Found
        </Typography>
      }
      </Box>
      <TableContainer id={"user-directory"} className={classes.userDirectoryTableContainer}>
        <CustomInfiniteScroll
          scrollableTarget="user-directory"
          dataLength={thirdPartyUsers?.length}
          next={() => handlePageChange(pageCount + 1)}
          hasMore={tasksCountStatus}
        >
          <UserTableContent users={thirdPartyUsers} />

        </CustomInfiniteScroll>

      </TableContainer>
    </>
  );
};

export default memo(ThirdPartyUsers);