import CandidateRequestActonTypes from "./candidateRequestActonTypes";

export const setRequisitionType = (requisitionType) => ({
  type: CandidateRequestActonTypes.SET_REQUISITION_TYPE,
  payload: {requisitionType},
});

export const setStartDate = (startDate) => ({
  type: CandidateRequestActonTypes.SET_START_DATE,
  payload: {startDate},
});

export const setHiringManager = (hiringManager) => ({
  type: CandidateRequestActonTypes.SET_HIRING_MANAGER,
  payload: {hiringManager},
});

export const setBusinessUnit = (businessUnit) => ({
  type: CandidateRequestActonTypes.SET_BUSINESS_UNIT,
  payload: {businessUnit},
});

export const setDepartment = (department) => ({
  type: CandidateRequestActonTypes.SET_DEPARTMENT,
  payload: {department},
});

export const setLocation = (location) => ({
  type: CandidateRequestActonTypes.SET_LOCATION,
  payload: {location},
});

export const setEmployeeType = (employeeType) => ({
  type: CandidateRequestActonTypes.SET_EMPLOYEE_TYPE,
  payload: {employeeType},
});

export const setRequisitionDetails = (requisitionDetails) => ({
  type: CandidateRequestActonTypes.SET_REQUISITION_DETAILS,
  payload: {requisitionDetails},
});

export const setFirstName = (firstName) => ({
  type: CandidateRequestActonTypes.SET_FIRST_NAME,
  payload: {firstName},
});

export const setLastName = (lastName) => ({
  type: CandidateRequestActonTypes.SET_LAST_NAME,
  payload: {lastName},
});

export const setNonLpEmail = (nonLpEmail) => ({
  type: CandidateRequestActonTypes.SET_NON_LP_EMAIL,
  payload: {nonLpEmail},
});

export const setJob = (job) => ({
  type: CandidateRequestActonTypes.SET_JOB,
  payload: {job},
});

export const setJobCode = (jobCode) => ({
  type: CandidateRequestActonTypes.SET_JOB_CODE,
  payload: {jobCode},
});

export const setJobTitle = (jobTitle) => ({
  type: CandidateRequestActonTypes.SET_JOB_TITLE,
  payload: {jobTitle},
});

export const setSelectedCompany = (selectedCompany) => ({
  type: CandidateRequestActonTypes.SET_SELECTED_COMPANY,
  payload: {selectedCompany},
});

export const setOfficeNumber = (officeNumber) => ({
  type: CandidateRequestActonTypes.SET_OFFICE_NUMBER,
  payload: {officeNumber},
});

export const setMobileNumber = (mobileNumber) => ({
  type: CandidateRequestActonTypes.SET_MOBILE_NUMBER,
  payload: {mobileNumber},
});

export const setUsername = (userName) => ({
  type: CandidateRequestActonTypes.SET_USERNAME,
  payload: {userName},
});

export const setIsDeviceNoteConfirmed = (isDeviceNoteConfirmed) => ({
  type: CandidateRequestActonTypes.SET_IS_DEVICE_NOTE_CONFIRMED,
  payload: {isDeviceNoteConfirmed},
});

export const setSelectedDevice = (selectedDevice) => ({
  type: CandidateRequestActonTypes.SET_REQUEST_DEVICE,
  payload: {selectedDevice},
});

export const setDefaultState = () => ({
  type: CandidateRequestActonTypes.SET_DEFAULT_STATE,
});

export const setFilledByRequisition = (isFilledByRequisition) => ({
  type: CandidateRequestActonTypes.SET_IS_FILLED_BY_REQUISITION,
  payload: {isFilledByRequisition},
});

export const setIsGoogleAccountNeeded = (isGoogleAccountNeeded) => ({
  type: CandidateRequestActonTypes.SET_IS_GOOGLE_ACCOUNT_NEEDED,
  payload: {isGoogleAccountNeeded},
});

// errors
export const setRequisitionTypeError = (requisitionTypeError) => ({
  type: CandidateRequestActonTypes.SET_REQUISITION_TYPE_ERROR,
  payload: {requisitionTypeError},
});

export const setStartDateError = (startDateError) => ({
  type: CandidateRequestActonTypes.SET_START_DATE_ERROR,
  payload: {startDateError},
});

export const setHiringManagerError = (hiringManagerError) => ({
  type: CandidateRequestActonTypes.SET_HIRING_MANAGER_ERROR,
  payload: {hiringManagerError},
});

export const setBusinessUnitError = (businessUnitError) => ({
  type: CandidateRequestActonTypes.SET_BUSINESS_UNIT_ERROR,
  payload: {businessUnitError},
});

export const setDepartmentError = (departmentError) => ({
  type: CandidateRequestActonTypes.SET_DEPARTMENT_ERROR,
  payload: {departmentError},
});

export const setLocationError = (locationError) => ({
  type: CandidateRequestActonTypes.SET_LOCATION_ERROR,
  payload: {locationError},
});

export const setEmployeeTypeError = (employeeTypeError) => ({
  type: CandidateRequestActonTypes.SET_EMPLOYEE_TYPE_ERROR,
  payload: {employeeTypeError},
});

export const setFirstNameError = (firstNameError) => ({
  type: CandidateRequestActonTypes.SET_FIRST_NAME_ERROR,
  payload: {firstNameError},
});

export const setLastNameError = (lastNameError) => ({
  type: CandidateRequestActonTypes.SET_LAST_NAME_ERROR,
  payload: {lastNameError},
});

export const setNonLpEmailError = (nonLpEmailError) => ({
  type: CandidateRequestActonTypes.SET_NON_LP_EMAIL_ERROR,
  payload: {nonLpEmailError},
});

export const setJobError = (jobError) => ({
  type: CandidateRequestActonTypes.SET_JOB_ERROR,
  payload: {jobError},
});

export const setSelectedCompanyError = (selectedCompanyError) => ({
  type: CandidateRequestActonTypes.SET_SELECTED_COMPANY_ERROR,
  payload: {selectedCompanyError},
});

export const setUsernameError = (userNameError) => ({
  type: CandidateRequestActonTypes.SET_USERNAME_ERROR,
  payload: {userNameError},
});

export const setSelectedDeviceError = (selectedDeviceError) => ({
  type: CandidateRequestActonTypes.SET_REQUEST_DEVICE_ERROR,
  payload: {selectedDeviceError},
});

export const setActiveStep = (activeStep) => ({
  type: CandidateRequestActonTypes.SET_ACTIVE_STEP,
  payload: {activeStep},
});
