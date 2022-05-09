import {typesWithPrefix} from "../../helper/helpers";

const ThirdPartyActonTypes = {
  SET_ALL_THIRD_PARTIES: "SET_ALL_THIRD_PARTIES",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_THIRD_PARTY_DATA: "SET_THIRD_PARTY_DATA",
  SET_FILTERS: "SET_FILTERS",
  SET_THIRD_PARTY_USERS: "SET_THIRD_PARTY_USERS"
};

export default typesWithPrefix("THIRD_PARTY_")(
  ThirdPartyActonTypes
);
