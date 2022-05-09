import React, {memo, useState} from "react";
import SelectTextField from "../../../components/inputs/SelectTextfield";
import {connect} from "react-redux";
import {setAllThirdParties, setFilters, setSearchQuery} from "../../../data/redux/thirdParty/thirdPartyActions";
import {getBooleanStatus, ThirdPartyStatuses} from "../../../data/constants/ThirdPartyStatuses";
import FilterBlock from "../../../components/blocks/FilterBlock";

const ThirdPartyDirectoryFilterBlock = ({
  filters,
  filterOpen,
  allThirdParties,
  setFilters,
  setAllThirdParties,
  setIsFilterApplied,
  setSearchQuery,
}) => {
  const [thirdPartyTypeFilter, setThirdPartyTypeFilter] = useState("");
  const [thirdPartyOwnerFilter, setThirdPartyOwnerFilter] = useState("");
  const [thirdPartyStatusFilter, setThirdPartyStatusFilter] = useState("");

  const handleFilterQuery = () => {
    const newFilters = {
      ...filters,
      vendorType: thirdPartyTypeFilter.toLowerCase(),
      status: getBooleanStatus(thirdPartyStatusFilter),
      owner: thirdPartyOwnerFilter.toLowerCase(),
      pageCount: 0,
    };
    setFilters(newFilters);
    setAllThirdParties([]);
    setIsFilterApplied(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setThirdPartyTypeFilter("");
    setThirdPartyOwnerFilter("");
    setThirdPartyStatusFilter("");
    setAllThirdParties(allThirdParties);
    setIsFilterApplied(false);
  };

  return (
    <FilterBlock
      filterOpen={filterOpen}
      handleFilterQuery={handleFilterQuery}
      handleClearFilters={handleClearFilters}
    >
      <SelectTextField
        id="select-third-party-type"
        label="Third Party Type"
        value={thirdPartyTypeFilter}
        onValueChange={setThirdPartyTypeFilter}
        dataList={allThirdParties?.map((thirdParty) => thirdParty?.type)}
      />
      <SelectTextField
        id="select-thirdParty-owner"
        label="ThirdParty Owner"
        value={thirdPartyOwnerFilter}
        onValueChange={setThirdPartyOwnerFilter}
        dataList={allThirdParties?.map((thirdParty) => thirdParty?.owner)}
      />
      <SelectTextField
        id="select-thirdParty-status"
        label="ThirdParty Status"
        value={thirdPartyStatusFilter}
        onValueChange={setThirdPartyStatusFilter}
        dataList={Object.values(ThirdPartyStatuses)}
      />
    </FilterBlock>
  );
};

export default connect(state => ({
  filters: state.thirdParty.get("filters"),
  allThirdParties: state.thirdParty.get("allThirdParties"),
}), {setAllThirdParties, setFilters, setSearchQuery})(memo(ThirdPartyDirectoryFilterBlock));
