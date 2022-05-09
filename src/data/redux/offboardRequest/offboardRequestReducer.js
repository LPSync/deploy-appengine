import {OrderedMap} from "immutable";
import OffboardRequestActonTypes from "./offboardRequestActonTypes";
import DataTransfer from "../../immutableEntities/offboardImmutables/DataTransfer";
import DeviceUnassign from "../../immutableEntities/offboardImmutables/DeviceUnassign";
import LicenseRemoval from "../../immutableEntities/offboardImmutables/LicenseRemoval";
import OffboardDetails from "../../immutableEntities/offboardImmutables/OffboardDetails";
import TaskScheduling from "../../immutableEntities/offboardImmutables/TaskScheduling";
import HrInformation from "../../immutableEntities/HrInformation";

const defaultState = OrderedMap({
  dataTransfer: new DataTransfer(),
  deviceUnassign: new DeviceUnassign(),
  licenseRemoval: new LicenseRemoval(),
  offboardDetails: new OffboardDetails(),
  taskScheduling: new TaskScheduling(),
  hrInformation: new HrInformation(),

  hrLocationLat: "",
  hrLocationLong: "",
  hrCity: "",

  scheduleTypeError: false,
  scheduleDateError: false,
  scheduleTimeZoneError: false,
  hrDateError: false,
  hrTimeZoneError: false,

  isWarningModalOpen: false,
  warningModalMessage: "",
  isButtonDisabled: false,
  isOffboarding: false,
  offboardingReason: "",
  isSelectedLoading: false,
  activeStep: 0,
});

const offboardRequestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OffboardRequestActonTypes.SET_SELECTED_OFFBOARD_USER:
      return state.setIn(
        ["offboardDetails", "selectedOffboardUser"],
        action.payload.selectedOffboardUser
      );
    case OffboardRequestActonTypes.SET_SELECTED_TRANSFER_USER:
      return state.setIn(
        ["dataTransfer", "selectedTransferUser"],
        action.payload.selectedTransferUser
      );
    case OffboardRequestActonTypes.SET_IS_DRIVE_CHECKED:
      return state.setIn(
        ["dataTransfer", "isDriveChecked"],
        action.payload.isDriveChecked
      );
    case OffboardRequestActonTypes.SET_IS_CALENDAR_CHECKED:
      return state.setIn(
        ["dataTransfer", "isCalendarChecked"],
        action.payload.isCalendarChecked
      );
    case OffboardRequestActonTypes.SET_IS_DATA_STUDIO_CHECKED:
      return state.setIn(
        ["dataTransfer", "isDataStudioChecked"],
        action.payload.isDataStudioChecked
      );
    case OffboardRequestActonTypes.SET_GOOGLE_USER_ALIASES:
      return state.setIn(
        ["dataTransfer", "googleUserAliases"],
        action.payload.googleUserAliases
      );
    case OffboardRequestActonTypes.SET_UNASSIGN_LICENSES:
      return state.setIn(
        ["licenseRemoval", "unassignLicenses"],
        action.payload.unassignLicenses
      );
    case OffboardRequestActonTypes.SET_JAMF_DEVICES_DATA:
      return state.setIn(
        ["deviceUnassign", "jamfDevicesData"],
        action.payload.jamfDevicesData
      );
    case OffboardRequestActonTypes.SET_GOOGLE_DEVICES_DATA:
      return state.setIn(
        ["deviceUnassign", "googleDevicesData"],
        action.payload.googleDevicesData
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_TYPE:
      return state.setIn(
        ["taskScheduling", "scheduleType"],
        action.payload.scheduleType
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_DATE:
      return state.setIn(
        ["taskScheduling", "scheduleDate"],
        action.payload.scheduleDate
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_EPOCH:
      return state.setIn(
        ["taskScheduling", "scheduleEpoch"],
        action.payload.scheduleEpoch
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_TIME_ZONE:
      return state.setIn(
        ["taskScheduling", "scheduleTimeZone"],
        action.payload.scheduleTimeZone
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_TIME_ZONE_ID:
      return state.setIn(
        ["taskScheduling", "scheduleTimeZoneId"],
        action.payload.scheduleTimeZoneId
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_LOCATION_LAT:
      return state.setIn(
        ["taskScheduling", "scheduleLocationLat"],
        action.payload.scheduleLocationLat
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_LOCATION_LONG:
      return state.setIn(
        ["taskScheduling", "scheduleLocationLong"],
        action.payload.scheduleLocationLong
      );
    case OffboardRequestActonTypes.SET_SCHEDULE_CITY:
      return state.setIn(
        ["taskScheduling", "scheduleCity"],
        action.payload.scheduleCity
      );
    case OffboardRequestActonTypes.SET_IS_NOTIFY_TERMINATIONS_CHECKED:
      return state.setIn(
        ["taskScheduling", "isNotifyTerminationsChecked"],
        action.payload.isNotifyTerminationsChecked
      );
    case OffboardRequestActonTypes.SET_IS_NOTIFY_TERMINATIONS_DISABLED:
      return state.setIn(
        ["taskScheduling", "isNotifyTerminationsDisabled"],
        action.payload.isNotifyTerminationsDisabled
      );
    case OffboardRequestActonTypes.SET_HR_TERMINATION_CODE:
      return state.setIn(
        ["hrInformation", "hrTerminationCode"],
        action.payload.hrTerminationCode
      );
    case OffboardRequestActonTypes.SET_HR_TERMINATION_TYPE:
      return state.setIn(
        ["hrInformation", "hrTerminationType"],
        action.payload.hrTerminationType
      );
    case OffboardRequestActonTypes.SET_HR_SELECTED_DATE:
      return state.setIn(
        ["hrInformation", "hrSelectedDate"],
        action.payload.hrSelectedDate
      );
    case OffboardRequestActonTypes.SET_HR_PAYROLL_EPOCH:
      return state.setIn(
        ["hrInformation", "hrPayrollEpoch"],
        action.payload.hrPayrollEpoch
      );
    case OffboardRequestActonTypes.SET_HR_TIMEZONE:
      return state.setIn(
        ["hrInformation", "hrTimeZone"],
        action.payload.hrTimeZone
      );
    case OffboardRequestActonTypes.SET_HR_TIMEZONE_ID:
      return state.setIn(
        ["hrInformation", "hrTimeZoneId"],
        action.payload.hrTimeZoneId
      );
    case OffboardRequestActonTypes.SET_HR_NOTES:
      return state.setIn(["hrInformation", "hrNotes"], action.payload.hrNotes);

    case OffboardRequestActonTypes.SET_IS_WARNING_MODAL_OPEN:
      return state.set("isWarningModalOpen", action.payload.isWarningModalOpen);

    case OffboardRequestActonTypes.SET_WARNING_MODAL_MESSAGE:
      return state.set("warningModalMessage", action.payload.warningModalMessage);

    case OffboardRequestActonTypes.SET_HR_LOCATION_LAT:
      return state.set("hrLocationLat", action.payload.hrLocationLat);
    case OffboardRequestActonTypes.SET_HR_LOCATION_LONG:
      return state.set("hrLocationLong", action.payload.hrLocationLong);
    case OffboardRequestActonTypes.SET_HR_CITY:
      return state.set("hrCity", action.payload.hrCity);

    case OffboardRequestActonTypes.SET_SCHEDULE_TYPE_ERROR:
      return state.set("scheduleTypeError", action.payload.scheduleTypeError);
    case OffboardRequestActonTypes.SET_SCHEDULE_DATE_ERROR:
      return state.set("scheduleDateError", action.payload.scheduleDateError);
    case OffboardRequestActonTypes.SET_HR_DATE_ERROR:
      return state.set("hrDateError", action.payload.hrDateError);
    case OffboardRequestActonTypes.SET_HR_TIME_ZONE_ERROR:
      return state.set("hrTimeZoneError", action.payload.hrTimeZoneError);

    case OffboardRequestActonTypes.SET_IS_BUTTON_DISABLED:
      return state.set("isButtonDisabled", action.payload.isButtonDisabled);
    case OffboardRequestActonTypes.SET_IS_OFFBOARDING:
      return state.set("isOffboarding", action.payload.isOffboarding);
    case OffboardRequestActonTypes.SET_OFFBOARDING_REASON:
      return state.set("offboardingReason", action.payload.offboardingReason);
    case OffboardRequestActonTypes.SET_IS_SELECTED_LOADING:
      return state.set("isSelectedLoading", action.payload.isSelectedLoading);
    case OffboardRequestActonTypes.SET_ACTIVE_STEP:
      return state.set("activeStep", action.payload.activeStep);
    case OffboardRequestActonTypes.SET_DEFAULT_STATE:
      return defaultState;
    default:
      return state;
  }
};

export default offboardRequestReducer;
