import OffboardRequestActonTypes from "./offboardRequestActonTypes";

export const setSelectedOffboardUser = (selectedOffboardUser) => ({
  type: OffboardRequestActonTypes.SET_SELECTED_OFFBOARD_USER,
  payload: {selectedOffboardUser},
});

export const setSelectedTransferUser = (selectedTransferUser) => ({
  type: OffboardRequestActonTypes.SET_SELECTED_TRANSFER_USER,
  payload: {selectedTransferUser},
});

export const setIsDriveChecked = (isDriveChecked) => ({
  type: OffboardRequestActonTypes.SET_IS_DRIVE_CHECKED,
  payload: {isDriveChecked},
});

export const setIsCalendarChecked = (isCalendarChecked) => ({
  type: OffboardRequestActonTypes.SET_IS_CALENDAR_CHECKED,
  payload: {isCalendarChecked},
});

export const setIsDataStudioChecked = (isDataStudioChecked) => ({
  type: OffboardRequestActonTypes.SET_IS_DATA_STUDIO_CHECKED,
  payload: {isDataStudioChecked},
});

export const setGoogleUserAliases = (googleUserAliases) => ({
  type: OffboardRequestActonTypes.SET_GOOGLE_USER_ALIASES,
  payload: {googleUserAliases},
});

export const setUnassignLicenses = (unassignLicenses) => ({
  type: OffboardRequestActonTypes.SET_UNASSIGN_LICENSES,
  payload: {unassignLicenses},
});

export const setJamfDevicesData = (jamfDevicesData) => ({
  type: OffboardRequestActonTypes.SET_JAMF_DEVICES_DATA,
  payload: {jamfDevicesData},
});

export const setGoogleDevicesData = (googleDevicesData) => ({
  type: OffboardRequestActonTypes.SET_GOOGLE_DEVICES_DATA,
  payload: {googleDevicesData},
});

export const setScheduleType = (scheduleType) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_TYPE,
  payload: {scheduleType},
});

export const setScheduleDate = (scheduleDate) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_DATE,
  payload: {scheduleDate},
});

export const setScheduleEpoch = (scheduleEpoch) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_EPOCH,
  payload: {scheduleEpoch},
});

export const setScheduleTimeZone = (scheduleTimeZone) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_TIME_ZONE,
  payload: {scheduleTimeZone},
});

export const setScheduleTimeZoneId = (scheduleTimeZoneId) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_TIME_ZONE_ID,
  payload: {scheduleTimeZoneId},
});

export const setScheduleLocationLong = (scheduleLocationLat) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_LOCATION_LAT,
  payload: {scheduleLocationLat},
});
export const setScheduleLocationLat = (scheduleLocationLong) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_LOCATION_LONG,
  payload: {scheduleLocationLong},
});
export const setScheduleCity = (scheduleCity) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_CITY,
  payload: {scheduleCity},
});

export const setIsNotifyTerminationsChecked = (
  isNotifyTerminationsChecked
) => ({
  type: OffboardRequestActonTypes.SET_IS_NOTIFY_TERMINATIONS_CHECKED,
  payload: {isNotifyTerminationsChecked},
});

export const setIsNotifyTerminationsDisabled = (
  isNotifyTerminationsDisabled
) => ({
  type: OffboardRequestActonTypes.SET_IS_NOTIFY_TERMINATIONS_DISABLED,
  payload: {isNotifyTerminationsDisabled},
});

export const setHrTerminationCode = (hrTerminationCode) => ({
  type: OffboardRequestActonTypes.SET_HR_TERMINATION_CODE,
  payload: {hrTerminationCode},
});

export const setHrTerminationType = (hrTerminationType) => ({
  type: OffboardRequestActonTypes.SET_HR_TERMINATION_TYPE,
  payload: {hrTerminationType},
});

export const setHrSelectedDate = (hrSelectedDate) => ({
  type: OffboardRequestActonTypes.SET_HR_SELECTED_DATE,
  payload: {hrSelectedDate},
});

export const setHrPayrollEpoch = (hrPayrollEpoch) => ({
  type: OffboardRequestActonTypes.SET_HR_PAYROLL_EPOCH,
  payload: {hrPayrollEpoch},
});

export const setHrTimeZone = (hrTimeZone) => ({
  type: OffboardRequestActonTypes.SET_HR_TIMEZONE,
  payload: {hrTimeZone},
});

export const setHrTimeZoneId = (hrTimeZoneId) => ({
  type: OffboardRequestActonTypes.SET_HR_TIMEZONE_ID,
  payload: {hrTimeZoneId},
});

export const setHrNotes = (hrNotes) => ({
  type: OffboardRequestActonTypes.SET_HR_NOTES,
  payload: {hrNotes},
});

export const setHrLocationLong = (hrLocationLat) => ({
  type: OffboardRequestActonTypes.SET_HR_LOCATION_LAT,
  payload: {hrLocationLat},
});
export const setHrLocationLat = (hrLocationLong) => ({
  type: OffboardRequestActonTypes.SET_HR_LOCATION_LONG,
  payload: {hrLocationLong},
});
export const setHrCity = (hrCity) => ({
  type: OffboardRequestActonTypes.SET_HR_CITY,
  payload: {hrCity},
});

export const setScheduleTypeError = (scheduleTypeError) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_TYPE_ERROR,
  payload: {scheduleTypeError},
});

export const setScheduleDateError = (scheduleDateError) => ({
  type: OffboardRequestActonTypes.SET_SCHEDULE_DATE_ERROR,
  payload: {scheduleDateError},
});

export const setScheduleTimeZoneError = (scheduleTimeZoneError) => ({
  type: OffboardRequestActonTypes.SET_HR_DATE_ERROR,
  payload: {scheduleTimeZoneError},
});

export const setHrDateError = (hrDateError) => ({
  type: OffboardRequestActonTypes.SET_HR_DATE_ERROR,
  payload: {hrDateError},
});

export const setHrTimeZoneError = (hrTimeZoneError) => ({
  type: OffboardRequestActonTypes.SET_HR_TIME_ZONE_ERROR,
  payload: {hrTimeZoneError},
});

export const setIsWarningModalOpen = (isWarningModalOpen) => ({
  type: OffboardRequestActonTypes.SET_IS_WARNING_MODAL_OPEN,
  payload: {isWarningModalOpen},
});

export const setWarningModalMessage = (warningModalMessage) => ({
  type: OffboardRequestActonTypes.SET_WARNING_MODAL_MESSAGE,
  payload: {warningModalMessage},
});

export const setIsButtonDisabled = (isButtonDisabled) => ({
  type: OffboardRequestActonTypes.SET_IS_BUTTON_DISABLED,
  payload: {isButtonDisabled},
});

export const setIsOffboarding = (isOffboarding) => ({
  type: OffboardRequestActonTypes.SET_IS_OFFBOARDING,
  payload: {isOffboarding},
});

export const setOffboardingReason = (offboardingReason) => ({
  type: OffboardRequestActonTypes.SET_OFFBOARDING_REASON,
  payload: {offboardingReason},
});

export const setIsSelectedLoading = (isSelectedLoading) => ({
  type: OffboardRequestActonTypes.SET_IS_SELECTED_LOADING,
  payload: {isSelectedLoading},
});

export const setActiveStep = (activeStep) => ({
  type: OffboardRequestActonTypes.SET_ACTIVE_STEP,
  payload: {activeStep},
});

export const setDefaultState = () => ({
  type: OffboardRequestActonTypes.SET_DEFAULT_STATE,
});
