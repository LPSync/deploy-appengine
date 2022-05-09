import {OrderedMap} from "immutable";
import RequisitionDetails from "../../immutableEntities/candidateImmutables/RequisitionDetails";
import CandidateDetails from "../../immutableEntities/candidateImmutables/CandidateDetails";
import AdditionalInformation from "../../immutableEntities/candidateImmutables/AdditionalInformation";
import CandidateRequestActonTypes from "./candidateRequestActonTypes";
import Location from "../../immutableEntities/candidateImmutables/Location";
import HiringManager from "../../immutableEntities/candidateImmutables/HiringManager";
import RequisitionType from "../../immutableEntities/candidateImmutables/RequisitionType";
import Job from "../../immutableEntities/candidateImmutables/Job";

const defaultState = OrderedMap({
  requisitionDetails: new RequisitionDetails(),
  candidateDetails: new CandidateDetails(),
  additionalInformation: new AdditionalInformation(),

  requisitionTypeError: false,
  isFilledByRequisition: false,
  startDateError: false,
  hiringManagerError: false,
  businessUnitError: false,
  departmentError: false,
  locationError: false,
  employeeTypeError: false,
  firstNameError: false,
  lastNameError: false,
  nonLpEmailError: false,
  jobError: false,
  selectedCompanyError: false,
  usernameError: false,
  selectedDeviceError: false,
  isDeviceNoteConfirmed: false,
  isGoogleAccountNeeded: true,
  activeStep: 0,
});

const candidateRequestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CandidateRequestActonTypes.SET_REQUISITION_TYPE:
      return state.setIn(
        ["requisitionDetails", "requisitionType"],
        new RequisitionType(action.payload.requisitionType)
      );
    case CandidateRequestActonTypes.SET_START_DATE:
      return state.setIn(
        ["requisitionDetails", "startDate"],
        action.payload.startDate
      );
    case CandidateRequestActonTypes.SET_HIRING_MANAGER:
      return state.setIn(
        ["requisitionDetails", "hiringManager"],
        action.payload.hiringManager
          ? new HiringManager(action.payload.hiringManager)
          : action.payload.hiringManager
      );
    case CandidateRequestActonTypes.SET_BUSINESS_UNIT:
      return state.setIn(
        ["requisitionDetails", "businessUnit"],
        action.payload.businessUnit
      );
    case CandidateRequestActonTypes.SET_DEPARTMENT:
      return state.setIn(
        ["requisitionDetails", "department"],
        action.payload.department
      );
    case CandidateRequestActonTypes.SET_LOCATION:
      return state.setIn(
        ["requisitionDetails", "location"],
        action.payload.location
          ? new Location(action.payload.location)
          : action.payload.location
      );
    case CandidateRequestActonTypes.SET_EMPLOYEE_TYPE:
      return state.setIn(
        ["requisitionDetails", "employeeType"],
        action.payload.employeeType
      );
    case CandidateRequestActonTypes.SET_REQUISITION_DETAILS:
      return state.set(
        "requisitionDetails",
        new RequisitionDetails(action.payload.requisitionDetails)
      );

    case CandidateRequestActonTypes.SET_FIRST_NAME:
      return state.setIn(
        ["candidateDetails", "firstName"],
        action.payload.firstName
      );
    case CandidateRequestActonTypes.SET_LAST_NAME:
      return state.setIn(
        ["candidateDetails", "lastName"],
        action.payload.lastName
      );
    case CandidateRequestActonTypes.SET_USERNAME:
      return state.setIn(
        ["candidateDetails", "username"],
        action.payload.userName
      );
    case CandidateRequestActonTypes.SET_NON_LP_EMAIL:
      return state.setIn(
        ["candidateDetails", "nonLpEmail"],
        action.payload.nonLpEmail
      );
    case CandidateRequestActonTypes.SET_JOB:
      return state.setIn(
        ["candidateDetails", "job"],
        action.payload.job ? new Job(action.payload.job) : new Job()
      );

    case CandidateRequestActonTypes.SET_JOB_TITLE:
      return state.setIn(
        ["candidateDetails", "job", "jobTitle"],
        action.payload.jobTitle
      );

    case CandidateRequestActonTypes.SET_JOB_CODE:
      return state.setIn(
        ["candidateDetails", "job", "jobCode"],
        action.payload.jobCode
      );

    case CandidateRequestActonTypes.SET_SELECTED_COMPANY:
      return state.setIn(
        ["candidateDetails", "selectedCompany"],
        action.payload.selectedCompany
      );
    case CandidateRequestActonTypes.SET_OFFICE_NUMBER:
      return state.setIn(
        ["candidateDetails", "officeNumber"],
        action.payload.officeNumber
      );
    case CandidateRequestActonTypes.SET_MOBILE_NUMBER:
      return state.setIn(
        ["candidateDetails", "mobileNumber"],
        action.payload.mobileNumber
      );

    case CandidateRequestActonTypes.SET_IS_DEVICE_NOTE_CONFIRMED:
      return state.setIn(
        ["additionalInformation", "isDeviceNoteConfirmed"],
        action.payload.isDeviceNoteConfirmed
      );

    case CandidateRequestActonTypes.SET_REQUEST_DEVICE:
      return state.setIn(
        ["additionalInformation", "selectedDevice"],
        action.payload.selectedDevice
      );

    case CandidateRequestActonTypes.SET_DEFAULT_STATE:
      return defaultState;

    case CandidateRequestActonTypes.SET_IS_FILLED_BY_REQUISITION:
      return state.set(
        "isFilledByRequisition",
        action.payload.isFilledByRequisition
      );

    case CandidateRequestActonTypes.SET_IS_GOOGLE_ACCOUNT_NEEDED:
      return state.setIn(
        ["additionalInformation", "isGoogleAccountNeeded"],
        action.payload.isGoogleAccountNeeded
      );

    //errors
    case CandidateRequestActonTypes.SET_REQUISITION_TYPE_ERROR:
      return state.set(
        "requisitionTypeError",
        action.payload.requisitionTypeError
      );
    case CandidateRequestActonTypes.SET_START_DATE_ERROR:
      return state.set("startDateError", action.payload.startDateError);
    case CandidateRequestActonTypes.SET_HIRING_MANAGER_ERROR:
      return state.set("hiringManagerError", action.payload.hiringManagerError);
    case CandidateRequestActonTypes.SET_BUSINESS_UNIT_ERROR:
      return state.set("businessUnitError", action.payload.businessUnitError);
    case CandidateRequestActonTypes.SET_DEPARTMENT_ERROR:
      return state.set("departmentError", action.payload.departmentError);
    case CandidateRequestActonTypes.SET_LOCATION_ERROR:
      return state.set("locationError", action.payload.locationError);
    case CandidateRequestActonTypes.SET_EMPLOYEE_TYPE_ERROR:
      return state.set("employeeTypeError", action.payload.employeeTypeError);

    case CandidateRequestActonTypes.SET_FIRST_NAME_ERROR:
      return state.set("firstNameError", action.payload.firstNameError);
    case CandidateRequestActonTypes.SET_LAST_NAME_ERROR:
      return state.set("lastNameError", action.payload.lastNameError);
    case CandidateRequestActonTypes.SET_USERNAME_ERROR:
      return state.set("usernameError", action.payload.userNameError);
    case CandidateRequestActonTypes.SET_NON_LP_EMAIL_ERROR:
      return state.set("nonLpEmailError", action.payload.nonLpEmailError);
    case CandidateRequestActonTypes.SET_JOB_ERROR:
      return state.set("jobError", action.payload.jobError);
    case CandidateRequestActonTypes.SET_SELECTED_COMPANY_ERROR:
      return state.set(
        "selectedCompanyError",
        action.payload.selectedCompanyError
      );

    case CandidateRequestActonTypes.SET_DEVICE_ERROR:
      return state.set(
        "selectedDeviceError",
        action.payload.selectedDeviceError
      );

    case CandidateRequestActonTypes.SET_ACTIVE_STEP:
      return state.set("activeStep", action.payload.activeStep);
    default:
      return state;
  }
};

export default candidateRequestReducer;
