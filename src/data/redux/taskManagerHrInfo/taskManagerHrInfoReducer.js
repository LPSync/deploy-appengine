import {OrderedMap} from "immutable";
import TaskManagerHrInfoActonTypes from "./taskManagerHrInfoActonTypes";
import HrInformation from "../../immutableEntities/HrInformation";

const defaultState = OrderedMap({
  hrInformation: new HrInformation(),
  hrDateError: "",
  hrTimeZoneError: "",
  hrTerminationCodeError: "",
  hrTerminationTypeError: "",

  hrLocationLat: "",
  hrLocationLong: "",
  hrCity: "",
});

const taskManagerHrInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TaskManagerHrInfoActonTypes.CLEAR_HR_INFORMATION:
      return defaultState;

    case TaskManagerHrInfoActonTypes.SET_HR_INFORMATION:
      return state.set(
        "hrInformation",
        action.payload.hrInformation
          ? new HrInformation(action.payload.hrInformation)
          : new HrInformation()
      );

    case TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_CODE:
      return state.setIn(
        ["hrInformation", "hrTerminationCode"],
        action.payload.hrTerminationCode
      );
    case TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_TYPE:
      return state.setIn(
        ["hrInformation", "hrTerminationType"],
        action.payload.hrTerminationType
      );
    case TaskManagerHrInfoActonTypes.SET_HR_SELECTED_DATE:
      return state.setIn(
        ["hrInformation", "hrSelectedDate"],
        action.payload.hrSelectedDate
      );
    case TaskManagerHrInfoActonTypes.SET_HR_PAYROLL_EPOCH:
      return state.setIn(
        ["hrInformation", "hrPayrollEpoch"],
        action.payload.hrPayrollEpoch
      );
    case TaskManagerHrInfoActonTypes.SET_HR_TIMEZONE:
      return state.setIn(
        ["hrInformation", "hrTimeZone"],
        action.payload.hrTimeZone
      );
    case TaskManagerHrInfoActonTypes.SET_HR_TIMEZONE_ID:
      return state.setIn(
        ["hrInformation", "hrTimeZoneId"],
        action.payload.hrTimeZoneId
      );
    case TaskManagerHrInfoActonTypes.SET_HR_NOTES:
      return state.setIn(["hrInformation", "hrNotes"], action.payload.hrNotes);

    case TaskManagerHrInfoActonTypes.SET_HR_LOCATION_LAT:
      return state.set("hrLocationLat", action.payload.hrLocationLat);
    case TaskManagerHrInfoActonTypes.SET_HR_LOCATION_LONG:
      return state.set("hrLocationLong", action.payload.hrLocationLong);
    case TaskManagerHrInfoActonTypes.SET_HR_CITY:
      return state.set("hrCity", action.payload.hrCity);

    case TaskManagerHrInfoActonTypes.SET_HR_DATE_ERROR:
      return state.set("hrDateError", action.payload.hrDateError);
    case TaskManagerHrInfoActonTypes.SET_HR_TIME_ZONE_ERROR:
      return state.set("hrTimeZoneError", action.payload.hrTimeZoneError);
    case TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_CODE_ERROR:
      return state.set(
        "hrTerminationCodeError",
        action.payload.hrTerminationCodeError
      );
    case TaskManagerHrInfoActonTypes.SET_HR_TERMINATION_TYPE_ERROR:
      return state.set(
        "hrTerminationTypeError",
        action.payload.hrTerminationTypeError
      );

    default:
      return state;
  }
};

export default taskManagerHrInfoReducer;
