import { OrderedMap } from "immutable";
import ThirdPartyActonTypes from "./thirdPartyActonTypes";

const defaultState = OrderedMap({
  allThirdParties: [],
  thirdPartyData: null,
  filters: {
    pageCount: 0,
    itemsPerPage: 25,
    vendorType: '',
    status: undefined,
    owner: '',
    // query: "" gets from searchQuery
  },
  searchQuery: '',
  thirdPartyUsers: []
});

const thirdPartyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ThirdPartyActonTypes.SET_ALL_THIRD_PARTIES:
      return state.set("allThirdParties", action.payload.allThirdParties);
    case ThirdPartyActonTypes.SET_SEARCH_QUERY:
      return state.set("searchQuery", action.payload.searchQuery);
    case ThirdPartyActonTypes.SET_THIRD_PARTY_DATA:
      return state.set("thirdPartyData", action.payload.thirdPartyData);
    case ThirdPartyActonTypes.SET_FILTERS:
      return state.set("filters", action.payload.filters);
    case ThirdPartyActonTypes.SET_THIRD_PARTY_USERS:
      return state.set("thirdPartyUsers", action.payload.thirdPartyUsers);

    default:
      return state;
  }
};

export default thirdPartyReducer;
