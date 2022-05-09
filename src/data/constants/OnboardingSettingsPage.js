export const DEPARTMENT_LABEL = 'department';
export const BUSINESS_UNIT_LABEL = 'businessUnit';
export const DEFAULT_ERRORS_INFO = { [DEPARTMENT_LABEL]: false, [BUSINESS_UNIT_LABEL]: false };
export const DEFAULT_BU_DEPT_INFO = { [DEPARTMENT_LABEL]: '', [BUSINESS_UNIT_LABEL]: '' };
export const DEFAULT_TOAST_INFO = { shown: false, text: '', severity: 'information' };
export const ULTI_BU_DEPT_SUCCESS_REQUEST_TEXT = 'Record was created successfully';
export const ULTI_BU_DEPT_FAILED_REQUEST_TEXT = 'Error occurred while creating record';
export const ULTI_BU_DEPT_VALIDATION_ERROR_TEXT = 'All fields are required';

export const INPUTS_CONFIG_FOR_BU_DEPT_FORM = [
    {
        id: DEPARTMENT_LABEL,
        label: 'Department'
    },
    {
        id: BUSINESS_UNIT_LABEL,
        label: 'Business Unit'
    }
];