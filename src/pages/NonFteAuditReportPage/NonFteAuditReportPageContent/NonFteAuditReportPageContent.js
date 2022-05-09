import React, {memo, useCallback, useContext, useEffect} from "react";
import {useQuery} from "@apollo/client";
import {Box} from "@material-ui/core";
import {GET_REPORTING_NONFTE_AUDITS} from "../../../operations/queries/getReportingNonfteAudits";
import {GET_ALL_NONFTE_OKTA_USERS} from "../../../operations/queries/getAllNonfteOktaUsers";
import {NonFteAuditReportContext} from "../NonFteAuditReportContextProvider";
import NonFteCountBox from "./NonFteCountBox";
import NonFteTable from "./NonFteTable";
import NonFteSearchFilterBox from "./NonFteSearchFilterBox";
import LoadingCircle from "../../../components/circularProgress/LoadingCircle";
import PaperCardWrapper from "../../../components/PaperCardWrapper";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";

const AuditReportPageContent = () => {
  const history = useHistory();
  const {
    allAuditsData,
    nonFteData,
    setNonFteData,
    setAllAuditsData,
    setOffboardingRequiredTotal,
    setNonFteTotal,
    setEmployeeTypeIncorrectTotal,
    setDirectReportKnownTotal,
    setDirectReportUnknownTotal,
    setDirectReportCorrectTotal,
    setAuditData,
  } = useContext(NonFteAuditReportContext);

  const {data: nonfteAuditsData, refetch} = useQuery(
    GET_REPORTING_NONFTE_AUDITS,
    {
      onCompleted: (data) => {
        const allData = data.get_reporting_nonfte_audits;
        setAllAuditsData(allData);
        countTotals(allData);
      },
      onError: (error) => handleError(error)(history),
    }
  );

  const {data: nonfteUsersData} = useQuery(GET_ALL_NONFTE_OKTA_USERS, {
    onCompleted: (data) => {
      setNonFteTotal(data.get_all_nonfte_okta_users?.length);
    },
    onError: (error) => handleError(error)(history),
  });

  const filterData = useCallback(
    (auditsData, usersData) => {
      const newData = [];

      usersData?.forEach((nonFte) => {
        const isAudited = auditsData.some(
          (audit) => audit.auditUserEmail === nonFte.email
        );

        if (isAudited) {
          const auditInfo = auditsData.filter((audit) =>
            audit.auditUserEmail.includes(nonFte.email)
          );

          const insert = {
            auditStatus: auditInfo[0].auditUserStatus,
          };
          newData.push({...nonFte, ...insert});
        } else {
          const insert = {
            auditStatus: "Not audited",
          };
          newData.push({...nonFte, ...insert});
        }
      });

      setNonFteData(newData);
      setAuditData(newData);
    },
    [nonfteUsersData, setAuditData, setNonFteData]
  );

  useEffect(() => {
    if (nonfteAuditsData && nonfteUsersData) {
      filterData(
        nonfteAuditsData?.get_reporting_nonfte_audits,
        nonfteUsersData?.get_all_nonfte_okta_users
      );
    }
  }, [nonfteUsersData, nonfteAuditsData, filterData]);

  const countTotals = (data) => {
    setOffboardingRequiredTotal(
      data?.filter(
        (audit) => audit.auditUserStatus === "User needs to be offboarded"
      ).length
    );
    setDirectReportCorrectTotal(
      data?.filter(
        (audit) => audit.auditUserStatus === "Reports to me - no change"
      ).length
    );
    setEmployeeTypeIncorrectTotal(
      data?.filter(
        (audit) => audit.auditUserStatus === "User is a full time employee"
      ).length
    );
    setDirectReportKnownTotal(
      data?.filter(
        (audit) =>
          audit.auditUserStatus === "Not reporting to me - manager known"
      ).length
    );
    setDirectReportUnknownTotal(
      data?.filter(
        (audit) =>
          audit.auditUserStatus === "Not reporting to me - manager unknown"
      ).length
    );
  };

  return (
    <>
      {allAuditsData && nonfteUsersData ? (
        <Box mt={3} minWidth={1050}>
          <PaperCardWrapper>
            {nonFteData?.length > 0 && (
              <>
                <NonFteCountBox />
                <NonFteSearchFilterBox refetch={refetch} />
                <NonFteTable />
              </>
            )}
          </PaperCardWrapper>
        </Box>
      ) : (
        <LoadingCircle />
      )}
    </>
  );
};

export default memo(AuditReportPageContent);
