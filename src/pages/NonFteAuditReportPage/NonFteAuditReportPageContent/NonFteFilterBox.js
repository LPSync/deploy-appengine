import React, {memo, useCallback, useMemo, useState} from "react";
import SelectTextField from "../../../components/inputs/SelectTextfield";
import FilterBlock from "../../../components/blocks/FilterBlock";
import {toSetArray} from "../../../data/helper/commonFunctions";
import CustomAutocomplete from "../../../components/inputs/CustomAutocomplete";

const NonFteFilterBox = ({nonFteData, filterOpen, setIsFilterApplied, setAuditData}) => {
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState("");
  const [managerFilter, setManagerFilter] = useState("");
  const [auditStatusFilter, setAuditStatusFilter] = useState("");

  const handleFilterQuery = () => {
    setIsFilterApplied(true);
    const filtered = nonFteData
      .filter((report) =>
        (!employeeTypeFilter?.length || report.employeeType === employeeTypeFilter) &&
        (!auditStatusFilter?.length || report.auditStatus === auditStatusFilter) &&
        (!managerFilter?.length || String(report.managerEmail)?.split("@")?.[0]?.includes(managerFilter))
      );
    setAuditData(filtered);
  };

  const handleClearFilters = useCallback(() => {
    setEmployeeTypeFilter("");
    setManagerFilter("");
    setAuditStatusFilter("");
    setIsFilterApplied(false);
    setAuditData(nonFteData);
  }, [nonFteData]);

  const employeeTypes = useMemo(() =>
    nonFteData?.map((data) => data.employeeType), [nonFteData]);

  const managers = useMemo(() =>
    toSetArray(nonFteData?.map((data) => String(data.managerEmail)?.split("@")?.[0]))?.sort(), [nonFteData]);

  const auditStatuses = useMemo(() =>
    nonFteData?.map((data) => data.auditStatus), [nonFteData]);

  return (
    <FilterBlock
      filterOpen={filterOpen}
      handleFilterQuery={handleFilterQuery}
      handleClearFilters={handleClearFilters}
    >
      <SelectTextField
        id="select-employee-type"
        label="Employee Type"
        value={employeeTypeFilter}
        onValueChange={setEmployeeTypeFilter}
        dataList={employeeTypes}
      />
      <CustomAutocomplete
        value={managerFilter}
        options={managers}
        getOptionLabel={(option) => String(option)?.toLowerCase()}
        onValueChange={setManagerFilter}
        textFieldProps={{
          id: "select-manager",
          label: "Manager"
        }}
      />
      <SelectTextField
        id="select-audit-status"
        label="Audit Status"
        value={auditStatusFilter}
        onValueChange={setAuditStatusFilter}
        dataList={auditStatuses}
      />
    </FilterBlock>
  )
}

export default memo(NonFteFilterBox);