import React, { createContext, useState } from "react";

export const NonFteAuditReportContext = createContext();

const NonFteAuditReportContextProvider = ({ children }) => {
  const [allAuditsData, setAllAuditsData] = useState();
  const [nonFteTotal, setNonFteTotal] = useState(0);
  const [nonFteData, setNonFteData] = useState([]);
  const [offboardingRequiredTotal, setOffboardingRequiredTotal] = useState(0);
  const [employeeTypeIncorrectTotal, setEmployeeTypeIncorrectTotal] = useState(
    0
  );
  const [directReportKnownTotal, setDirectReportKnownTotal] = useState(0);
  const [directReportUnknownTotal, setDirectReportUnknownTotal] = useState(0);
  const [directReportCorrectTotal, setDirectReportCorrectTotal] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [auditData, setAuditData] = useState();

  return (
    <NonFteAuditReportContext.Provider
      value={{
        allAuditsData,
        setAllAuditsData,
        nonFteTotal,
        setNonFteTotal,
        nonFteData,
        setNonFteData,
        offboardingRequiredTotal,
        setOffboardingRequiredTotal,
        employeeTypeIncorrectTotal,
        setEmployeeTypeIncorrectTotal,
        directReportKnownTotal,
        setDirectReportKnownTotal,
        directReportUnknownTotal,
        setDirectReportUnknownTotal,
        directReportCorrectTotal,
        setDirectReportCorrectTotal,
        isDataLoading,
        setIsDataLoading,
        auditData,
        setAuditData,
      }}
    >
      {children}
    </NonFteAuditReportContext.Provider>
  );
};

export default NonFteAuditReportContextProvider;
