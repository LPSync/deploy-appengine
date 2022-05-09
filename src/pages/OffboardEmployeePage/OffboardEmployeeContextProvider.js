import React, { createContext, useState } from "react";

export const OffboardEmployeeContext = createContext();

const OffboardEmployeeContextProvider = ({ children }) => {
  const [isSelectedLoading, setIsSelectedLoading] = useState(false);
  const [selectedTransferUser, setSelectedTransferUser] = useState();
  const [offboardingType, setOffboardingType] = useState("");
  const [sendTerminationsEmail, setSendTerminationsEmail] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [taskTimeZone, setTaskTimeZone] = useState("");
  const [taskTimeZoneId, setTaskTimeZoneId] = useState("");
  const [checkedDrive, setCheckedDrive] = useState(true);
  const [checkedCalendar, setCheckedCalendar] = useState(true);
  const [hrSelectedDate, setHrSelectedDate] = useState("");
  const [hrNotes, setHrNotes] = useState("");
  const [hrTerminationCode, setHrTerminationCode] = useState("");
  const [hrTerminationType, setHrTerminationType] = useState("");
  const [offboardingTypeError, setOffboardingTypeError] = useState(false);
  const [selectedDateError, setSelectedDateError] = useState(false);
  const [taskTimeZoneError, setTaskTimeZoneError] = useState(false);
  const [hrDateError, setHrDateError] = useState(false);
  const [hrTimeZoneError, setHrTimeZoneError] = useState(false);
  const [transferUserError, setTransferUserError] = useState(false);
  const [jamfDevicesData, setJamfDevicesData] = useState([]);
  const [googleDevicesData, setGoogleDevicesData] = useState([]);
  const [googleUserAliases, setGoogleUserAliases] = useState([]);
  const [allUserAliases, setAllUserAliases] = useState([]);
  const [isOffboarding, setIsOffboarding] = useState(false);
  const [offboardingReason, setOffboardingReason] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [taskLocationLat, setTaskLocationLat] = useState();
  const [taskLocationLong, setTaskLocationLong] = useState();
  const [taskScheduleEpoch, setTaskScheduleEpoch] = useState();
  const [hrLocationLat, setHrLocationLat] = useState();
  const [hrLocationLong, setHrLocationLong] = useState();
  const [hrPayrollEpoch, setHrPayrollEpoch] = useState();
  const [hrTimeZone, setHrTimeZone] = useState("");
  const [hrTimeZoneId, setHrTimeZoneId] = useState("");
  const [unassignLicenses, setUnassignLicenses] = useState([]);

  return (
    <OffboardEmployeeContext.Provider
      value={{
        isSelectedLoading,
        setIsSelectedLoading,
        selectedTransferUser,
        setSelectedTransferUser,
        offboardingType,
        setOffboardingType,
        sendTerminationsEmail,
        setSendTerminationsEmail,
        selectedDate,
        setSelectedDate,
        taskTimeZone,
        setTaskTimeZone,
        checkedDrive,
        setCheckedDrive,
        checkedCalendar,
        setCheckedCalendar,
        hrSelectedDate,
        setHrSelectedDate,
        hrNotes,
        setHrNotes,
        hrTerminationCode,
        setHrTerminationCode,
        hrTerminationType,
        setHrTerminationType,
        offboardingTypeError,
        setOffboardingTypeError,
        selectedDateError,
        setSelectedDateError,
        hrDateError,
        setHrDateError,
        hrTimeZoneError,
        setHrTimeZoneError,
        taskTimeZoneError,
        setTaskTimeZoneError,
        transferUserError,
        setTransferUserError,
        jamfDevicesData,
        setJamfDevicesData,
        googleDevicesData,
        setGoogleDevicesData,
        googleUserAliases,
        setGoogleUserAliases,
        taskTimeZoneId,
        setTaskTimeZoneId,
        allUserAliases,
        setAllUserAliases,
        isOffboarding,
        setIsOffboarding,
        offboardingReason,
        setOffboardingReason,
        isBtnDisabled,
        setIsBtnDisabled,
        taskLocationLat,
        setTaskLocationLat,
        taskLocationLong,
        setTaskLocationLong,
        taskScheduleEpoch,
        setTaskScheduleEpoch,
        hrLocationLat,
        setHrLocationLat,
        hrLocationLong,
        setHrLocationLong,
        hrPayrollEpoch,
        setHrPayrollEpoch,
        hrTimeZone,
        setHrTimeZone,
        hrTimeZoneId,
        setHrTimeZoneId,
        unassignLicenses,
        setUnassignLicenses,
      }}
    >
      {children}
    </OffboardEmployeeContext.Provider>
  );
};

export default OffboardEmployeeContextProvider;
