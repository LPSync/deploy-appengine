import ThirdPartyActonTypes from "./thirdPartyActonTypes";

export const setAllThirdParties = (allThirdParties) => ({
  type: ThirdPartyActonTypes.SET_ALL_THIRD_PARTIES,
  payload: {allThirdParties},
});

export const setSearchQuery = (searchQuery) => ({
  type: ThirdPartyActonTypes.SET_SEARCH_QUERY,
  payload: {searchQuery},
});

export const setThirdPartyData = (thirdPartyData) => ({
  type: ThirdPartyActonTypes.SET_THIRD_PARTY_DATA,
  payload: {thirdPartyData},
});

export const setFilters = (filters) => ({
  type: ThirdPartyActonTypes.SET_FILTERS,
  payload: {filters},
});

export const setThirdPartyUsers = (thirdPartyUsers) => ({
  type: ThirdPartyActonTypes.SET_THIRD_PARTY_USERS,
  payload: {thirdPartyUsers},
});
