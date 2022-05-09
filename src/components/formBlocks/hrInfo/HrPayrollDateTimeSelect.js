import React, {memo, useEffect} from "react";
import GridInputWrapper from "../../requestFormWrapper/GridInputWrapper";
import {useLazyQuery} from "@apollo/client";
import {GET_TIME_ZONE_INFO} from "../../../operations/queries/getTimeZoneInfo";
import handleError from "../../../data/handleError";
import {useHistory} from "react-router-dom";

const HrPayrollDateTimeSelect = ({
  hrLocationLat,
  hrLocationLong,
  hrSelectedDate,
  setHrPayrollEpoch,
  children,
}) => {
  const history = useHistory();

  const [executeQuery] = useLazyQuery(GET_TIME_ZONE_INFO, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setHrPayrollEpoch(data?.get_time_zone_info?.epochTime);
    },
    onError: (error) => handleError(error)(history),
  });

  useEffect(() => {
    if (hrSelectedDate && hrLocationLat && hrLocationLong) {
      executeQuery({
        variables: {
          latitude: hrLocationLat,
          longitude: hrLocationLong,
          date: hrSelectedDate,
        },
      });
    }
  }, [hrSelectedDate, hrLocationLat, hrLocationLong, executeQuery]);

  return (
    <GridInputWrapper
      title="End payroll date &amp; time"
      gridInput={{container: true}}
    >
      {children}
    </GridInputWrapper>
  );
};

export default memo(HrPayrollDateTimeSelect);
