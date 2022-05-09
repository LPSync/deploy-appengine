import React, {memo} from "react";
import ThirdPartyDirectoryTable from "./ThirdPartyDirectoryTable";
import {useLazyQuery} from "@apollo/client";
import {GET_VIEWED_THIRD_PARTIES} from "../../../operations/queries/getViewedThirdParties";
import {GET_OWNED_THIRD_PARTIES} from "../../../operations/queries/getOwnedThirdParties";

const useGetOwnedThirdParties = (config, handleComplete) => useLazyQuery(GET_OWNED_THIRD_PARTIES, {
  fetchPolicy: "cache-and-network",
  ...config,
  onCompleted: (data) => {
    handleComplete(data?.get_owned_third_parties);
  },
});

const useRecentlyViewedThirdParties = (config, handleComplete) => useLazyQuery(GET_VIEWED_THIRD_PARTIES, {
  ...config,
  onCompleted: (data) => {
    handleComplete(data?.get_viewed_third_parties);
  },
});

const ThirdPartyDirectoryInfo = () => {
  return (
    <>
      <ThirdPartyDirectoryTable
        title="Recently Viewed Third Parties"
        executeFunc={useRecentlyViewedThirdParties}
      />
      <ThirdPartyDirectoryTable
        title="Third Parties You Own"
        executeFunc={useGetOwnedThirdParties}
      />
    </>
  );
};
export default memo(ThirdPartyDirectoryInfo);