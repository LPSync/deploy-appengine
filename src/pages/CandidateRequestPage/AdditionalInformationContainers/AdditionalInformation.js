import React, {memo} from "react";
import DeviceSelectContainer from "./DeviceSelectContainer";
import GoogleAccountCheckContainer from "./GoogleAccountCheckContainer";

const AdditionalInformation = () => {
  return (
    <>
      <GoogleAccountCheckContainer />
      <DeviceSelectContainer />
    </>
  );
};

export default memo(AdditionalInformation);
