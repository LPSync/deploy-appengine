import {OrderedMap} from "immutable";
import RequisitionRequestActionTypes from "./requisitionRequestActonTypes";
import RequisitionDetails from "../../immutableEntities/candidateImmutables/RequisitionDetails";
import CandidateDetails from "../../immutableEntities/candidateImmutables/CandidateDetails";
import AdditionalInformation from "../../immutableEntities/candidateImmutables/AdditionalInformation";
// import RequisitionRequestActionTypes from "./requisitionRequestActonTypes";
import Location from "../../immutableEntities/candidateImmutables/Location";
import HiringManager from "../../immutableEntities/candidateImmutables/HiringManager";
import RequisitionType from "../../immutableEntities/candidateImmutables/RequisitionType";
import Job from "../../immutableEntities/candidateImmutables/Job";

const defaultState = OrderedMap({
  // requisitionDetails: new RequisitionDetails(),
  // candidateDetails: new CandidateDetails(),
  // additionalInformation: new AdditionalInformation(),

  requisitionType: null,
  requisitionTypeError: false,
  // isFilledByRequisition: false,
  // startDateError: false,
  // hiringManagerError: false,
  // businessUnitError: false,
  // departmentError: false,
  // locationError: false,
  // employeeTypeError: false,
  // firstNameError: false,
  // lastNameError: false,
  // nonLpEmailError: false,
  // jobError: false,
  // selectedCompanyError: false,
  // usernameError: false,
  // selectedDeviceError: false,
  // isDeviceNoteConfirmed: false,
  // isGoogleAccountNeeded: true,
  // activeStep: 0,
});

const requisitionRequestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RequisitionRequestActionTypes.SET_REQUISITION_TYPE:
      return state.set("requisitionType", action.payload.requisitionType);
    // case RequisitionRequestActionTypes.SET_START_DATE:
    //   return state.setIn(
    //     ["requisitionDetails", "startDate"],
    //     action.payload.startDate
    //   );
    // case RequisitionRequestActionTypes.SET_HIRING_MANAGER:
    //   return state.setIn(
    //     ["requisitionDetails", "hiringManager"],
    //     action.payload.hiringManager
    //       ? new HiringManager(action.payload.hiringManager)
    //       : action.payload.hiringManager
    //   );
    // case RequisitionRequestActionTypes.SET_BUSINESS_UNIT:
    //   return state.setIn(
    //     ["requisitionDetails", "businessUnit"],
    //     action.payload.businessUnit
    //   );
    // case RequisitionRequestActionTypes.SET_DEPARTMENT:
    //   return state.setIn(
    //     ["requisitionDetails", "department"],
    //     action.payload.department
    //   );
    // case RequisitionRequestActionTypes.SET_LOCATION:
    //   return state.setIn(
    //     ["requisitionDetails", "location"],
    //     action.payload.location
    //       ? new Location(action.payload.location)
    //       : action.payload.location
    //   );
    // case RequisitionRequestActionTypes.SET_EMPLOYEE_TYPE:
    //   return state.setIn(
    //     ["requisitionDetails", "employeeType"],
    //     action.payload.employeeType
    //   );
    // case RequisitionRequestActionTypes.SET_REQUISITION_DETAILS:
    //   return state.set(
    //     "requisitionDetails",
    //     new RequisitionDetails(action.payload.requisitionDetails)
    //   );
    //
    // case RequisitionRequestActionTypes.SET_FIRST_NAME:
    //   return state.setIn(
    //     ["candidateDetails", "firstName"],
    //     action.payload.firstName
    //   );
    // case RequisitionRequestActionTypes.SET_LAST_NAME:
    //   return state.setIn(
    //     ["candidateDetails", "lastName"],
    //     action.payload.lastName
    //   );
    // case RequisitionRequestActionTypes.SET_USERNAME:
    //   return state.setIn(
    //     ["candidateDetails", "username"],
    //     action.payload.userName
    //   );
    // case RequisitionRequestActionTypes.SET_NON_LP_EMAIL:
    //   return state.setIn(
    //     ["candidateDetails", "nonLpEmail"],
    //     action.payload.nonLpEmail
    //   );
    // case RequisitionRequestActionTypes.SET_JOB:
    //   return state.setIn(
    //     ["candidateDetails", "job"],
    //     action.payload.job ? new Job(action.payload.job) : action.payload.job
    //   );
    // case RequisitionRequestActionTypes.SET_SELECTED_COMPANY:
    //   return state.setIn(
    //     ["candidateDetails", "selectedCompany"],
    //     action.payload.selectedCompany
    //   );
    // case RequisitionRequestActionTypes.SET_OFFICE_NUMBER:
    //   return state.setIn(
    //     ["candidateDetails", "officeNumber"],
    //     action.payload.officeNumber
    //   );
    // case RequisitionRequestActionTypes.SET_MOBILE_NUMBER:
    //   return state.setIn(
    //     ["candidateDetails", "mobileNumber"],
    //     action.payload.mobileNumber
    //   );
    //
    // case RequisitionRequestActionTypes.SET_IS_DEVICE_NOTE_CONFIRMED:
    //   return state.setIn(
    //     ["additionalInformation", "isDeviceNoteConfirmed"],
    //     action.payload.isDeviceNoteConfirmed
    //   );
    //
    // case RequisitionRequestActionTypes.SET_REQUEST_DEVICE:
    //   return state.setIn(
    //     ["additionalInformation", "selectedDevice"],
    //     action.payload.selectedDevice
    //   );
    //
    // case RequisitionRequestActionTypes.SET_DEFAULT_STATE:
    //   return defaultState;
    //
    // case RequisitionRequestActionTypes.SET_IS_FILLED_BY_REQUISITION:
    //   return state.set(
    //     "isFilledByRequisition",
    //     action.payload.isFilledByRequisition
    //   );
    //
    // case RequisitionRequestActionTypes.SET_IS_GOOGLE_ACCOUNT_NEEDED:
    //   return state.setIn(
    //     ["additionalInformation", "isGoogleAccountNeeded"],
    //     action.payload.isGoogleAccountNeeded
    //   );

    //errors
    case RequisitionRequestActionTypes.SET_REQUISITION_TYPE_ERROR:
      return state.set(
        "requisitionTypeError",
        action.payload.requisitionTypeError
      );
    // case RequisitionRequestActionTypes.SET_START_DATE_ERROR:
    //   return state.set("startDateError", action.payload.startDateError);
    // case RequisitionRequestActionTypes.SET_HIRING_MANAGER_ERROR:
    //   return state.set("hiringManagerError", action.payload.hiringManagerError);
    // case RequisitionRequestActionTypes.SET_BUSINESS_UNIT_ERROR:
    //   return state.set("businessUnitError", action.payload.businessUnitError);
    // case RequisitionRequestActionTypes.SET_DEPARTMENT_ERROR:
    //   return state.set("departmentError", action.payload.departmentError);
    // case RequisitionRequestActionTypes.SET_LOCATION_ERROR:
    //   return state.set("locationError", action.payload.locationError);
    // case RequisitionRequestActionTypes.SET_EMPLOYEE_TYPE_ERROR:
    //   return state.set("employeeTypeError", action.payload.employeeTypeError);
    //
    // case RequisitionRequestActionTypes.SET_FIRST_NAME_ERROR:
    //   return state.set("firstNameError", action.payload.firstNameError);
    // case RequisitionRequestActionTypes.SET_LAST_NAME_ERROR:
    //   return state.set("lastNameError", action.payload.lastNameError);
    // case RequisitionRequestActionTypes.SET_USERNAME_ERROR:
    //   return state.set("usernameError", action.payload.userNameError);
    // case RequisitionRequestActionTypes.SET_NON_LP_EMAIL_ERROR:
    //   return state.set("nonLpEmailError", action.payload.nonLpEmailError);
    // case RequisitionRequestActionTypes.SET_JOB_ERROR:
    //   return state.set("jobError", action.payload.jobError);
    // case RequisitionRequestActionTypes.SET_SELECTED_COMPANY_ERROR:
    //   return state.set(
    //     "selectedCompanyError",
    //     action.payload.selectedCompanyError
    //   );
    //
    // case RequisitionRequestActionTypes.SET_DEVICE_ERROR:
    //   return state.set(
    //     "selectedDeviceError",
    //     action.payload.selectedDeviceError
    //   );
    //
    // case RequisitionRequestActionTypes.SET_ACTIVE_STEP:
    //   return state.set("activeStep", action.payload.activeStep);
    default:
      return state;
  }
};

export default requisitionRequestReducer;
