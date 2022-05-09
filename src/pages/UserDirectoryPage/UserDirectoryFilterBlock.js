import React, {memo, useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {setUsersData} from "../../data/redux/userDirectory/userDirectoryActions";
import FilterBlock from "../../components/blocks/FilterBlock";
import SelectTextField from "../../components/inputs/SelectTextfield";
import CustomAutocomplete from "../../components/inputs/CustomAutocomplete";
import {toSetArray} from "../../data/helper/commonFunctions";

const UserDirectoryFilterBlock = ({filterOpen, data, setIsFilterApplied}) => {
  const dispatch = useDispatch();
  const [empTypeFilter, setEmpTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleFilterQuery = () => {
    const filtered = data.search_user_directory?.filter(
      (user) =>
        (!empTypeFilter || user.profile.employeeType === empTypeFilter) &&
        (!locationFilter || String(user.profile.location)?.toLowerCase()?.includes(locationFilter?.toLowerCase())) &&
        (!departmentFilter || String(user.profile.department)?.toLowerCase()?.includes(departmentFilter?.toLowerCase())),
    );
    dispatch(setUsersData(filtered));
    setIsFilterApplied(true);
  };

  const handleClearFilters = useCallback(() => {
    setEmpTypeFilter("");
    setLocationFilter("");
    setDepartmentFilter("");
    dispatch(setUsersData(data.search_user_directory));
    setIsFilterApplied(false);
  }, [data, setIsFilterApplied]);

  const employeeTypes = useMemo(() =>
    data?.search_user_directory?.map((user) => user.profile.employeeType), [data]);

  const locations = useMemo(() =>
    toSetArray(data?.search_user_directory?.map((user) => String(user.profile.location)))?.sort(), [data]);

  const departments = useMemo(() =>
    toSetArray(data?.search_user_directory?.map((user) => String(user.profile.department)))?.sort(), [data]);

  return (
    <FilterBlock
      filterOpen={filterOpen}
      handleFilterQuery={handleFilterQuery}
      handleClearFilters={handleClearFilters}
    >
      <SelectTextField
        id="select-employee-type"
        label="Employee Type"
        value={empTypeFilter}
        onValueChange={setEmpTypeFilter}
        dataList={employeeTypes}
      />
      <CustomAutocomplete
        value={locationFilter}
        onValueChange={setLocationFilter}
        options={locations}
        getOptionLabel={(option) => String(option)}
        textFieldProps={{
          id: "select-location",
          label: "Location"
        }}
      />
      <CustomAutocomplete
        value={departmentFilter}
        onValueChange={setDepartmentFilter}
        options={departments}
        getOptionLabel={(option) => String(option)}
        textFieldProps={{
          id: "select-department",
          label: "Department"
        }}
      />
    </FilterBlock>
  );
};

export default memo(UserDirectoryFilterBlock);
