import TaskManagerHrInfoActonTypes from "./taskManagerHrInfoActonTypes";

export const clearHrInformation = () => ({
  type: TaskManagerHrInfoActonTypes.CLEAR_HR_INFORMATION,
});

export const setHrInformation = (hrInformation) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_INFORMATION,
  payload: { hrInformation },
});

export const setHrTerminationCode = (hrTerminationCode) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_CODE,
  payload: { hrTerminationCode },
});

export const setHrTerminationType = (hrTerminationType) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_TYPE,
  payload: { hrTerminationType },
});

export const setHrSelectedDate = (hrSelectedDate) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_SELECTED_DATE,
  payload: { hrSelectedDate },
});

export const setHrPayrollEpoch = (hrPayrollEpoch) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_PAYROLL_EPOCH,
  payload: { hrPayrollEpoch },
});

export const setHrTimeZone = (hrTimeZone) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TIMEZONE,
  payload: { hrTimeZone },
});

export const setHrTimeZoneId = (hrTimeZoneId) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TIMEZONE_ID,
  payload: { hrTimeZoneId },
});

export const setHrNotes = (hrNotes) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_NOTES,
  payload: { hrNotes },
});

export const setHrLocationLong = (hrLocationLat) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_LOCATION_LAT,
  payload: { hrLocationLat },
});
export const setHrLocationLat = (hrLocationLong) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_LOCATION_LONG,
  payload: { hrLocationLong },
});
export const setHrCity = (hrCity) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_CITY,
  payload: { hrCity },
});

export const setHrTerminationCodeError = (hrTerminationCodeError) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_CODE_ERROR,
  payload: { hrTerminationCodeError },
})

export const setHrTerminationTypeError = (hrTerminationTypeError) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_TYPE_ERROR,
  payload: { hrTerminationTypeError },
})

export const setHrDateError = (hrDateError) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_DATE_ERROR,
  payload: { hrDateError },
});
export const setHrTimeZoneError = (hrTimeZoneError) => ({
  type: TaskManagerHrInfoActonTypes.SET_HR_TIME_ZONE_ERROR,
  payload: { hrTimeZoneError },
});