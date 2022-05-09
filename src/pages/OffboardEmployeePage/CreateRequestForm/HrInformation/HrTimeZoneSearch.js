import React, { memo, useContext } from "react";
import { OffboardEmployeeContext } from "../../OffboardEmployeeContextProvider";
import TimeZoneSearch from "../../../../components/formBlocks/hrInfo/TimeZoneSearch";

const HrTimeZoneSearch = ({ setCity, setTimeZone, setTimeZoneId }) => {
  const { setHrLocationLat, setHrLocationLong, hrTimeZoneError } = useContext(
    OffboardEmployeeContext
  );

  return (
    <TimeZoneSearch
      setHrCity={setCity}
      setHrTimeZone={setTimeZone}
      setHrTimeZoneId={setTimeZoneId}
      setHrLocationLat={setHrLocationLat}
      setHrLocationLong={setHrLocationLong}
      hrTimeZoneError={hrTimeZoneError}
      width={300}
    />
  );
}

export default memo(HrTimeZoneSearch);